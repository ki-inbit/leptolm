import * as wasmApp from "./wasm/appy.js";
import { pushCache, resetCursor, clearCache } from './wasm/d1-replay.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/unity/Build/") && !url.pathname.endsWith(".br")) {
        const brUrl = new URL(url.pathname + ".br", request.url);
        const brRes = await fetch(brUrl.toString());

        if (brRes.ok) {
            const buffer = await brRes.arrayBuffer();
            const headers = new Headers();
            headers.set("content-length", buffer.byteLength.toString());
            headers.set("content-encoding", "br");
            headers.set("cache-control", "no-transform");
            if (url.pathname.endsWith(".js")) headers.set("content-type", "application/javascript");
            else if (url.pathname.endsWith(".wasm")) headers.set("content-type", "application/wasm");
            else if (url.pathname.endsWith(".data")) headers.set("content-type", "application/octet-stream");
            return new Response(buffer, { status: 200, headers });
        }
    }

    const method = request.method;
    const path = url.pathname + url.search;
    const body = new Uint8Array(await request.arrayBuffer());

    // 💡 1. リクエストごとにキャッシュ履歴とカーソルを完全にリセット
    clearCache();

    let maxRetries = 10;
    let attempt = 0;

    while (attempt < maxRetries) {
      // 💡 2. Replay（再実行）のたびに、履歴の読み取り位置を先頭に戻す
      resetCursor();

      let capturedPanic = "";
      const originalError = console.error;
      
      // 👑 Wasm (Rust) の Panic 出力を傍受する
      console.error = (...args) => {
        const msg = args.join(" ");
        if (msg.includes("DB_SUSPEND:")) capturedPanic = msg;
        originalError.apply(console, args);
      };

      try {
        const [status, contentType, encoding, resBody] = wasmApp.handleCloudflare(method, path, body);
        console.error = originalError; // 元に戻す

        // 💡 例外を投げずにエラー出力だけで終了した場合を拾う
        if (capturedPanic) {
            throw new Error("SuspendTrigger");
        }

        if (resBody) {
            const resString = new TextDecoder().decode(resBody);
            if (resString.includes("DB_SUSPEND:")) {
                capturedPanic = resString;
                throw new Error("SuspendTrigger");
            } else {
                console.log("=== 🚀 FINAL WASM RESPONSE ===");
                console.log(resString);
            }
        }
        
        const headers = new Headers({ "content-type": contentType });
        if (encoding) headers.set("content-encoding", encoding);
        return new Response(resBody, { status, headers });

      } catch (e) {
        console.error = originalError; // 元に戻す

        // 👑 jcoがエラーをJSの例外(TypeError等)として投げた場合をキャッチ
        if (e && e.message && e.message.includes("DB_SUSPEND:")) {
            capturedPanic = e.message;
        }

        if (capturedPanic) {
          console.log("[Replay] Wasm suspended for DB query (Attempt " + (attempt + 1) + ")");
          
          try {
            // Rustの出力からJSON部分 { ... } だけを安全に抽出
            const jsonMatch = capturedPanic.match(/\{.*\}/);
            if (!jsonMatch) throw new Error("Invalid payload format");
            
            const payload = JSON.parse(jsonMatch[0]);
            
            let stmt = env.DB.prepare(payload.query);
            if (payload.params && payload.params.length > 0) {
                stmt = stmt.bind(...payload.params);
            }
            // D1実行 (all() を使うとSELECTの結果もINSERTのメタデータも取得可能)
            const dbResult = await stmt.all();

            // 💡 3. クエリ種別に応じて Rust ドライバが期待する形式に合わせる
            const isSelect = payload.query.trim().match(/^SELECT/i);
            let cacheValue = "";
            if (isSelect) {
                // Rustの query 関数向け: JSON配列
                cacheValue = JSON.stringify(dbResult.results || []);
            } else {
                // Rustの exec 関数向け: 影響を受けた行数（文字列型の数字）
                cacheValue = String(dbResult.meta?.changes || 0);
            }

            console.log("=== 🔍 D1 QUERY RESULT ===");
            console.log("SQL:", payload.query);
            console.log("Params:", payload.params);
            console.log("Data:", cacheValue);
            console.log("==========================");
            
            // 💡 4. 履歴の末尾に結果を追加
            pushCache(cacheValue);

            attempt++;
            continue;

          } catch (dbError) {
            console.error("D1 Query Error:", dbError);
            return new Response("Database Query Error:\n" + String(dbError), { status: 500 });
          }
        }

        console.error("WASM Internal Error:", e);
        return new Response("WASM Internal Error:\n" + e.stack, { status: 500 });
      }
    }

    return new Response("Max replay retries exceeded", { status: 508 });
  }
};