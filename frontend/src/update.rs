use leptos::prelude::*;
use reactive_stores::Store;
use std::time::Duration;
use shared::{AddItemReq, AddItemRes, GetItemsRes, DeleteItemReq, DeleteItemRes, UpdateItemReq, UpdateItemRes};
use leptolm_core::{ElmApp, Dispatcher, Cmd};
use crate::model::{AppState, Action, Effect, AppStateStoreFields, Item};

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
            
            // アイテム追加
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

            // リスト取得
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

            // アイテム削除
            Action::DeleteItemAsync(id) => {
                let next_id = store.delete_item_id().get_untracked() + 1;
                store.delete_item_id().set(next_id);
                store.status_message().set(format!("アイテム削除中... (リクエストID: {})", next_id));
                Cmd::Single(Effect::DeleteItemEffect { request_id: next_id, id })
            }
            Action::DeleteItemSuccess { request_id, message } => {
                if request_id == store.delete_item_id().get_untracked() {
                    store.status_message().set(format!("🗑️ 削除完了: {}", message));
                }
                Cmd::None
            }
            Action::DeleteItemFailed { request_id, error } => {
                if request_id == store.delete_item_id().get_untracked() {
                    store.status_message().set(format!("❌ 削除失敗: {}", error));
                }
                Cmd::None
            }

            // 👑 追加: 数量更新
            Action::UpdateItemAsync(id, qty) => {
                let next_id = store.update_item_id().get_untracked() + 1;
                store.update_item_id().set(next_id);
                store.status_message().set(format!("数量更新中... (リクエストID: {})", next_id));
                Cmd::Single(Effect::UpdateItemEffect { request_id: next_id, id, quantity: qty })
            }
            Action::UpdateItemSuccess { request_id, message } => {
                if request_id == store.update_item_id().get_untracked() {
                    store.status_message().set(format!("✏️ 数量変更完了: {}", message));
                }
                Cmd::None
            }
            Action::UpdateItemFailed { request_id, error } => {
                if request_id == store.update_item_id().get_untracked() {
                    store.status_message().set(format!("❌ 数量変更失敗: {}", error));
                }
                Cmd::None
            }

            // エラー制御
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
                    let body_bytes = rmp_serde::to_vec(&req_body).unwrap_or_default();
                    
                    let origin = web_sys::window().and_then(|w| w.location().origin().ok()).unwrap_or_else(|| "http://127.0.0.1:3000".to_string());
                    let url = format!("{}/api/add_item", origin.trim_end_matches('/'));
                    let client = reqwest::Client::new();
                    
                    match client.post(&url)
                        .header("Content-Type", "application/x-msgpack")
                        .body(body_bytes)
                        .send().await {
                        Ok(response) => {
                            let bytes = response.bytes().await.unwrap_or_default();
                            if let Ok(res_data) = rmp_serde::from_slice::<AddItemRes>(&bytes) {
                                dispatcher.dispatch(Action::AddItemSuccess { request_id, message: res_data.message });
                                dispatcher.dispatch(Action::FetchListAsync);
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
                    
                    match client.get(&url)
                        .header("Cache-Control", "no-store, no-cache, must-revalidate")
                        .send().await {
                        Ok(response) => {
                            let bytes = response.bytes().await.unwrap_or_default();
                            match rmp_serde::from_slice::<GetItemsRes>(&bytes) {
                                Ok(res_data) => {
                                    let items = res_data.items.into_iter()
                                        .map(|item| Item { 
                                            id: item.id, 
                                            item_name: item.item_name, 
                                            quantity: item.quantity 
                                        })
                                        .collect();
                                    dispatcher.dispatch(Action::FetchListSuccess { request_id, items });
                                }
                                Err(err) => dispatcher.dispatch(Action::FetchListFailed { 
                                    request_id, error: format!("パース失敗: {}", err) 
                                }),
                            }
                        }
                        Err(e) => dispatcher.dispatch(Action::FetchListFailed { request_id, error: e.to_string() }),
                    }
                });
            }

            Effect::DeleteItemEffect { request_id, id } => {
                wasm_bindgen_futures::spawn_local(async move {
                    let req_body = DeleteItemReq { id };
                    let body_bytes = rmp_serde::to_vec(&req_body).unwrap_or_default();
                    
                    let origin = web_sys::window().and_then(|w| w.location().origin().ok()).unwrap_or_else(|| "http://127.0.0.1:3000".to_string());
                    let url = format!("{}/api/delete_item", origin.trim_end_matches('/'));
                    let client = reqwest::Client::new();
                    
                    match client.post(&url)
                        .header("Content-Type", "application/x-msgpack")
                        .body(body_bytes)
                        .send().await {
                        Ok(response) => {
                            let bytes = response.bytes().await.unwrap_or_default();
                            if let Ok(res_data) = rmp_serde::from_slice::<DeleteItemRes>(&bytes) {
                                dispatcher.dispatch(Action::DeleteItemSuccess { request_id, message: res_data.message });
                                dispatcher.dispatch(Action::FetchListAsync);
                            } else {
                                dispatcher.dispatch_error("削除APIのレスポンスパースに失敗しました");
                                dispatcher.dispatch(Action::FetchListAsync);
                            }
                        }
                        Err(e) => dispatcher.dispatch(Action::DeleteItemFailed { request_id, error: e.to_string() }),
                    }
                });
            }

            // 👑 追加: 数量更新エフェクト
            Effect::UpdateItemEffect { request_id, id, quantity } => {
                wasm_bindgen_futures::spawn_local(async move {
                    let req_body = UpdateItemReq { id, quantity };
                    let body_bytes = rmp_serde::to_vec(&req_body).unwrap_or_default();
                    
                    let origin = web_sys::window().and_then(|w| w.location().origin().ok()).unwrap_or_else(|| "http://127.0.0.1:3000".to_string());
                    let url = format!("{}/api/update_item", origin.trim_end_matches('/'));
                    let client = reqwest::Client::new();
                    
                    match client.post(&url)
                        .header("Content-Type", "application/x-msgpack")
                        .body(body_bytes)
                        .send().await {
                        Ok(response) => {
                            let bytes = response.bytes().await.unwrap_or_default();
                            if let Ok(res_data) = rmp_serde::from_slice::<UpdateItemRes>(&bytes) {
                                dispatcher.dispatch(Action::UpdateItemSuccess { request_id, message: res_data.message });
                                dispatcher.dispatch(Action::FetchListAsync);
                            } else {
                                dispatcher.dispatch_error("数量更新APIのレスポンスパースに失敗しました");
                                dispatcher.dispatch(Action::FetchListAsync);
                            }
                        }
                        Err(e) => dispatcher.dispatch(Action::UpdateItemFailed { request_id, error: e.to_string() }),
                    }
                });
            }
        }
    }
}