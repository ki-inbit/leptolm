pub mod model;
pub mod update;
pub mod view;
pub mod components; // 👑 これを追加してモジュールを認識させます！
use wasm_bindgen::prelude::*; // 👑 これが必須です！

pub use view::App;

// 👑 修正後: (start) を外し、関数名を `hydrate` にする！
// 👑 追加: "hydrate" 機能が有効なとき（＝ブラウザ向けビルドの時）だけこの関数を有効にする
#[cfg(feature = "hydrate")]
#[wasm_bindgen]
pub fn hydrate() {
    console_error_panic_hook::set_once();
    leptos::mount::hydrate_body(App); // ※ App はご自身の環境に合わせてください
}