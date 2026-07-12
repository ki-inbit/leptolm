use leptos::prelude::*;
use leptos_meta::*;
use reactive_stores::Store;
use std::time::Duration;

#[derive(Store, Clone, Default)]
pub struct AppState {
    pub count: i32,
    pub user_name: String,
    pub status_message: String,
}

#[derive(Clone, Debug)]
pub enum Action {
    Increment,
    Decrement,
    FetchUser(u32),               
    FetchUserSuccess(String),     
    FetchUserFailed(String),      
}

fn update(store: &Store<AppState>, action: Action, cx: &Dispatcher) {
    match action {
        Action::Increment => {
            store.count().set(store.count().get() + 1);
            store.status_message().set("数値を増やしました".to_string());
        }
        Action::Decrement => {
            store.count().set(store.count().get() - 1);
            store.status_message().set("数値を減らしました".to_string());
        }
        Action::FetchUser(id) => {
            store.status_message().set(format!("ユーザーID: {} を読み込み中...", id));
            cx.execute_effect(id);
        }
        Action::FetchUserSuccess(name) => {
            store.user_name().set(name);
            store.status_message().set("読み込み完了".to_string());
        }
        Action::FetchUserFailed(err) => {
            store.status_message().set(format!("エラー発生: {}", err));
        }
    }
}

#[derive(Clone, Copy)]
pub struct Dispatcher {
    store: Store<AppState>,
}

impl Dispatcher {
    pub fn dispatch(&self, action: Action) {
        update(&self.store, action, self);
    }

    fn execute_effect(&self, user_id: u32) {
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
}

#[component]
pub fn App() -> impl IntoView {
    let store = Store::new(AppState::default());
    let dispatcher = Dispatcher { store: store.clone() };

    provide_context(dispatcher);
    provide_meta_context();

    leptos_mview::mview! {
        div style="font-family: sans-serif; padding: 20px;" {
            h1 { "Halogen x Leptos 融合アーキテクチャ" }

            div style="background: #f8f9fa; padding: 10px; margin-bottom: 20px;" {
                p { {move || store.status_message().get()} }
            }

            div style="margin-bottom: 20px;" {
                h3 { "ユーザー情報" }
                p { "名前: " {move || store.user_name().get()} }
                p { "数: " {move || store.count().get()} }
            }

            div {
                button on:click={move |_| dispatcher.dispatch(Action::Increment)} { "＋" }
                button on:click={move |_| dispatcher.dispatch(Action::Decrement)} { "－" }
                button on:click={move |_| dispatcher.dispatch(Action::FetchUser(42))} { "ユーザー読込" }
                button on:click={move |_| dispatcher.dispatch(Action::FetchUser(999))} { "エラーテスト" }
            }
        }
    }
}

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen(start)]
pub fn hydrate() {
    _ = console_log::init_with_level(log::Level::Debug);
    console_error_panic_hook::set_once();
    leptos::mount::hydrate_body(App);
}