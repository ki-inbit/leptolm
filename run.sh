#!/usr/bin/env bash
set -e

./build.sh local
wasmtime serve -S cli=y --dir=. app.wasm