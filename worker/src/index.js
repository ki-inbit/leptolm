import * as wasmApp from "./wasm/appy.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 👑 1. Unity 用の .br ファイル手動フォールバック
    if (url.pathname.startsWith("/unity/Build/") && !url.pathname.endsWith(".br")) {
        const brUrl = new URL(url.pathname + ".br", request.url);
        
        // 💡 修正: request.headers を渡さないことで、内部サーバーの誤作動を防ぐ
        const brRes = await fetch(brUrl.toString());

        if (brRes.ok) {
            const buffer = await brRes.arrayBuffer();
            const headers = new Headers();

            // 必須: 正確なサイズを伝える
            headers.set("content-length", buffer.byteLength.toString());
            // 必須: ブラウザに解凍させる
            headers.set("content-encoding", "br");
            
            // 👑 必須魔法: Cloudflare に「中身を絶対に書き換えるな！」と命令する
            headers.set("cache-control", "no-transform");

            if (url.pathname.endsWith(".js")) headers.set("content-type", "application/javascript");
            else if (url.pathname.endsWith(".wasm")) headers.set("content-type", "application/wasm");
            else if (url.pathname.endsWith(".data")) headers.set("content-type", "application/octet-stream");

            return new Response(buffer, { status: 200, headers });
        }
    }

    // 👑 2. WASM (Rust/MoonBit/Leptos) ロジック
    try {
      const method = request.method;
      const path = url.pathname + url.search;
      const body = new Uint8Array(await request.arrayBuffer());

      const [status, contentType, encoding, resBody] = wasmApp.handleCloudflare(method, path, body);

      const headers = new Headers({ "content-type": contentType });
      if (encoding) headers.set("content-encoding", encoding);

      return new Response(resBody, { status, headers });
    } catch (e) {
      console.error("WASM Error:", e);
      return new Response("WASM Internal Error:\n" + e.stack, { status: 500 });
    }
  }
};