// 👑 WASMからエクスポートされたものを「wasmApp」という名前の箱に全部詰め込む！
import * as wasmApp from "./wasm/appy.js"; // 👑 app.js を appy.js に変更

export default {
  async fetch(request, env, ctx) {
    // ターミナルに、WASMが公開してくれたモノの名前（リスト）をすべて出力する
    console.log("📦 WASM Exports:", Object.keys(wasmApp));

    return new Response("Hello! ターミナルのログを見てみてね！");
  }
};