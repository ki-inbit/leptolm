use leptos::prelude::*;
use leptos_meta::*;
use leptos_mview::mview;
use reactive_stores::Store;
use leptolm_core::Dispatcher;

use crate::model::Action;
use crate::update::MyApp;
use crate::model::AppStateStoreFields;

#[component]
pub fn App() -> impl IntoView {
    let store = Store::new(Default::default());
    let dispatcher = Dispatcher::<MyApp>::new(store.clone());

    let is_open = RwSignal::new(false);
    let draft_name = RwSignal::new(String::new());
    let input_item = RwSignal::new(String::new());
    let input_qty = RwSignal::new(1u32);

    provide_context(dispatcher);
    provide_meta_context();

    mview! {
        div style="font-family: sans-serif; padding: 20px;" {
            h1 { "コア分離版 ハイブリッドアーキテクチャ" }

            div style="background: #f8f9fa; padding: 10px; margin-bottom: 20px;" {
                p { "📢 ステータス: " strong { {move || store.status_message().get()} } }
                p { "現在のカウント: " {move || store.count().get()} }
                p { "現在の正式な名前: " {move || store.user_name().get()} }
            }

            div style="margin-bottom: 20px;" {
                button on:click={move |_| dispatcher.dispatch(Action::Increment)} { "＋" }
                button on:click={move |_| dispatcher.dispatch(Action::Decrement)} { "－" }
                button on:click={move |_| dispatcher.dispatch(Action::FetchUser(42))} { "ユーザー読込" }

                // 👑 ここにボタンを追加！
                button 
                    style="margin-left: 10px; background: #e0f7fa; border: 1px solid #00acc1; padding: 4px 8px; border-radius: 4px;"
                    on:click={move |_| dispatcher.dispatch(Action::FetchBothAsync)} 
                { "⚡ ユーザー＆リスト同時取得" }
            }

            div style="margin-bottom: 20px; padding: 15px; background: #fff9e6; border: 1px solid #ffe0b2; border-radius: 4px;" {
                h3 style="margin-top: 0; color: #f57c00;" { "🚀 アイテム追加 (POST)" }
                div style="display: flex; gap: 10px; align-items: center;" {
                    input
                        type="text"
                        placeholder="商品名"
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
                    { "追加する" }
                }
            }

            div style="margin-bottom: 20px; padding: 15px; background: #e3f2fd; border: 1px solid #90caf9; border-radius: 4px;" {
                h3 style="margin-top: 0; color: #1976d2;" { "📋 アイテム一覧 (GET)" }
                button 
                    style="margin-bottom: 10px;"
                    on:click={move |_| dispatcher.dispatch(Action::FetchListAsync)} 
                { "🔄 一覧を更新" }
                
                ul style="margin: 0; padding-left: 20px;" {
                    {move || store.items().get().into_iter().map(|item| {
                        view! { <li>{item}</li> }
                    }).collect_view()}
                }
            }

            div style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;" {
                h3 style="margin-top: 0;" { "ローカルUIステートの領域" }
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