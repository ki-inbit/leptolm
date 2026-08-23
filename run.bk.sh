#!/usr/bin/env bash
set -e

# カラー出力用の設定
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}⚙️ WASI Component をビルド中...${NC}"
cargo component build --release --target wasm32-wasip2 --manifest-path /workspaces/backend/Cargo.toml

echo -e "${GREEN}✨ ビルド完了！ Wasmtime HTTP サーバーを起動します...${NC}"
echo -e "👉 Access: http://localhost:3000"

# Wasmtime で HTTP サーバーを起動
wasmtime serve -S cli --addr 0.0.0.0:3000 --dir . /workspaces/target/wasm32-wasip2/release/backend.wasm
