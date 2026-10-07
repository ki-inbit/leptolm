use leptos::prelude::*;
use leptos_meta::*;
use leptos_mview::mview;
use reactive_stores::Store;
use leptolm_core::Dispatcher;

use crate::model::Action;
use crate::update::MyApp;
use crate::model::AppStateStoreFields;
// 👑 RemovableListItem を追加インポート
use crate::components::{TextInputForm, TextAndNumberInputForm, UnityPlayer, MobileKeyboardCloser, RemovableListItem};

#[component]
pub fn App() -> impl IntoView {
    let store = Store::new(Default::default());
    let dispatcher = Dispatcher::<MyApp>::new(store.clone());

    let is_open = RwSignal::new(false);

    provide_context(dispatcher);
    provide_meta_context();

    mview! {
        div style="font-family: sans-serif; padding: 15px; max-width: 1000px; margin: 0 auto; box-sizing: border-box;" {
            {view! { <MobileKeyboardCloser/> }}
            h1 style="font-size: 1.5rem; word-break: keep-all;" { "コア分離版 ハイブリッドアーキテクチャ" }

            {move || store.global_error().get().map(|err| mview! {
                div style="background: #ffebee; color: #c62828; padding: 15px; margin-bottom: 20px; border-left: 5px solid #c62828; display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; align-items: center;" {
                    span { strong { "🚨 システムエラー: " } {err} }
                    button 
                        on:click={move |_| dispatcher.dispatch(Action::ClearGlobalError)}
                        style="background: transparent; border: 1px solid #c62828; color: #c62828; cursor: pointer; padding: 8px 12px; font-size: 16px; white-space: nowrap;" 
                    { "✕ 閉じる" }
                }
            })}

            button 
                style="margin-bottom: 20px; background: #ffcdd2; color: #b71c1c; border: 1px solid #e53935; padding: 8px 16px; font-size: 16px; cursor: pointer;"
                on:click={move |_| dispatcher.dispatch_error("意図的に発生させた重大なシステムエラーです！")} 
            { "🔥 強制エラーテスト" }

            div style="background: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 4px; word-wrap: break-word;" {
                p style="margin: 0 0 10px 0;" { "📢 ステータス: " strong { {move || store.status_message().get()} } }
                p style="margin: 0 0 10px 0;" { "現在のカウント: " {move || store.count().get()} }
                p style="margin: 0;" { "現在の正式な名前: " {move || store.user_name().get()} }
            }

            div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;" {
                button style="padding: 8px 16px; font-size: 16px;" on:click={move |_| dispatcher.dispatch(Action::Increment)} { "＋" }
                button style="padding: 8px 16px; font-size: 16px;" on:click={move |_| dispatcher.dispatch(Action::Decrement)} { "－" }
                button style="padding: 8px 16px; font-size: 16px;" on:click={move |_| dispatcher.dispatch(Action::FetchUser(42))} { "ユーザー読込" }
                button 
                    style="background: #e0f7fa; border: 1px solid #00acc1; padding: 8px 16px; font-size: 16px; border-radius: 4px;"
                    on:click={move |_| dispatcher.dispatch(Action::FetchBothAsync)} 
                { "⚡ ユーザー＆リスト同時取得" }
            }

            {view! { 
                <TextAndNumberInputForm 
                    title="🚀 アイテム追加"
                    placeholder="何を追加しますか？"
                    button_text="送信する"
                    on_submit={move |name, qty| Action::AddItemAsync(name, qty)}
                /> 
            }}

            div style="margin-bottom: 20px; padding: 15px; background: #e3f2fd; border: 1px solid #90caf9; border-radius: 4px;" {
                h3 style="margin-top: 0; color: #1976d2;" { "📋 アイテム一覧 (GET)" }
                button 
                    style="margin-bottom: 10px; padding: 8px 16px; font-size: 16px;"
                    on:click={move |_| dispatcher.dispatch(Action::FetchListAsync)} 
                { "🔄 一覧を更新" }
                
                // 👑 修正: <ul> のデフォルトスタイルを消し、RemovableListItem を描画する
                ul style="margin: 0; padding: 0; list-style: none;" {
                    {move || store.items().get().into_iter().map(|item| {
                        // 💡 もし現状 `item` が単なる String 型の場合はエラーになります。
                        // その場合は `crate::model::Item` を { id: String, item_name: String, quantity: u32 } のような構造体に変更してください。
                        view! {
                            <RemovableListItem
                                id={item.id.clone()}
                                display_text={format!("{} (x{})", item.item_name, item.quantity)}
                                on_delete={move |id| Action::DeleteItemAsync(id)}
                            />
                        }
                    }).collect_view()}
                }
            }

            div style="margin-top: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; width: 100%;" {
                h3 style="margin-top: 0;" { "ローカルUIステートの領域" }
                button 
                    style="padding: 8px 16px; font-size: 16px;"
                    on:click={move |_| is_open.update(|v| *v = !*v)} 
                {
                    {move || if is_open.get() { "▼ 閉じる" } else { "▶ 開く" }}
                }

                {move || is_open.get().then(|| view! {
                    <TextInputForm 
                        title="👤 ユーザー名の変更"
                        placeholder="新しい名前を入力..."
                        button_text="正式な名前に反映"
                        on_submit={move |name| Action::ChangeUserName(name)}
                    />
                })}
            }

            div style="margin-top: 20px; background: #d3fae8; color: #27962d; border: 1px solid #ccc; border-radius: 4px; overflow: hidden;" {
                h3 style="margin-top: 0; padding: 15px;" { "🕹️ゲームコーナー" }
                {view! { 
                    <UnityPlayer/>
                }}
            }
        }
    }
}