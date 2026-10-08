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
    release|debug)
        MODE="$1"
        ;;
    sqlite|local|driver-sqlite|driver-SQLite)
        DRIVER="sqlite"
        MODE="${2:-debug}"
        ;;
    d1|cloudflare|driver-d1)
        DRIVER="d1"
        MODE="${2:-debug}"
        ;;
    *)
        if [ -n "$1" ]; then
            DRIVER="$1"
            MODE="${2:-debug}"
        fi
        ;;
esac

if [ "$MODE" = "release" ]; then
    CARGO_FLAGS="--release"
    MOON_FLAGS="--release"
    RUST_OUT_DIR="release"
else
    CARGO_FLAGS=""
    MOON_FLAGS=""
    RUST_OUT_DIR="debug"
fi

if [ "$DRIVER" = "sqlite" ]; then
    DRIVER_DIR_NAME="driver-SQLite"
    WASM_FILE_NAME="driver_sqlite.wasm"
else
    DRIVER_DIR_NAME="driver-d1"
    WASM_FILE_NAME="driver_d1.wasm"
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

if [ -z "$RUST_WASM" ]; then
    RUST_WASM=$(find target db/driver -name "${WASM_FILE_NAME}" 2>/dev/null | head -n 1)
fi

if [ -z "$RUST_WASM" ]; then
    echo "❌ エラー: Rustドライバのビルド結果 (${WASM_FILE_NAME}) が見つかりません"
    exit 1
fi
echo "🎯 Rust ドライバ WASM を発見: $RUST_WASM"

# ==========================================
# 2. 🌙 WITバインディング生成 & パッチ当て (自動化)
# ==========================================
echo -e "${CYAN}🌙 WITバインディングを生成＆最適化中...${NC}"
wit-bindgen moonbit wit --out-dir db --world db-facade
rm -f db/moon.mod.json

cat << 'EOF' > patch_moon.js
const fs = require('fs');

// 1. db/gen/moon.pkg.json を is-main: true に設定
const pkgPath = 'db/gen/moon.pkg.json';
if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg['is-main'] = true;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

// 2. ffi.mbt に fn main {} を付与
const ffiPath = 'db/gen/ffi.mbt';
if (fs.existsSync(ffiPath)) {
    let ffi = fs.readFileSync(ffiPath, 'utf8');
    if (ffi.indexOf('fn main') === -1) {
        fs.appendFileSync(ffiPath, '\nfn main {}\n');
    }
}

// 3. readwrite パッケージの依存関係注入
const rwPkgPath = 'db/gen/interface/wasi/sql/readwrite/moon.pkg.json';
if (fs.existsSync(rwPkgPath)) {
    const rwPkg = JSON.parse(fs.readFileSync(rwPkgPath, 'utf8'));
    if (!rwPkg.import) rwPkg.import = [];

    const targetPath = 'leptolm/api/interface/leptolm/api/db-spi';
    rwPkg.import = rwPkg.import.filter(i => i !== targetPath && i.path !== targetPath);
    rwPkg.import.push({ "path": targetPath, "alias": "db_spi" });

    const spiTypesPath = 'leptolm/api/interface/wasi/sql/types';
    rwPkg.import = rwPkg.import.filter(i => i !== spiTypesPath && i.path !== spiTypesPath);
    rwPkg.import.push({ "path": spiTypesPath, "alias": "spi_types" });

    const jsonPath = 'moonbitlang/core/json';
    rwPkg.import = rwPkg.import.filter(i => i !== jsonPath && i.path !== jsonPath);
    rwPkg.import.push({ "path": jsonPath, "alias": "json" });

    fs.writeFileSync(rwPkgPath, JSON.stringify(rwPkg, null, 2));
}

// 4. wasi:sql/types の補正 (リソースハンドル & グローバルスコープ保持)
const typesTopPath = 'db/gen/interface/wasi/sql/types/top.mbt';
let connNew = 'Connection::new';
let stmtNew = 'Statement::new';
let errNew = 'Error_::new';

