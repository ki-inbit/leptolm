use leptos::prelude::*;
use leptos_meta::*;
use leptos_mview::mview;
use reactive_stores::Store;
use std::time::Duration; // 👑 タイマー用に復活！
use shared::{AddItemReq, AddItemRes};

// =========================================================================
// 1. 【MODEL / STATE】
// =========================================================================
#[derive(Store, Clone, Default)]
pub struct AppState {
    pub count: i32,
    pub user_name: String,
    pub status_message: String,
    pub latest_request_id: u32,
}

// =========================================================================
// 2. 【ACTION】
// =========================================================================
#[derive(Clone, Debug)]
pub enum Action {
    Increment,
    Decrement,
    FetchUser(u32),               
    FetchUserSuccess(String),     
    FetchUserFailed(String),
    ChangeUserName(String),
    
    AddItemAsync(String, u32),         
    AddItemSuccess { request_id: u32, message: String },
    AddItemFailed { request_id: u32, error: String },
}

// =========================================================================
// 3. 【COMMAND】
// =========================================================================
#[derive(Clone, Debug, PartialEq)]
pub enum Cmd {
    None,
    FetchUserEffect(u32),
    AddItemEffect { request_id: u32, item_name: String, quantity: u32 },
}

// =========================================================================
// 4. 【UPDATE】
// =========================================================================
fn update(store: &Store<AppState>, action: Action) -> Cmd {
    match action {
        Action::Increment => { 
            store.count().set(store.count().get_untracked() + 1); 
            Cmd::None 
        }
        Action::Decrement => { 
            store.count().set(store.count().get_untracked() - 1); 
            Cmd::None 
        }
        Action::FetchUser(id) => { 
            // 👑 ステータス更新も復活！
            store.status_message().set(format!("ユーザーID: {} を読み込み中...", id));
            Cmd::FetchUserEffect(id) 
        }
        Action::FetchUserSuccess(name) => { store.user_name().set(name); Cmd::None }
        Action::FetchUserFailed(err) => { store.status_message().set(err); Cmd::None }
        Action::ChangeUserName(new_name) => { store.user_name().set(new_name); Cmd::None }

        Action::AddItemAsync(name, qty) => {
            let next_id = store.latest_request_id().get_untracked() + 1;
            store.latest_request_id().set(next_id);
            store.status_message().set(format!("送信中... (リクエストID: {})", next_id));
            Cmd::AddItemEffect { request_id: next_id, item_name: name, quantity: qty }
        }

        Action::AddItemSuccess { request_id, message } => {
            let current_id = store.latest_request_id().get_untracked();
            if request_id == current_id {
                store.status_message().set(format!("🎉 サーバーから応答: {}", message));
            } else {
                log::warn!("⚠️ 古いレスポンス (ID: {}) を検知したため破棄しました。現在の最新は ID: {} です。", request_id, current_id);
            }
            Cmd::None
        }

        Action::AddItemFailed { request_id, error } => {
            if request_id == store.latest_request_id().get_untracked() {
                store.status_message().set(format!("❌ 通信失敗: {}", error));
            }
            Cmd::None
        }
    }
}

// =========================================================================
// 5. 【RUNTIME / DISPATCHER】
// =========================================================================
#[derive(Clone, Copy)]
pub struct Dispatcher {
    store: Store<AppState>,
}

impl Dispatcher {
    pub fn dispatch(&self, action: Action) {
        let cmd = update(&self.store, action);
        self.execute_cmd(cmd);
    }

    fn execute_cmd(&self, cmd: Cmd) {
        match cmd {
            Cmd::None => {}
            
            // 👑 中身の処理を丸ごと復活！
            Cmd::FetchUserEffect(user_id) => {
                let dispatch = self.clone();
                set_timeout(move || {
                    if user_id == 999 {
                        dispatch.dispatch(Action::FetchUserFailed("ユーザーが見つかりません".to_string()));
                    } else {
                        let fetched_name = format!("ユーザー_{}", user_id);
                        dispatch.dispatch(Action::FetchUserSuccess(fetched_name));
                    }
                }, Duration::from_secs(1));
            }

            Cmd::AddItemEffect { request_id, item_name, quantity } => {
                let dispatch = self.clone();

                wasm_bindgen_futures::spawn_local(async move {
                    let req_body = AddItemReq { item_name, quantity };

                    let origin = web_sys::window()
                        .and_then(|w| w.location().origin().ok())
                        .unwrap_or_else(|| "http://127.0.0.1:3000".to_string());
                    let url = format!("{}/api/add_item", origin.trim_end_matches('/'));

                    let client = reqwest::Client::new();
                    let res = client.post(&url).json(&req_body).send().await;

                    match res {
                        Ok(response) => {
                            if let Ok(res_data) = response.json::<AddItemRes>().await {
                                dispatch.dispatch(Action::AddItemSuccess { request_id, message: res_data.message });
                            } else {
                                dispatch.dispatch(Action::AddItemFailed { request_id, error: "パース失敗".into() });
                            }
                        }
                        Err(e) => {
                            dispatch.dispatch(Action::AddItemFailed { request_id, error: e.to_string() });
                        }
                    }
                });
            }
        }
    }
}

