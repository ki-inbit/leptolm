#[allow(warnings)]
mod bindings;

use bindings::exports::wasi::http::incoming_handler::Guest;
use bindings::wasi::http::types::{
    Fields, IncomingBody, IncomingRequest, Method, OutgoingBody, OutgoingResponse, ResponseOutparam,
};
use std::fs;
use std::path::Path;
use leptos::prelude::*;

// 👑 shared クレートの型（WITから自動生成＋Serde対応済み）をインポート
use shared::{AddItemReq, AddItemRes};

// 👑 WITから生成されるコードを `moonbit` モジュールの中に閉じ込める！
#[allow(warnings)]
pub mod moonbit {
    wit_bindgen::generate!({
        world: "router",
        path: "../wit",
        // 👑 超重要: 「MoonBitへ渡す型は、shared クレートのものと全く同じだよ！」とRustに教える
        with: {
            "leptolm:api/models": shared::leptolm::api::models,
        }
    });
}

// ==========================================
// 1. 元コードの LeptolmRoute を WASI ADT として再構築
// ==========================================
pub enum LeptolmRoute<'a> {
    ApiAddItem,
    FrontendApp,
    Unity(&'a str),
    Pkg(&'a str),
    NotFound,
}

impl<'a> LeptolmRoute<'a> {
    pub fn parse(method: &Method, path: &'a str) -> Self {
        let clean_path = path.trim_matches('/');

        match (method, clean_path) {
            (Method::Post, "api/add_item") => LeptolmRoute::ApiAddItem,
            _ if clean_path.starts_with("api") => LeptolmRoute::NotFound,

            (Method::Get, _) if clean_path.starts_with("unity/") => {
                LeptolmRoute::Unity(clean_path.strip_prefix("unity/").unwrap_or(""))
            }
            (Method::Get, _) if clean_path.starts_with("pkg/") => {
                LeptolmRoute::Pkg(clean_path.strip_prefix("pkg/").unwrap_or(""))
            }
            _ => LeptolmRoute::FrontendApp,
        }
    }
}

struct RawResponse {
    status: u16,
    content_type: String,
    encoding: Option<String>,
    body: Vec<u8>,
}

// ==========================================
// 2. コア・ルーター（純粋関数）
// ==========================================
fn router_engine(route: LeptolmRoute, req_body_bytes: Vec<u8>) -> RawResponse {
    match route {
        // 👑 1. POST /api/add_item (MoonBit ロジックの呼び出し)
        LeptolmRoute::ApiAddItem => {
            // フロントエンドから来た JSON を AddItemReq にパースする
            if let Ok(req_data) = serde_json::from_slice::<AddItemReq>(&req_body_bytes) {
                
                // 👑 なんと！型の詰め替え処理が完全消滅！
                // JSONからパースした構造体をそのまま MoonBit にぶん投げるだけ！
                let res_data = shared::process_add_item(&req_data);

                RawResponse {
                    status: 200,
                    content_type: "application/json".into(),
                    encoding: None,
                    // 👑 MoonBit から返ってきた戻り値も、そのまま JSON にしてフロントエンドへ！
                    body: serde_json::to_vec(&res_data).unwrap_or_default(),
                }
            } else {
                RawResponse {
                    status: 400,
                    content_type: "text/plain".into(),
                    encoding: None,
                    body: "Invalid Request Body".into(),
                }
            }
        }

        LeptolmRoute::FrontendApp => {
            let mut options = leptos::prelude::LeptosOptions::default();
            options.output_name = "frontend".into();

            let html = view! {
                <!DOCTYPE html>
                <html lang="ja">
                    <head>
                        <meta charset="utf-8"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <HydrationScripts options=options />
                        <script src="/unity/Build/build.loader.js"></script>
                    </head>
                    <body style="margin: 0;">
                        <frontend::App />
                    </body>
                </html>
            }.to_html();

            RawResponse {
                status: 200,
                content_type: "text/html; charset=utf-8".into(),
                encoding: None,
                body: html.into_bytes(),
            }
        }

        LeptolmRoute::Unity(path) => serve_static_file(&format!("public/unity/{}", path)),
        LeptolmRoute::Pkg(path) => serve_static_file(&format!("public/pkg/{}", path)),
        LeptolmRoute::NotFound => RawResponse {
            status: 404,
            content_type: "text/plain".into(),
            encoding: None,
            body: "404 Not Found".into(),
        },
    }
}

// 静的ファイル読み込み用ヘルパー
fn serve_static_file(base_path: &str) -> RawResponse {
    let (target_path, is_br) = if Path::new(base_path).exists() {
        let is_br = base_path.ends_with(".br");
        (base_path.to_string(), is_br)
    } else if Path::new(&format!("{}.br", base_path)).exists() {
        (format!("{}.br", base_path), true)
    } else {
        return RawResponse {
            status: 404,
            content_type: "text/plain".into(),
            encoding: None,
            body: format!("File not found: {}", base_path).into_bytes(),
        };
    };

    if let Ok(bytes) = fs::read(&target_path) {
        let mime = get_mime_type(&target_path);
        let encoding = if is_br { Some("br".to_string()) } else { None };

        RawResponse {
            status: 200,
            content_type: mime,
            encoding,
            body: bytes,
        }
    } else {
        RawResponse {
            status: 500,
            content_type: "text/plain".into(),
            encoding: None,
            body: "Internal Server Error".into(),
        }
    }
}

fn get_mime_type(path: &str) -> String {
    let clean_path = path.strip_suffix(".br").unwrap_or(path);
    let ext = Path::new(clean_path)
        .extension()
        .and_then(|s| s.to_str())
        .unwrap_or("");

    match ext {
        "html" => "text/html; charset=utf-8",
        "js" => "application/javascript",
        "wasm" => "application/wasm",
        "data" => "application/octet-stream",
        "css" => "text/css",
        "json" => "application/json",
        _ => "application/octet-stream",
    }
    .to_string()
}

// ==========================================
// 3. WASI Component 接合部
// ==========================================
struct LeptolmBackend;

impl Guest for LeptolmBackend {
    fn handle(request: IncomingRequest, response_out: ResponseOutparam) {
        let method = request.method();
        let path_with_query = request.path_with_query().unwrap_or_else(|| "/".to_string());
        let path = path_with_query.split('?').next().unwrap_or("/");

        let req_body_bytes = read_request_body(&request);

        let route = LeptolmRoute::parse(&method, path);
        let res = router_engine(route, req_body_bytes);

        send_response(response_out, res);
    }
}

fn read_request_body(request: &IncomingRequest) -> Vec<u8> {
    let mut body_bytes = Vec::new();
    if let Ok(incoming_body) = request.consume() {
        if let Ok(stream) = incoming_body.stream() {
            while let Ok(chunk) = stream.read(4096) {
                if chunk.is_empty() {
                    break;
                }
                body_bytes.extend_from_slice(&chunk);
            }
        }
        let _ = IncomingBody::finish(incoming_body);
    }
    body_bytes
}

fn send_response(response_out: ResponseOutparam, res: RawResponse) {
    let headers = Fields::new();
    let _ = headers.set(&"content-type".to_string(), &[res.content_type.into_bytes()]);
    
    if let Some(enc) = res.encoding {
        let _ = headers.set(&"content-encoding".to_string(), &[enc.into_bytes()]);
    }

    let response = OutgoingResponse::new(headers);
    response.set_status_code(res.status).unwrap();

    let body = response.body().unwrap();
    let stream = body.write().unwrap();

    ResponseOutparam::set(response_out, Ok(response));

    for chunk in res.body.chunks(4096) {
        let _ = stream.blocking_write_and_flush(chunk);
    }
    
    drop(stream);
    let _ = OutgoingBody::finish(body, None);
}

bindings::export!(LeptolmBackend with_types_in bindings);