#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

# ==========================================
# ビルドモードの設定（デフォルト: debug）
# ==========================================
MODE="${BUILD_MODE:-release}"

if [ "$MODE" = "release" ]; then
    CARGO_FLAGS="--release"
    MOON_FLAGS="--release"
    RUST_OUT_DIR="release"
    MOON_OUT_DIR="release"
else
    CARGO_FLAGS=""
    MOON_FLAGS=""
    RUST_OUT_DIR="debug"
    MOON_OUT_DIR="debug"
fi

cd /workspaces
rm -f *.wasm

echo -e "${CYAN}🎨 既存のフロントエンドをビルド中...${NC}"

if command -v trunk &> /dev/null; then
    trunk build frontend/index.html --release --dist public
else
    mkdir -p public/pkg
    cd frontend
    wasm-pack build --target web --out-name frontend --out-dir ../public/pkg -- --features hydrate
    cd ..
    [ -f frontend/index.html ] && cp frontend/index.html public/
fi

echo "⚙️ WASI ルーターをビルド中 (${MODE} モード)..."
cargo component build -p router $CARGO_FLAGS

echo "🌙 MoonBit バインディングを生成中..."
# 👑 出力先を backend/moonbit に変更
wit-bindgen moonbit wit --out-dir backend/moonbit --world backend
rm -f backend/moonbit/moon.mod.json

# gen パッケージを「主人公（実行ファイル）」に昇格させる
sed -i '2i \  "is-main": true,' backend/moonbit/gen/moon.pkg.json
echo 'fn main {}' >> backend/moonbit/gen/ffi.mbt

echo "🌙 MoonBit バックエンドをビルド中 (${MODE} モード)..."
# 👑 移動先を backend/moonbit に変更
cd backend/moonbit
moon build --target wasm $MOON_FLAGS
cd ../..

# パスの定義
ROUTER_WASM="target/wasm32-wasip1/${RUST_OUT_DIR}/router.wasm"
# 👑 検索パスを backend/moonbit 配下に変更
BACKEND_CORE_WASM=$(find backend/moonbit/target backend/moonbit/_build -name "gen.wasm" 2>/dev/null | head -n 1)

if [ -z "$BACKEND_CORE_WASM" ]; then
    echo "❌ エラー: MoonBit のコンパイル結果が見つかりません"
    exit 1
fi
echo "🎯 MoonBit WASM を発見: $BACKEND_CORE_WASM"
BACKEND_COMPONENT_WASM="backend-component.wasm"

# ==========================================
# 👑 WASI アダプターの準備
# ==========================================
WT_VERSION=$(wasmtime --version | awk '{print $2}')
ADAPTER="wasi_snapshot_preview1.v${WT_VERSION}.reactor.wasm"

if [ ! -f "$ADAPTER" ]; then
    echo "⬇️ WASI Preview1 アダプター (v${WT_VERSION}) をダウンロード中..."
    curl -sL "https://github.com/bytecodealliance/wasmtime/releases/download/v${WT_VERSION}/wasi_snapshot_preview1.reactor.wasm" -o "$ADAPTER"
fi

echo "📦 MoonBit の Core WASM に WIT メタデータを埋め込み中..."
wasm-tools component embed wit \
    --world backend \
    "$BACKEND_CORE_WASM" \
    -o backend-embedded.wasm

echo "📦 WASI Component へ変換中 (WASI 完全有効化)..."
wasm-tools component new backend-embedded.wasm \
    --adapt wasi_snapshot_preview1="$ADAPTER" \
    -o "$BACKEND_COMPONENT_WASM"

echo "🔗 WASM を合体 (Compose) しています..."
wac plug "$ROUTER_WASM" --plug "$BACKEND_COMPONENT_WASM" -o app.wasm

echo "🌍 Cloudflare Workers 用に JavaScript へ変換中 (jco)..."
rm -rf worker/src/wasm
jco transpile app.wasm -o worker/src/wasm --name appy --base64-cutoff=0