// =========================================================================
// 6. 【VIEW】
// =========================================================================
#[component]
pub fn App() -> impl IntoView {
    let store = Store::new(AppState::default());
    let dispatcher = Dispatcher { store: store.clone() };

    let is_open = RwSignal::new(false);
    let draft_name = RwSignal::new(String::new());
    let input_item = RwSignal::new(String::new());
    let input_qty = RwSignal::new(1u32);

    provide_context(dispatcher);
    provide_meta_context();

    mview! {
        div style="font-family: sans-serif; padding: 20px;" {
            h1 { "ハイブリッド型アーキテクチャ (Pattern B)" }

            div style="background: #f8f9fa; padding: 10px; margin-bottom: 20px;" {
                p { "📢 ステータス: " strong { {move || store.status_message().get()} } }
                p { "現在のカウント: " {move || store.count().get()} }
                p { "現在の正式な名前: " {move || store.user_name().get()} }
            }

            div style="margin-bottom: 20px;" {
                button on:click={move |_| dispatcher.dispatch(Action::Increment)} { "＋" }
                button on:click={move |_| dispatcher.dispatch(Action::Decrement)} { "－" }
                button on:click={move |_| dispatcher.dispatch(Action::FetchUser(42))} { "ユーザー読込" }
            }

            div style="margin-bottom: 20px; padding: 15px; background: #fff9e6; border: 1px solid #ffe0b2; border-radius: 4px;" {
                h3 style="margin-top: 0; color: #f57c00;" { "🚀 レースコンディション防衛済みの通信" }
                div style="display: flex; gap: 10px; align-items: center;" {
                    input
                        type="text"
                        placeholder="商品名（例: リンゴ）"
                        prop:value={move || input_item.get()}
                        on:input={move |e| input_item.set(event_target_value(&e))}
                    ;
                    input
                        type="number"
                        style="width: 60px;"
                        prop:value={move || input_qty.get().to_string()}
                        on:input={move |e| {
                            if let Ok(val) = event_target_value(&e).parse::<u32>() {
                                input_qty.set(val);
                            }
                        }}
                    ;
                    button
                        on:click={move |_| {
                            let name = input_item.get_untracked();
                            if !name.is_empty() {
                                dispatcher.dispatch(Action::AddItemAsync(name, input_qty.get_untracked()));
                                input_item.set(String::new());
                                input_qty.set(1);
                            }
                        }}
                    { "サーバーへ送信" }
                }
            }

            div style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;" {
                h3 style="margin-top: 0;" { "ローカルUIステート（Signal）の領域" }
                button on:click={move |_| is_open.update(|v| *v = !*v)} {
                    {move || if is_open.get() { "▼ 閉じる" } else { "▶ 開く" }}
                }

                {move || is_open.get().then(|| mview! {
                    div style="padding: 10px; margin-top: 10px; background: #eef;" {
                        input
                            type="text"
                            placeholder="新しい名前を入力..."
                            prop:value={move || draft_name.get()}
                            on:input={move |e| draft_name.set(event_target_value(&e))}
                        ;
                        button
                            style="margin-left: 10px;"
                            on:click={move |_| {
                                let name = draft_name.get_untracked();
                                if !name.is_empty() {
                                    dispatcher.dispatch(Action::ChangeUserName(name));
                                    draft_name.set(String::new());
                                }
                            }}
                        { "正式な名前に反映" }
                    }
                })}
            }
        }
    }
}

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn hydrate() {
    _ = console_log::init_with_level(log::Level::Debug);
    console_error_panic_hook::set_once();
    leptos::mount::hydrate_body(App);
}