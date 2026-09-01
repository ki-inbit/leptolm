#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
NC='\033[0m'

# ==========================================
# 👑 ビルドモードとターゲットの設定
# ==========================================
MODE="${BUILD_MODE:-debug}"
TARGET="${TARGET:-wasi}" # デフォルトをローカル(WASI)に設定

echo -e "${YELLOW}🚀 ビルド開始: [ターゲット: ${TARGET}] [モード: ${MODE}]${NC}"

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

# 👑 TARGET が WASI なので、Component としてビルド
echo "⚙️ WASI ルーターをビルド中 (${MODE} モード)..."
cargo component build -p router $CARGO_FLAGS

echo "🌙 MoonBit バインディングを生成中..."
wit-bindgen moonbit wit --out-dir backend/moonbit --world backend
rm -f backend/moonbit/moon.mod.json

sed -i '2i \  "is-main": true,' backend/moonbit/gen/moon.pkg.json
if ! grep -q "fn main" backend/moonbit/gen/ffi.mbt; then
    echo 'fn main {}' >> backend/moonbit/gen/ffi.mbt
fi

echo "🌙 MoonBit バックエンドをビルド中 (${MODE} モード)..."
cd backend/moonbit
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

# ==========================================
# WASI アダプターの準備と Component の合体
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

echo -e "${GREEN}✨ 完全体 WASM の完成！ Wasmtime を起動します...${NC}"
wasmtime serve -S cli=y --dir=. app.wasm