echo "🔧 Cloudflare Workers 向けに WASM インポートを最適化中..."
cat << 'EOF' > optimize_wasm.js
const fs = require('fs');
const path = './worker/src/wasm/appy.js';
let code = fs.readFileSync(path, 'utf8');

// 1. 出力されたすべてのWASMファイルを抽出
const matches = [...code.matchAll(/['"](?:\.\/)?(appy\.core[a-zA-Z0-9]*\.wasm)['"]/g)];
const wasmFiles = [...new Set(matches.map(m => './' + m[1]))];

let newImports = '';
let mockCode = `\nconst __wasm_modules = {\n`;
wasmFiles.forEach((file, i) => {
    newImports += `import __wasm_module_${i} from '${file}';\n`;
    mockCode += `  '${file.replace('./', '')}': __wasm_module_${i},\n`;
});
mockCode += `};\n`;

// 2. ネイティブAPIを安全に迂回するためのフック関数群
mockCode += `
function _mockFetch(url) {
    const urlStr = url ? url.toString() : '';
    for (const [name, mod] of Object.entries(__wasm_modules)) {
        if (urlStr.includes(name)) {
            return Promise.resolve({ arrayBuffer: () => Promise.resolve(mod) });
        }
    }
    return Promise.resolve({ arrayBuffer: () => Promise.reject(new Error('Unexpected WASM fetch: ' + urlStr)) });
}
function _mockCompileStreaming(resp) {
    return Promise.resolve(resp).then(r => (r && typeof r.arrayBuffer === 'function') ? r.arrayBuffer() : r).then(_mockCompile);
}
function _mockCompile(mod) {
    if (mod instanceof globalThis.WebAssembly.Module) return Promise.resolve(mod);
    throw new Error('Cloudflare Workers blocks dynamic compilation.');
}
function _mockInstantiateStreaming(resp, imports) {
    return Promise.resolve(resp)
        .then(r => (r && typeof r.arrayBuffer === 'function') ? r.arrayBuffer() : r)
        .then(mod => {
            if (mod instanceof globalThis.WebAssembly.Module) {
                // instantiateStreaming は { module, instance } を返す仕様
                return globalThis.WebAssembly.instantiate(mod, imports).then(instance => ({ module: mod, instance }));
            }
            throw new Error('Cloudflare Workers blocks dynamic instantiation.');
        });
}
function _mockInstantiate(mod, imports) {
    if (mod instanceof globalThis.WebAssembly.Module) {
        // 👑 修正: 既にコンパイル済みのModuleを渡す場合、生の Instance のみを返す
        return globalThis.WebAssembly.instantiate(mod, imports);
    }
    throw new Error('Cloudflare Workers blocks dynamic instantiation.');
}
`;

// 3. jcoが出力したコードの危険なAPI呼び出しを強制置換
code = code.replace(/import\.meta\.url/g, "'file:///'");
code = code.replace(/(?:globalThis\.)?fetch\s*\(/g, "_mockFetch(");
code = code.replace(/(?:globalThis\.)?WebAssembly\.compileStreaming/g, "_mockCompileStreaming");
code = code.replace(/(?:globalThis\.)?WebAssembly\.compile/g, "_mockCompile");
code = code.replace(/(?:globalThis\.)?WebAssembly\.instantiateStreaming/g, "_mockInstantiateStreaming");
code = code.replace(/(?:globalThis\.)?WebAssembly\.instantiate/g, "_mockInstantiate");

// 4. import文はファイルの先頭に、フック関数はその直後に挿入
const importRegex = /^import\s+.*?(?:;|\n)/gm;
let lastImportIndex = 0;
let match;
while ((match = importRegex.exec(code)) !== null) {
    lastImportIndex = match.index + match[0].length;
}

const finalCode = newImports + code.substring(0, lastImportIndex) + mockCode + code.substring(lastImportIndex);
fs.writeFileSync(path, finalCode);
EOF

node optimize_wasm.js
rm optimize_wasm.js
echo "✅ 最適化完了！"