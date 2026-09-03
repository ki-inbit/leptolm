use std::fs;
use std::path::Path;
use leptos::prelude::*;
use shared::{AddItemReq, AddItemRes};

// 👑 WASI用: 今までの "router" の設計図を使う
#[cfg(not(feature = "cloudflare"))]
#[allow(warnings)]
pub mod moonbit {
    wit_bindgen::generate!({
        world: "router",
        path: "../wit",
        with: {
            "leptolm:api/models": shared::leptolm::api::models,
        }
    });
}

// 👑 Cloudflare用: WASIを含まないクリーンな "cloudflare-router" の設計図を使う
#[cfg(feature = "cloudflare")]
#[allow(warnings)]
pub mod moonbit {
    wit_bindgen::generate!({
        world: "cloudflare-router",
        path: "../wit",
        with: {
            "leptolm:api/models": shared::leptolm::api::models,
        }
    });
}

// 👑 インフラに依存しない汎用HTTPメソッド
pub enum HttpMethod {
    Get,
    Post,
    Other,
}

pub enum LeptolmRoute<'a> {
    ApiAddItem,
    ApiGetItems,
    FrontendApp,
    Unity(&'a str),
    Pkg(&'a str),
    NotFound,
}

impl<'a> LeptolmRoute<'a> {
    pub fn parse(method: &HttpMethod, path: &'a str) -> Self {
        let clean_path = path.trim_matches('/');

        match (method, clean_path) {
            (HttpMethod::Post, "api/add_item") => LeptolmRoute::ApiAddItem,
            (HttpMethod::Get, "api/items") => LeptolmRoute::ApiGetItems, // 👑 追加
            (_, p) if p.starts_with("api") => LeptolmRoute::NotFound,

            (HttpMethod::Get, p) if p.starts_with("unity/") => {
                LeptolmRoute::Unity(p.strip_prefix("unity/").unwrap_or(""))
            }
            (HttpMethod::Get, p) if p.starts_with("pkg/") => {
                LeptolmRoute::Pkg(p.strip_prefix("pkg/").unwrap_or(""))
            }
            _ => LeptolmRoute::FrontendApp,
        }
    }
}

pub struct RawResponse {
    pub status: u16,
    pub content_type: String,
    pub encoding: Option<String>,
    pub body: Vec<u8>,
}

// ... 前略 ...
pub fn router_engine(route: LeptolmRoute, req_body_bytes: Vec<u8>) -> RawResponse {
    match route {
        LeptolmRoute::ApiAddItem => {
            // 👑 1. JSONではなくMessagePackでバイト列から直接構造体に復元
            let req: AddItemReq = rmp_serde::from_slice(&req_body_bytes)
                .expect("Failed to deserialize MessagePack request");

            let res_data = shared::process_add_item(&req);

            RawResponse {
                status: 200,
                content_type: "application/x-msgpack".into(), // 👑 2. ヘッダー変更
                encoding: None,
                // 👑 3. 構造体をMessagePackのバイト列に変換
                body: rmp_serde::to_vec(&res_data).unwrap_or_default(),
            }
        }
        LeptolmRoute::ApiGetItems => {
            let res_data = shared::get_items();
            RawResponse {
                status: 200,
                content_type: "application/x-msgpack".into(), // 👑 変更
                encoding: None,
                body: rmp_serde::to_vec(&res_data).unwrap_or_default(), // 👑 変更
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
            body: b"404 Not Found".to_vec(),
        },
    }
}

pub fn serve_static_file(base_path: &str) -> RawResponse {
    let (target_path, is_br) = if Path::new(base_path).exists() {
        let is_br = base_path.ends_with(".br");
        (base_path.to_string(), is_br)
    } else if Path::new(&format!("{}.br", base_path)).exists() {
        (format!("{}.br", base_path), true)
    } else if Path::new(&format!("{}.unityweb", base_path)).exists() {
        // 👑 追加: .unityweb を見つけた場合！ (Unity側で解凍するので is_br は false でOK)
        (format!("{}.unityweb", base_path), false)
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
            body: b"Internal Server Error".to_vec(),
        }
    }
}

pub fn get_mime_type(path: &str) -> String {
    // 👑 修正: .br と .unityweb の両方を取り除いて、元の拡張子（.data や .wasm）を取り出す
    let clean_path = path.strip_suffix(".br").unwrap_or(path);
    let clean_path = clean_path.strip_suffix(".unityweb").unwrap_or(clean_path);

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