if (fs.existsSync(typesTopPath)) {
    const topCode = fs.readFileSync(typesTopPath, 'utf8');
    if (topCode.includes('Connection::make')) connNew = 'Connection::make';
    if (topCode.includes('Statement::make')) stmtNew = 'Statement::make';
    if (topCode.includes('Error_::make')) errNew = 'Error_::make';
}

const typesImplPath = 'db/gen/interface/wasi/sql/types/impl.mbt';
if (fs.existsSync(typesImplPath)) {
    const typesImplContent = `
let last_sql : Array[String] = [""]
let last_params : Array[Array[String]] = [[]]

pub fn get_last_sql() -> String {
  last_sql[0]
}

pub fn get_last_params() -> Array[String] {
  last_params[0]
}

pub fn Connection::open(name : String) -> Result[Connection, Error_] {
  ignore(name)
  Ok(${connNew}(1))
}

pub fn Statement::prepare(query : String, params : Array[String]) -> Result[Statement, Error_] {
  last_sql[0] = query
  last_params[0] = params
  Ok(${stmtNew}(1))
}

pub fn Statement::dtor(_self : Statement) -> Unit {}
pub fn Connection::dtor(_self : Connection) -> Unit {}
pub fn Error_::dtor(_self : Error_) -> Unit {}
pub fn Error_::trace(_self : Error_) -> String { "" }
`;
    fs.writeFileSync(typesImplPath, typesImplContent);
    console.log('[patch_moon.js] 🎯 types/impl.mbt の補正完了');
}

// 5. wasi:sql/readwrite の補正 (Int64 → Double 自動正規化)
const rwImplPath = 'db/gen/interface/wasi/sql/readwrite/impl.mbt';
if (fs.existsSync(rwImplPath)) {
    const rwImplContent = `
pub fn query(conn : @types.Connection, stmt : @types.Statement) -> Result[Array[@types.Row], @types.Error_] {
  ignore(conn)
  ignore(stmt)
  let sql = @types.get_last_sql()
  let params = @types.get_last_params()
  match @db_spi.query(sql, params) {
    Ok(rows) => {
      let res : Array[@types.Row] = []
      rows.each(fn (r) {
        let val = match r.value {
          @spi_types.DataType::Str(s) => @types.DataType::Str(s)
          // 👑 SQLite の Int64 を D1 仕様の Double へファサード側で自動正規化
          @spi_types.DataType::Int64(n) => @types.DataType::Double(n.to_double())
          @spi_types.DataType::Double(f) => @types.DataType::Double(f)
          @spi_types.DataType::Boolean(b) => @types.DataType::Boolean(b)
          _ => @types.DataType::Str("")
        }
        res.push({ field_name: r.field_name, value: val })
      })
      Ok(res)
    }
    Err(_) => Err(@types.${errNew}(1))
  }
}

pub fn exec(conn : @types.Connection, stmt : @types.Statement) -> Result[UInt, @types.Error_] {
  ignore(conn)
  ignore(stmt)
  let sql = @types.get_last_sql()
  let params = @types.get_last_params()
  match @db_spi.exec(sql, params) {
    Ok(n) => Ok(n)
    Err(_) => Err(@types.${errNew}(1))
  }
}
`;
    fs.writeFileSync(rwImplPath, rwImplContent);
    console.log('[patch_moon.js] 🎯 readwrite/impl.mbt の補正完了');
}
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
# 👑 元の成功スクリプト通り --encoding は指定しない（デフォルトを使用）
wasm-tools component embed wit \
    --world db-facade \
    "$MOON_CORE_WASM" \
    -o db-facade-embed.wasm

echo "📦 WASI Component へ変換中..."
wasm-tools component new db-facade-embed.wasm \
    --adapt wasi_snapshot_preview1="$ADAPTER" \
    -o db-facade-component.wasm

echo "🔗 WASM を合体 (Compose) しています... [$RUST_WASM]"
wac plug db-facade-component.wasm --plug "$RUST_WASM" -o composed-db.wasm

echo -e "${GREEN}✨ 完全体 DB WASM (composed-db.wasm) の完成！ [ドライバ: ${DRIVER}]${NC}"