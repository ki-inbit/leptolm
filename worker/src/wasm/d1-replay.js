let cacheHistory = [];
let cursor = 0;

// WasmのRustドライバから呼ばれる関数
export function getCache() {
    if (cursor < cacheHistory.length) {
        return cacheHistory[cursor++]; // 現在のカーソルの結果を返し、カーソルを進める
    }
    return ""; // 履歴が尽きていれば空文字を返す（→ Rust側でパニック発生）
}

// JSルーターから呼ばれる管理用関数
export function pushCache(val) {
    cacheHistory.push(val);
}
export function resetCursor() {
    cursor = 0;
}
export function clearCache() {
    cacheHistory = [];
    cursor = 0;
}
