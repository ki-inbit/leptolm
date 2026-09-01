use crate::bindings;
use crate::bindings::exports::wasi::http::incoming_handler::Guest;
use crate::bindings::wasi::http::types::{
    Fields, IncomingBody, IncomingRequest, Method as WasiMethod, OutgoingBody, OutgoingResponse, ResponseOutparam,
};
use crate::core::{router_engine, HttpMethod, LeptolmRoute, RawResponse};

pub struct LeptolmBackend;

impl Guest for LeptolmBackend {
    fn handle(request: IncomingRequest, response_out: ResponseOutparam) {
        // WASIのMethodを、汎用的なHttpMethodに変換
        let method = match request.method() {
            WasiMethod::Get => HttpMethod::Get,
            WasiMethod::Post => HttpMethod::Post,
            _ => HttpMethod::Other,
        };

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