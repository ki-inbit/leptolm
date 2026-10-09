#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

# ==========================================
# 0. 引数の解析 (ターゲット & ビルドモード)
# ==========================================
TARGET="local" # デフォルトを local に設定
MODE="debug"

for arg in "$@"; do
    case "$arg" in
        release|debug) MODE="$arg" ;;
        cloudflare|d1) TARGET="cloudflare" ;;
        local|sqlite|wasi) TARGET="local" ;;
    esac
done

if [ "$MODE" = "release" ]; then
    CARGO_FLAGS="--release"
    MOON_FLAGS="--release"
    RUST_OUT_DIR="release"
else
    CARGO_FLAGS=""
    MOON_FLAGS=""
    RUST_OUT_DIR="debug"
fi

if [ "$TARGET" = "cloudflare" ]; then
    ROUTER_FEATURES="--features cloudflare"
    echo -e "${YELLOW}🚀 全体ビルド開始: [ターゲット: Cloudflare (D1)] [モード: ${MODE}]${NC}"
else
    ROUTER_FEATURES=""
    echo -e "${YELLOW}🚀 全体ビルド開始: [ターゲット: Local (SQLite)] [モード: ${MODE}]${NC}"
fi

cd "$(dirname "$0")"
rm -f *.wasm

# ==========================================
# 1. 🎨 フロントエンドのビルド
# ==========================================
echo -e "${CYAN}🎨 フロントエンドをビルド中...${NC}"

if [ "$TARGET" = "cloudflare" ]; then
    FRONTEND_FEATURES="hydrate,cloudflare"
else
    FRONTEND_FEATURES="hydrate"
fi

if command -v trunk &> /dev/null; then
    trunk build frontend/index.html --release --dist public --features "$FRONTEND_FEATURES"
else
    mkdir -p public/pkg
    cd frontend
    wasm-pack build --target web --out-name frontend --out-dir ../public/pkg -- --features "$FRONTEND_FEATURES"
    cd ..
    [ -f frontend/index.html ] && cp frontend/index.html public/
fi

# ==========================================
# 2. ⚙️ ルーターのビルド
# ==========================================
echo "⚙️ ルーターをビルド中 (${MODE} モード)..."
if [ "$TARGET" = "cloudflare" ]; then
    cargo build -p router --target wasm32-wasip1 $CARGO_FLAGS $ROUTER_FEATURES
else
    cargo component build -p router $CARGO_FLAGS
fi

# ==========================================
# 3. 🌙 MoonBit バックエンドのビルド
# ==========================================
echo "🌙 MoonBit バインディングを生成中 (--ignore-stub)..."
wit-bindgen moonbit wit --out-dir backend/moonbit --world backend --ignore-stub
rm -f backend/moonbit/moon.mod.json

# 👑 wit-bindgen に毎回上書きされるルートの pkg.json に is-main だけ付与する
node -e "
const fs = require('fs');
const pkgPath = 'backend/moonbit/gen/moon.pkg.json';
if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg['is-main'] = true;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}
"

# ffi.mbt に main 関数を補完
if [ -f "backend/moonbit/gen/ffi.mbt" ] && ! grep -q "fn main" "backend/moonbit/gen/ffi.mbt"; then
    echo -e '\nfn main {}\n' >> backend/moonbit/gen/ffi.mbt
fi

echo "🌙 MoonBit バックエンドをビルド中 (${MODE} モード)..."
cd backend/moonbit
if [ "$TARGET" = "cloudflare" ]; then
    moon clean
fi
moon build --target wasm $MOON_FLAGS
cd ../..

ROUTER_WASM="target/wasm32-wasip1/${RUST_OUT_DIR}/router.wasm"
BACKEND_CORE_WASM=$(find backend/moonbit/target backend/moonbit/_build -name "gen.wasm" 2>/dev/null | head -n 1)

if [ -z "$BACKEND_CORE_WASM" ]; then
    echo "❌ エラー: MoonBit のコンパイル結果が見つかりません"
    exit 1
