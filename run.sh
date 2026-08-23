#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🎨 既存のフロントエンドをビルド中...${NC}"

# Trunk を使っている場合 (推奨)
if command -v trunk &> /dev/null; then
    trunk build frontend/index.html --release --dist public
# trunk がなく wasm-pack を使う場合のフォールバック
else
    mkdir -p public/pkg
    cd frontend
    wasm-pack build --target web --out-name frontend --out-dir ../public/pkg -- --features hydrate
    cd ..
    # もし frontend 内に index.html があれば public にコピー
    [ -f frontend/index.html ] && cp frontend/index.html public/
fi

echo -e "${CYAN}⚙️ WASI バックエンドをビルド中...${NC}"
cargo component build --release --target wasm32-wasip2 --manifest-path backend/Cargo.toml

echo -e "${GREEN}✨ ビルド完了！ Wasmtime を起動します...${NC}"
echo -e "👉 Access: http://localhost:3000"

wasmtime serve -S cli --addr 0.0.0.0:3000 --dir . target/wasm32-wasip2/release/backend.wasm