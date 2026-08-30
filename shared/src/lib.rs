//sharedはwitから自動生成されるのでこのディレクトリはいじる必要なし!

// 👑 wit/api.wit から型を自動生成し、Serde の機能も自動付与する魔法！
wit_bindgen::generate!({
    world: "shared-types", // 👑 "router" から "shared-types" に変更！
    path: "../wit",
    additional_derives: [serde::Serialize, serde::Deserialize],
});

// フロントエンドが使いやすいように、エイリアス（別名）をエクスポートしておく
// 👑 修正: 個別の名前ではなく `*` を使って、models の中身をまるごと外に公開する！
pub use leptolm::api::models::*;