fi
echo "🎯 MoonBit WASM を発見: $BACKEND_CORE_WASM"
BACKEND_COMPONENT_WASM="backend-component.wasm"

if command -v wasmtime &> /dev/null; then
    WT_VERSION=$(wasmtime --version | awk '{print $2}')
else
    WT_VERSION="15.0.0"
fi
ADAPTER="wasi_snapshot_preview1.v${WT_VERSION}.reactor.wasm"

if [ ! -f "$ADAPTER" ]; then
    echo "⬇️ WASI Preview1 アダプター (v${WT_VERSION}) をダウンロード中..."
    curl -sL "https://github.com/bytecodealliance/wasmtime/releases/download/v${WT_VERSION}/wasi_snapshot_preview1.reactor.wasm" -o "$ADAPTER"
fi

echo "📦 MoonBit の Core WASM に WIT メタデータを埋め込み中..."
#wasm-tools component embed wit "$BACKEND_CORE_WASM" --world backend --encoding utf16 -o backend-embedded.wasm
wasm-tools component embed wit --world backend --encoding utf16 "$BACKEND_CORE_WASM" -o backend-embedded.wasm

echo "📦 WASI Component へ変換中 (WASI 完全有効化)..."
wasm-tools component new backend-embedded.wasm --adapt wasi_snapshot_preview1="$ADAPTER" -o "$BACKEND_COMPONENT_WASM"

# ==========================================
# 🎯 ターゲットごとの最終処理
# ==========================================
if [ "$TARGET" = "cloudflare" ]; then
    echo "📦 Router を Component へ手動変換中..."
    wasm-tools component embed wit "$ROUTER_WASM" -w cloudflare-router -o router-embedded.wasm
    wasm-tools component new router-embedded.wasm --adapt wasi_snapshot_preview1="$ADAPTER" -o router-component.wasm

    echo -e "${CYAN}🗄️ DBコンポーネントをビルドします (ドライバ: d1)...${NC}"
    ./build_db.sh d1 $MODE

    echo "🔗 [1/2] Backend に DB を合体しています..."
    wac plug "$BACKEND_COMPONENT_WASM" --plug composed-db.wasm -o backend-with-db.wasm

    echo "🔗 [2/2] Router に Backend+DB を合体しています..."
    wac plug router-component.wasm --plug backend-with-db.wasm -o app.wasm

    echo "🌍 Cloudflare Workers 用に JavaScript へ変換中 (jco)..."
    rm -rf worker/src/wasm
    mkdir -p worker/src/wasm

    cat << 'EOF' > worker/src/wasm/d1-replay.js
let cacheHistory = [];
let cursor = 0;

export function getCache() {
    if (cursor < cacheHistory.length) {
        return cacheHistory[cursor++]; 
    }
    return ""; 
}

export function pushCache(val) { cacheHistory.push(val); }
export function resetCursor() { cursor = 0; }
export function clearCache() { cacheHistory = []; cursor = 0; }
EOF

    npx jco transpile app.wasm \
        -o worker/src/wasm \
        --name appy \
        --map leptolm:api/d1-replay=./d1-replay.js \
        --base64-cutoff=0

    echo "🔧 Cloudflare Workers 向けに WASM インポートを最適化中..."
    cat << 'EOF' > optimize_wasm.js
const fs = require('fs');
const path = './worker/src/wasm/appy.js';
let code = fs.readFileSync(path, 'utf8');

