use crate::core::{router_engine, HttpMethod, LeptolmRoute};

pub struct LeptolmBackend;

// 👑 bindings ではなく、core.rs の moonbit モジュール内に生成された Guest トレイトを使います！
impl crate::core::moonbit::Guest for LeptolmBackend {
    fn handle_cloudflare(
        method: String,
        path: String,
        body: Vec<u8>,
    ) -> (u16, String, Option<String>, Vec<u8>) {
        
        let http_method = match method.to_uppercase().as_str() {
            "GET" => HttpMethod::Get,
            "POST" => HttpMethod::Post,
            _ => HttpMethod::Other,
        };

        let route = LeptolmRoute::parse(&http_method, &path);
        let res = router_engine(route, body);

        (res.status, res.content_type, res.encoding, res.body)
    }
}

// 👑 エクスポートも core::moonbit 側のマクロを使用します
crate::core::moonbit::export!(LeptolmBackend with_types_in crate::core::moonbit);