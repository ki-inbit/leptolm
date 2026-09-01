pub mod core;

// 👑 Cloudflareフラグが「無い」ときだけ、WASI用の設定を読み込む
#[cfg(not(feature = "cloudflare"))]
#[allow(warnings)]
mod bindings;

#[cfg(not(feature = "cloudflare"))]
pub mod wasi;

// 👑 Cloudflareフラグが「有る」ときだけ、Cloudflare用を読み込む
#[cfg(feature = "cloudflare")]
pub mod cloudflare;