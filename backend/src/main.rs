use axum::{
    body::Body, extract::Request, http::{StatusCode, Response},
    routing::any, Router,
};
use shared::{AddItemReq, AddItemRes};
use tower_http::services::ServeDir;

#[derive(Debug)]
enum LeptolmRoute { ApiAddItem, FrontendApp, NotFound }

impl LeptolmRoute {
    fn match_route(method: &axum::http::Method, path: &str) -> Self {
        let clean_path = path.trim_matches('/');
        match (method, clean_path) {
            (&axum::http::Method::POST, "api/add_item") => LeptolmRoute::ApiAddItem,
            _ if clean_path.starts_with("api") => LeptolmRoute::NotFound,
            _ => LeptolmRoute::FrontendApp,
        }
    }
}

async fn leptolm_core_router(req: Request) -> Response<Body> {
    let method = req.method().clone();
    let path = req.uri().path().to_string();

    match LeptolmRoute::match_route(&method, &path) {
        LeptolmRoute::ApiAddItem => {
            let (_parts, body) = req.into_parts();
            let bytes = axum::body::to_bytes(body, usize::MAX).await.unwrap();
            let req_data: AddItemReq = serde_json::from_slice(&bytes).unwrap();
            
            let res_data = AddItemRes {
                success: true,
                message: format!("Added {} (Qty: {})", req_data.item_name, req_data.quantity),
                server_time: "2026-06-30 12:00:00".into(),
            };
            
            Response::builder()
                .status(StatusCode::OK)
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&res_data).unwrap()))
                .unwrap()
        }
        LeptolmRoute::FrontendApp => {
            let conf = leptos::prelude::get_configuration(None).unwrap();
            let options = conf.leptos_options;

            let handler = leptos_axum::render_app_to_stream(move || {
                use leptos::prelude::*;
                use leptos_meta::MetaTags;
                view! {
                    <!DOCTYPE html>
                    <html lang="ja">
                        <head>
                            <meta charset="utf-8"/>
                            <meta name="viewport" content="width=device-width, initial-scale=1"/>
                            <HydrationScripts options=options.clone() />
                            <MetaTags />
                        </head>
                        <body>
                            <frontend::App />
                        </body>
                    </html>
                }
            });
            handler(req).await
        }
        LeptolmRoute::NotFound => {
            Response::builder().status(StatusCode::NOT_FOUND).body(Body::from("404 Not Found")).unwrap()
        }
    }
}

#[tokio::main]
async fn main() {
    let conf = leptos::prelude::get_configuration(None).unwrap();
    let addr = conf.leptos_options.site_addr;
    let pkg_dir = format!("{}/pkg", conf.leptos_options.site_root);

    let app = Router::new()
        .nest_service("/pkg", ServeDir::new(pkg_dir))
        .route("/api/*path", any(leptolm_core_router))
        .fallback(any(leptolm_core_router));

    println!("Leptolm Backend Engine starting on http://{}", addr);
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}