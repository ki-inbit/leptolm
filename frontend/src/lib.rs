pub mod model;
pub mod update;
pub mod view;
pub mod components; // 👑 これを追加してモジュールを認識させます！

pub use view::App;

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn hydrate() {
    _ = console_log::init_with_level(log::Level::Debug);
    console_error_panic_hook::set_once();
    leptos::mount::hydrate_body(App);
}