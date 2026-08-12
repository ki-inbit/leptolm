use leptos::prelude::*;
use reactive_stores::Store;
use std::time::Duration;
use shared::{AddItemReq, AddItemRes};

// 👑 Cmd をコアからインポート
use leptolm_core::{ElmApp, Dispatcher, Cmd}; 
// 👑 CmdではなくEffectをインポート
use crate::model::{AppState, Action, Effect, AppStateStoreFields}; 

pub struct MyApp;

impl ElmApp for MyApp {
    type State = AppState;
    type Action = Action;
    type Effect = Effect; // 👑 type Cmd を type Effect に変更

    fn update(store: &Store<Self::State>, action: Self::Action) -> Cmd<Self::Effect> {
        match action {
            Action::Increment => { store.count().set(store.count().get_untracked() + 1); Cmd::None }
            Action::Decrement => { store.count().set(store.count().get_untracked() - 1); Cmd::None }
            
            Action::FetchUser(id) => { 
                store.status_message().set(format!("ユーザーID: {} を読み込み中...", id));
                Cmd::Single(Effect::FetchUserEffect(id)) // 👑 Single で包む
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

            // 👑 新しいアクション！同時に2つの通信を走らせる Batch の魔法
            Action::FetchBothAsync => {
                store.status_message().set("🔄 ユーザーとリストを同時に取得中...".into());
                let list_id = store.fetch_list_id().get_untracked() + 1;
                store.fetch_list_id().set(list_id);
                
                // コアに実装した Batch を使って、複数の指示を一度に返す！
                Cmd::Batch(vec![
                    Cmd::Single(Effect::FetchUserEffect(42)),
                    Cmd::Single(Effect::FetchListEffect { request_id: list_id }),
                ])
            }
        }
    }

    // 👑 execute_cmd を execute_effect に変更。引数も Effect に！
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
                                dispatcher.dispatch(Action::AddItemFailed { request_id, error: "パース失敗".into() });
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
                            if let Ok(items) = response.json::<Vec<String>>().await {
                                dispatcher.dispatch(Action::FetchListSuccess { request_id, items });
                            } else {
                                set_timeout(move || {
                                    dispatcher.dispatch(Action::FetchListSuccess { 
                                        request_id, 
                                        items: vec!["ダミーりんご".into(), "ダミーみかん".into()] 
                                    });
                                }, Duration::from_millis(500));
                            }
                        }
                        Err(e) => dispatcher.dispatch(Action::FetchListFailed { request_id, error: e.to_string() }),
                    }
                });
            }
        }
    }
}