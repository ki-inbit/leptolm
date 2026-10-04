#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
NC='\033[0m'

MODE=${1:-debug}

echo -e "${YELLOW}🚀 DBコンポーネント ビルド開始: [モード: ${MODE}]${NC}"

if [ "$MODE" = "release" ]; then
    CARGO_FLAGS="--release"
    MOON_FLAGS="--release"
    RUST_OUT_DIR="release"
else
    CARGO_FLAGS=""
    MOON_FLAGS=""
    RUST_OUT_DIR="debug"
fi

cd "$(dirname "$0")"
rm -f db-facade-*.wasm composed-db.wasm

# ==========================================
# 1. 🦀 Rust D1ドライバのビルド
# ==========================================
echo -e "${CYAN}🦀 Rust D1ドライバをビルド中...${NC}"
cd db/driver
cargo component build $CARGO_FLAGS
cd ../..

RUST_WASM=$(find target db/driver/target -path "*/wasm32-wasip1/${RUST_OUT_DIR}/driver_d1.wasm" 2>/dev/null | head -n 1)
if [ -z "$RUST_WASM" ]; then
    echo "❌ エラー: Rustのビルド結果が見つかりません"
    exit 1
fi

# ==========================================
# 2. 🌙 WITバインディング生成 & パッチ当て (自動化)
# ==========================================
echo -e "${CYAN}🌙 WITバインディングを生成＆最適化中...${NC}"
wit-bindgen moonbit wit --out-dir db --world db-facade
rm -f db/moon.mod.json

cat << 'EOF' > patch_moon.js
const fs = require('fs');

const pkgPath = 'db/gen/moon.pkg.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg['is-main'] = true;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

const ffiPath = 'db/gen/ffi.mbt';
let ffi = fs.readFileSync(ffiPath, 'utf8');
if (ffi.indexOf('fn main') === -1) {
    fs.appendFileSync(ffiPath, '\nfn main {}\n');
}

// 👑 readwrite パッケージに db-spi と JSONパーサー の import を注入！
const rwPkgPath = 'db/gen/interface/wasi/sql/readwrite/moon.pkg.json';
const rwPkg = JSON.parse(fs.readFileSync(rwPkgPath, 'utf8'));
if (!rwPkg.import) rwPkg.import = [];

const targetPath = 'leptolm/api/interface/leptolm/api/db-spi';
rwPkg.import = rwPkg.import.filter(i => i !== targetPath && i.path !== targetPath);
rwPkg.import.push({ "path": targetPath, "alias": "db_spi" });

// 👑 $json パッケージの依存を "json" というエイリアスで明示的に追加
const jsonPath = 'moonbitlang/core/json';
rwPkg.import = rwPkg.import.filter(i => i !== jsonPath && i.path !== jsonPath);
rwPkg.import.push({ "path": jsonPath, "alias": "json" });

fs.writeFileSync(rwPkgPath, JSON.stringify(rwPkg, null, 2));
EOF
node patch_moon.js
rm patch_moon.js

# ==========================================
# 3. 🌙 MoonBit DBファサードのビルド
# ==========================================
echo -e "${CYAN}🌙 MoonBit DBファサード(gen)をビルド中...${NC}"
cd db
moon build --target wasm $MOON_FLAGS
cd ..

MOON_CORE_WASM=$(find db/_build/wasm/${MODE}/build/gen -name "gen.wasm" 2>/dev/null | head -n 1)

if [ -z "$MOON_CORE_WASM" ]; then
    MOON_CORE_WASM=$(find db/_build/wasm -name "gen.wasm" 2>/dev/null | head -n 1)
    if [ -z "$MOON_CORE_WASM" ]; then
        echo "❌ エラー: MoonBit のコンパイル結果(gen.wasm)が見つかりません"
        exit 1
    fi
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
wasm-tools component embed wit \
    --world db-facade \
    "$MOON_CORE_WASM" \
    -o db-facade-embed.wasm

echo "📦 WASI Component へ変換中..."
wasm-tools component new db-facade-embed.wasm \
    --adapt wasi_snapshot_preview1="$ADAPTER" \
    -o db-facade-component.wasm

echo "🔗 WASM を合体 (Compose) しています..."
wac plug db-facade-component.wasm --plug "$RUST_WASM" -o composed-db.wasm

echo -e "${GREEN}✨ 完全体 DB WASM (composed-db.wasm) の完成！${NC}"

