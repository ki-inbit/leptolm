wit_bindgen::generate!({
    world: "driver-d1",
    path: "../../../wit",
    generate_all,
});

use exports::leptolm::app::db_spi::Guest;
use rusqlite::{params_from_iter, types::Value as SqlValue, Connection};
use wasi::sql::types::{DataType, Row};

const LOCAL_DB_PATH: &str = "./local_dev.db";

struct DriverLocal;

impl Guest for DriverLocal {
    /// SELECT クエリの実行
    fn query(sql: String, params: Vec<String>) -> Result<Vec<Row>, String> {
        let conn = Connection::open(LOCAL_DB_PATH)
            .map_err(|e| format!("DB接続エラー: {}", e))?;

        let mut stmt = conn
            .prepare(&sql)
            .map_err(|e| format!("SQL準備エラー: {}", e))?;

        let rusqlite_params: Vec<SqlValue> = params.into_iter().map(SqlValue::from).collect();

        let column_count = stmt.column_count();
        let column_names: Vec<String> = (0..column_count)
            .map(|i| stmt.column_name(i).unwrap_or("").to_string())
            .collect();

        let mut rows = stmt
            .query(params_from_iter(rusqlite_params))
            .map_err(|e| format!("クエリ実行エラー: {}", e))?;

        let mut result_rows = Vec::new();
        while let Some(row) = rows.next().map_err(|e| e.to_string())? {
            for (i, col_name) in column_names.iter().enumerate() {
                let val = match row.get_ref(i).map_err(|e| e.to_string())? {
                    rusqlite::types::ValueRef::Null => DataType::Str(String::new()),
                    rusqlite::types::ValueRef::Integer(n) => DataType::Int64(n),
                    rusqlite::types::ValueRef::Real(f) => DataType::Double(f),
                    rusqlite::types::ValueRef::Text(s) => {
                        DataType::Str(String::from_utf8_lossy(s).to_string())
                    }
                    rusqlite::types::ValueRef::Blob(b) => DataType::Str(format!("{:?}", b)),
                };

                result_rows.push(Row {
                    field_name: col_name.clone(),
                    value: val,
                });
            }
        }

        Ok(result_rows)
    }

    /// INSERT / UPDATE / DELETE クエリの実行
    fn exec(sql: String, params: Vec<String>) -> Result<u32, String> {
        let conn = Connection::open(LOCAL_DB_PATH)
            .map_err(|e| format!("DB接続エラー: {}", e))?;

        let rusqlite_params: Vec<SqlValue> = params.into_iter().map(SqlValue::from).collect();

        let affected_rows = conn
            .execute(&sql, params_from_iter(rusqlite_params))
            .map_err(|e| format!("SQL実行エラー: {}", e))?;

        Ok(affected_rows as u32)
    }
}

export!(DriverLocal);