const matches = [...code.matchAll(/['"](?:\.\/)?(appy\.core[a-zA-Z0-9]*\.wasm)['"]/g)];
const wasmFiles = [...new Set(matches.map(m => m[1]))];

let newImports = '';
let mockCode = '\nconst __wasm_modules = {\n';
wasmFiles.forEach((file, i) => {
    newImports += 'import __wasm_module_' + i + ' from "./' + file + '";\n';
    mockCode += '  "' + file + '": __wasm_module_' + i + ',\n';
});
mockCode += '};\n';

mockCode += "\n" +
"const fetch = async (url) => ({\n" +
"    url: url.toString(),\n" +
"    arrayBuffer: async () => ({ isMockBuffer: true, url: url.toString() })\n" +
"});\n" +
"const WebAssembly = Object.create(globalThis.WebAssembly);\n" +
"WebAssembly.compileStreaming = async (resp) => {\n" +
"    const url = (await resp).url;\n" +
"    const filename = url.split('/').pop();\n" +
"    return __wasm_modules[filename];\n" +
"};\n" +
"WebAssembly.compile = async (buf) => {\n" +
"    if (buf && buf.isMockBuffer) {\n" +
"        const filename = buf.url.split('/').pop();\n" +
"        return __wasm_modules[filename];\n" +
"    }\n" +
"    return globalThis.WebAssembly.compile(buf);\n" +
"};\n" +
"WebAssembly.instantiateStreaming = async (resp, imports) => {\n" +
"    const url = (await resp).url;\n" +
"    const filename = url.split('/').pop();\n" +
"    const mod = __wasm_modules[filename];\n" +
"    const instance = await globalThis.WebAssembly.instantiate(mod, imports);\n" +
"    return { module: mod, instance };\n" +
"};\n" +
"WebAssembly.instantiate = async (modOrBuf, imports) => {\n" +
"    if (modOrBuf && modOrBuf.isMockBuffer) {\n" +
"        const filename = modOrBuf.url.split('/').pop();\n" +
"        const mod = __wasm_modules[filename];\n" +
"        const instance = await globalThis.WebAssembly.instantiate(mod, imports);\n" +
"        return { module: mod, instance };\n" +
"    }\n" +
"    return globalThis.WebAssembly.instantiate(modOrBuf, imports);\n" +
"};\n";

code = code.replace(/import\.meta\.url/g, "'file:///'");
code = code.replace(/globalThis\.fetch/g, "fetch");
code = code.replace(/globalThis\.WebAssembly/g, "WebAssembly");

const importRegex = /^import\s+.*?(?:;|\n)/gm;
let lastImportIndex = 0;
let match;
while ((match = importRegex.exec(code)) !== null) {
    lastImportIndex = match.index + match[0].length;
}

const finalCode = newImports + code.substring(0, lastImportIndex) + mockCode + code.substring(lastImportIndex);

let safeCode = finalCode;
const bypass = (name, ret) => {
  const reg = new RegExp("function " + name + "[(]([^)]*)[)]\\s*[{]", "g");
  safeCode = safeCode.replace(reg, function(match, p1) {
    return "function " + name + "(" + p1 + ") { return " + ret + "; ";
  });
};
bypass("rscTableRemove", "{ rep: arguments[0] || 0, 0: 0 }");
bypass("rscTableGet", "{ rep: arguments[0] || 0, 0: 0 }");
bypass("resourceTransferOwn", "arguments[0] || 0");
bypass("resourceTransferBorrow", "arguments[0] || 0");
safeCode = safeCode.replace(/new WebAssembly\.Module/g, "Object");

fs.writeFileSync(path, safeCode);
EOF

    node optimize_wasm.js
    rm optimize_wasm.js

    echo -e "${GREEN}✅ 最適化完了！ デプロイ準備が整いました。${NC}"
    echo -e "${CYAN}🚀 'npx wrangler dev' または 'deploy' を実行してください！${NC}"

else
    # ==========================================
    # ローカル (WASI) の場合
    # ==========================================
    echo -e "${CYAN}🗄️ DBコンポーネントをビルドします (ドライバ: sqlite)...${NC}"
    ./build_db.sh sqlite $MODE

    echo "🔗 [1/2] Backend に DB(SQLite) を合体しています..."
    wac plug "$BACKEND_COMPONENT_WASM" --plug composed-db.wasm -o backend-with-db.wasm

    echo "🔗 [2/2] Router に Backend+DB を合体しています..."
    wac plug "$ROUTER_WASM" --plug backend-with-db.wasm -o app.wasm

    echo -e "${GREEN}✨ 完全体 WASM (app.wasm) の完成！${NC}"
fi