#[allow(warnings)]
mod bindings {
    wit_bindgen::generate!({
        world: "driver-d1",
        path: "../../../wit",
        generate_all,
    });
}

use bindings::exports::leptolm::app::db_spi::Guest;
use bindings::leptolm::app::d1_replay;
use bindings::wasi::sql::types::{Row, DataType};

struct Component;

impl Guest for Component {
    fn query(query: String, params: Vec<String>) -> Result<Vec<Row>, String> {
        let cache = d1_replay::get_cache();
        
        // 🎯 キャッシュがある場合（Replay 2回目の実行時）
        if !cache.is_empty() {
            let parsed: serde_json::Value = serde_json::from_str(&cache)
                .map_err(|_| "JSON Parse Error".to_string())?;
            
            let mut rows = Vec::new();
            
            if let Some(arr) = parsed.as_array() {
                for item in arr {
                    if let Some(obj) = item.as_object() {
                        for (k, v) in obj {
                            let dt = match v {
                                serde_json::Value::String(s) => DataType::Str(s.clone()),
                                serde_json::Value::Number(n) if n.is_f64() => DataType::Double(n.as_f64().unwrap()),
                                serde_json::Value::Number(n) if n.is_i64() => DataType::Double(n.as_f64().unwrap()),
                                serde_json::Value::Bool(true) => DataType::Boolean(true),
                                serde_json::Value::Bool(false) => DataType::Boolean(false),
                                serde_json::Value::Null => DataType::Null,
                                _ => DataType::Null,
                            };
                            rows.push(Row {
                                field_name: k.clone(),
                                value: dt,
                            });
                        }
                    }
                }
            }
            return Ok(rows);
        }

        // 🎯 キャッシュがない場合（初回実行時：Suspendシグナルを発行）
        let mut params_json = String::new();
        for (i, p) in params.iter().enumerate() {
            if i > 0 { params_json.push_str(", "); }
            params_json.push_str(&format!("\"{}\"", p.replace("\"", "\\\"")));
        }
        
        let payload = format!(r#"{{"query": "{}", "params": [{}]}}"#, query, params_json);
        
        let suspend_msg = format!("DB_SUSPEND:{}", payload);
        eprintln!("{}", suspend_msg);
        
        Err(suspend_msg)
    }

    fn exec(query: String, params: Vec<String>) -> Result<u32, String> {
        let cache = d1_replay::get_cache();
        
        if !cache.is_empty() {
            let affected_rows: u32 = cache.parse().unwrap_or(0);
            return Ok(affected_rows);
        }

        let mut params_json = String::new();
        for (i, p) in params.iter().enumerate() {
            if i > 0 { params_json.push_str(", "); }
            params_json.push_str(&format!("\"{}\"", p.replace("\"", "\\\"")));
        }
        
        let payload = format!(r#"{{"query": "{}", "params": [{}]}}"#, query, params_json);
        
        let suspend_msg = format!("DB_SUSPEND:{}", payload);
        eprintln!("{}", suspend_msg);
        
        Err(suspend_msg)
    }
}

bindings::export!(Component with_types_in bindings);