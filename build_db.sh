#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
NC='\033[0m'

# ==========================================
# 0. 引数の解析 (ドライバ & ビルドモード)
# ==========================================
DRIVER="d1"
MODE="debug"

case "$1" in
    release|debug) MODE="$1" ;;
    sqlite|local|driver-sqlite|driver-SQLite) DRIVER="sqlite"; MODE="${2:-debug}" ;;
    d1|cloudflare|driver-d1) DRIVER="d1"; MODE="${2:-debug}" ;;
    *) if [ -n "$1" ]; then DRIVER="$1"; MODE="${2:-debug}"; fi ;;
esac

if [ "$MODE" = "release" ]; then
    CARGO_FLAGS="--release"; MOON_FLAGS="--release"; RUST_OUT_DIR="release"
else
    CARGO_FLAGS=""; MOON_FLAGS=""; RUST_OUT_DIR="debug"
fi

if [ "$DRIVER" = "sqlite" ]; then
    DRIVER_DIR_NAME="driver-SQLite"; WASM_FILE_NAME="driver_sqlite.wasm"
else
    DRIVER_DIR_NAME="driver-d1"; WASM_FILE_NAME="driver_d1.wasm"
fi

echo -e "${YELLOW}🚀 DBコンポーネント ビルド開始: [ドライバ: ${DRIVER}] [モード: ${MODE}]${NC}"

cd "$(dirname "$0")"
rm -f db-facade-*.wasm composed-db.wasm

# ==========================================
# 1. 🦀 Rust DBドライバのビルド
# ==========================================
echo -e "${CYAN}🦀 Rust DBドライバ (${DRIVER_DIR_NAME}) をビルド中...${NC}"

export CFLAGS_wasm32_wasip1="-DSQLITE_THREADSAFE=0 -D_WASI_EMULATED_PTHREAD"
export CFLAGS_wasm32_wasi="-DSQLITE_THREADSAFE=0 -D_WASI_EMULATED_PTHREAD"
export LIBSQLITE3_FLAGS="-DSQLITE_THREADSAFE=0 -D_WASI_EMULATED_PTHREAD"

if [ -d "db/driver/${DRIVER_DIR_NAME}" ]; then
    cd "db/driver/${DRIVER_DIR_NAME}"
    cargo component build $CARGO_FLAGS
    cd ../../..
else
    cd db/driver
    cargo component build $CARGO_FLAGS
    cd ../..
fi

RUST_WASM=$(find target db/driver/target -path "*/wasm32-wasip1/${RUST_OUT_DIR}/${WASM_FILE_NAME}" 2>/dev/null | head -n 1)
[ -z "$RUST_WASM" ] && RUST_WASM=$(find target db/driver -name "${WASM_FILE_NAME}" 2>/dev/null | head -n 1)
if [ -z "$RUST_WASM" ]; then
    echo "❌ エラー: Rustドライバのビルド結果 (${WASM_FILE_NAME}) が見つかりません"
    exit 1
fi
echo "🎯 Rust ドライバ WASM を発見: $RUST_WASM"

# ==========================================
# 2. 🌙 WITバインディング生成 (ignore-stub 適用)
# ==========================================
echo -e "${CYAN}🌙 WITバインディングを生成中 (--ignore-stub)...${NC}"
wit-bindgen moonbit wit --out-dir db --world db-facade --ignore-stub
rm -f db/moon.mod.json

# 👑 wit-bindgen によって上書きされるルートの pkg.json に is-main だけ付与する
node -e "
const fs = require('fs');
const pkgPath = 'db/gen/moon.pkg.json';
if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg['is-main'] = true;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}
"

# ffi.mbt (自動生成されるIF定義) に main 関数が必要な場合の軽量パッチ
if [ -f "db/gen/ffi.mbt" ] && ! grep -q "fn main" "db/gen/ffi.mbt"; then
    echo -e '\nfn main {}\n' >> db/gen/ffi.mbt
fi

# ==========================================
# 3. 🌙 MoonBit DBファサードのビルド
# ==========================================
echo -e "${CYAN}🌙 MoonBit DBファサード(gen)をビルド中...${NC}"
cd db
moon build --target wasm $MOON_FLAGS
cd ..

MOON_CORE_WASM=$(find db/_build/wasm/${MODE}/build/gen -name "gen.wasm" 2>/dev/null | head -n 1)
[ -z "$MOON_CORE_WASM" ] && MOON_CORE_WASM=$(find db/_build/wasm -name "gen.wasm" 2>/dev/null | head -n 1)
if [ -z "$MOON_CORE_WASM" ]; then
    echo "❌ エラー: MoonBit のコンパイル結果(gen.wasm)が見つかりません"
    exit 1
fi
echo "🎯 MoonBit WASM を発見: $MOON_CORE_WASM"

# ==========================================
# 4. WASI アダプターの準備
# ==========================================
if command -v wasmtime &> /dev/null; then
    WT_VERSION=$(wasmtime --version | awk '{print $2}')
else
    WT_VERSION="15.0.0"
fi
ADAPTER="wasi_snapshot_preview1.v${WT_VERSION}.reactor.wasm"

if [ ! -f "$ADAPTER" ]; then
    echo "⬇ WASI Preview1 アダプター (v${WT_VERSION}) をダウンロード中..."
    curl -sL "https://github.com/bytecodealliance/wasmtime/releases/download/v${WT_VERSION}/wasi_snapshot_preview1.reactor.wasm" -o "$ADAPTER"
fi

# ==========================================
# 5. 📦 Component 化と合体 (wac plug)
# ==========================================
echo "📦 MoonBit の Core WASM に WIT メタデータを埋め込み中..."
wasm-tools component embed wit --world db-facade "$MOON_CORE_WASM" -o db-facade-embed.wasm

echo "📦 WASI Component へ変換中..."
wasm-tools component new db-facade-embed.wasm --adapt wasi_snapshot_preview1="$ADAPTER" -o db-facade-component.wasm

echo "🔗 WASM を合体 (Compose) しています... [$RUST_WASM]"
wac plug db-facade-component.wasm --plug "$RUST_WASM" -o composed-db.wasm

echo -e "${GREEN}✨ 完全体 DB WASM (composed-db.wasm) の完成！ [ドライバ: ${DRIVER}]${NC}"