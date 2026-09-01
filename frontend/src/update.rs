use leptos::prelude::*;
use reactive_stores::Store;
use std::time::Duration;
use shared::{AddItemReq, AddItemRes, GetItemsRes};
use leptolm_core::{ElmApp, Dispatcher, Cmd};
use crate::model::{AppState, Action, Effect, AppStateStoreFields};

pub struct MyApp;

impl ElmApp for MyApp {
    type State = AppState;
    type Action = Action;
    type Effect = Effect;

    fn global_error_action(error_msg: String) -> Self::Action {
        Action::GlobalError(error_msg)
    }

    fn update(store: &Store<Self::State>, action: Self::Action) -> Cmd<Self::Effect> {
        match action {
            Action::Increment => { store.count().set(store.count().get_untracked() + 1); Cmd::None }
            Action::Decrement => { store.count().set(store.count().get_untracked() - 1); Cmd::None }
            Action::FetchUser(id) => { 
                store.status_message().set(format!("ユーザーID: {} を読み込み中...", id));
                Cmd::Single(Effect::FetchUserEffect(id)) 
            }
            Action::FetchUserSuccess(name) => { 
                store.user_name().set(name); 
                store.status_message().set("✅ ユーザー読込完了".into());
                Cmd::None 
            }
            Action::FetchUserFailed(err) => { store.status_message().set(err); Cmd::None }
            Action::ChangeUserName(new_name) => { store.user_name().set(new_name); Cmd::None }
            Action::AddItemAsync(name, qty) => {
                let next_id = store.add_item_id().get_untracked() + 1;
                store.add_item_id().set(next_id);
                store.status_message().set(format!("送信中... (リクエストID: {})", next_id));
                Cmd::Single(Effect::AddItemEffect { request_id: next_id, item_name: name, quantity: qty })
            }
            Action::AddItemSuccess { request_id, message } => {
                if request_id == store.add_item_id().get_untracked() {
                    store.status_message().set(format!("🎉 追加成功: {}", message));
                }
                Cmd::None
            }
            Action::AddItemFailed { request_id, error } => {
                if request_id == store.add_item_id().get_untracked() {
                    store.status_message().set(format!("❌ 追加失敗: {}", error));
                }
                Cmd::None
            }
            Action::FetchListAsync => {
                let next_id = store.fetch_list_id().get_untracked() + 1;
                store.fetch_list_id().set(next_id);
                store.status_message().set(format!("リスト取得中... (リクエストID: {})", next_id));
                Cmd::Single(Effect::FetchListEffect { request_id: next_id })
            }
            Action::FetchListSuccess { request_id, items } => {
                if request_id == store.fetch_list_id().get_untracked() {
                    store.items().set(items);
                    store.status_message().set("✅ リストを更新しました".into());
                }
                Cmd::None
            }
            Action::FetchListFailed { request_id, error } => {
                if request_id == store.fetch_list_id().get_untracked() {
                    store.status_message().set(format!("❌ リスト取得失敗: {}", error));
                }
                Cmd::None
            }
            Action::FetchBothAsync => {
                store.status_message().set("🔄 ユーザーとリストを同時に取得中...".into());
                let list_id = store.fetch_list_id().get_untracked() + 1;
                store.fetch_list_id().set(list_id);
                Cmd::Batch(vec![
                    Cmd::Single(Effect::FetchUserEffect(42)),
                    Cmd::Single(Effect::FetchListEffect { request_id: list_id }),
                ])
            }
            Action::GlobalError(msg) => {
                store.global_error().set(Some(msg));
                Cmd::None
            }
            Action::ClearGlobalError => {
                store.global_error().set(None);
                Cmd::None
            }
        }
    }

    fn execute_effect(effect: Self::Effect, dispatcher: Dispatcher<Self>) {
        match effect {
            Effect::FetchUserEffect(user_id) => {
                set_timeout(move || {
                    if user_id == 999 {
                        dispatcher.dispatch(Action::FetchUserFailed("ユーザーが見つかりません".to_string()));
                    } else {
                        dispatcher.dispatch(Action::FetchUserSuccess(format!("ユーザー_{}", user_id)));
                    }
                }, Duration::from_secs(1));
            }
            
            Effect::AddItemEffect { request_id, item_name, quantity } => {
                wasm_bindgen_futures::spawn_local(async move {
                    let req_body = AddItemReq { item_name, quantity };
                    let origin = web_sys::window().and_then(|w| w.location().origin().ok()).unwrap_or_else(|| "http://127.0.0.1:3000".to_string());
                    let url = format!("{}/api/add_item", origin.trim_end_matches('/'));
                    let client = reqwest::Client::new();
                    match client.post(&url).json(&req_body).send().await {
                        Ok(response) => {
                            if let Ok(res_data) = response.json::<AddItemRes>().await {
                                dispatcher.dispatch(Action::AddItemSuccess { request_id, message: res_data.message });
                            } else {
                                dispatcher.dispatch_error("APIレスポンスのパースに失敗しました！");
                            }
                        }
                        Err(e) => dispatcher.dispatch(Action::AddItemFailed { request_id, error: e.to_string() }),
                    }
                });
            }
            Effect::FetchListEffect { request_id } => {
                wasm_bindgen_futures::spawn_local(async move {
                    let origin = web_sys::window().and_then(|w| w.location().origin().ok()).unwrap_or_else(|| "http://127.0.0.1:3000".to_string());
                    let url = format!("{}/api/items", origin.trim_end_matches('/'));
                    let client = reqwest::Client::new();
                    
                    match client.get(&url).send().await {
                        Ok(response) => {
                            // 👑 1. JSONではなく、一旦「生の文字列」として受け取る
                            let text = response.text().await.unwrap_or_default();
                            
                            // 👑 2. ブラウザのコンソールに受信したデータを出力！
                            web_sys::console::log_1(&format!("📦 受信した生データ: {}", text).into());

                            // 👑 3. 手動でJSONに変換し、失敗理由を詳しく取得する
                            match serde_json::from_str::<GetItemsRes>(&text) {
                                Ok(res_data) => {
                                    let items = res_data.items.into_iter()
                                        .map(|item| format!("{} (x{})", item.item_name, item.quantity))
                                        .collect();
                                    dispatcher.dispatch(Action::FetchListSuccess { request_id, items });
                                }
                                Err(err) => {
                                    // 👑 エラーの詳細を画面に出す
                                    dispatcher.dispatch(Action::FetchListFailed { 
                                        request_id, 
                                        error: format!("パース失敗: {}", err) 
                                    });
                                }
                            }
                        }
                        Err(e) => dispatcher.dispatch(Action::FetchListFailed { request_id, error: e.to_string() }),
                    }
                });
            }
        }
    }
}