#!/usr/bin/env bash
set -e

./build.sh
wasmtime serve -S cli=y --dir=. app.wasm