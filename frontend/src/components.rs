use leptos::prelude::*;
use leptos_mview::mview;
use leptolm_core::Dispatcher;

use crate::model::Action;
use crate::update::MyApp;

// ==========================================
// 👑 1. テキスト入力専用フォーム (名前変更用など)
// ==========================================
#[component]
pub fn TextInputForm<F>(
    #[prop(into)] title: String,
    #[prop(into)] placeholder: String,
    #[prop(into)] button_text: String,
    on_submit: F, 
) -> impl IntoView
where
    // 👑 こちらは Action に String だけを渡す
    F: Fn(String) -> Action + Clone + Send + Sync + 'static,
{
    let dispatcher = use_context::<Dispatcher<MyApp>>();
    let input_text = RwSignal::new(String::new());
    let text_input_ref = NodeRef::<leptos::html::Input>::new();

    mview! {
        div style="margin-bottom: 20px; padding: 15px; background: #fff9e6; border: 1px solid #ffe0b2; border-radius: 4px; box-sizing: border-box; width: 100%;" {
            h3 style="margin-top: 0; color: #f57c00;" { {title} }
            div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;" {
                input
                    ref={text_input_ref}
                    type="text"
                    style="flex: 1; min-width: 150px; padding: 8px; box-sizing: border-box; font-size: 16px;"
                    placeholder={placeholder}
                    value={input_text.get_untracked()}
                    on:input={move |e| input_text.set(event_target_value(&e))}
                    on:keydown={move |e| e.stop_propagation()}
                    on:keyup={move |e| e.stop_propagation()}
                    on:keypress={move |e| e.stop_propagation()}
                ;
                button
                    style="padding: 8px 16px; font-size: 16px; cursor: pointer; white-space: nowrap;"
                    on:click={
                        let on_submit = on_submit.clone();
                        move |_| {
                            let text = input_text.get_untracked();
                            if !text.is_empty() {
                                if let Some(disp) = &dispatcher {
                                    disp.dispatch(on_submit(text));
                                    
                                    input_text.set(String::new());
                                    if let Some(input_el) = text_input_ref.get() {
                                        input_el.set_value("");
                                    }
                                }
                            }
                        }
                    }
                { {button_text} }
            }
        }
    }
}

// ==========================================
// 👑 2. テキスト＋数字フォーム (アイテム追加用など)
// ==========================================
#[component]
pub fn TextAndNumberInputForm<F>(
    #[prop(into)] title: String,
    #[prop(into)] placeholder: String,
    #[prop(into)] button_text: String,
    on_submit: F, 
) -> impl IntoView
where
    // 👑 これまでの GenericInputForm と同じ
    F: Fn(String, u32) -> Action + Clone + Send + Sync + 'static,
{
    let dispatcher = use_context::<Dispatcher<MyApp>>();
    let input_text = RwSignal::new(String::new());
    let input_qty = RwSignal::new(1u32);
    let text_input_ref = NodeRef::<leptos::html::Input>::new();

    mview! {
        div style="margin-bottom: 20px; padding: 15px; background: #fff9e6; border: 1px solid #ffe0b2; border-radius: 4px; box-sizing: border-box; width: 100%;" {
            h3 style="margin-top: 0; color: #f57c00;" { {title} }
            div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;" {
                input
                    ref={text_input_ref}
                    type="text"
                    style="flex: 1; min-width: 150px; padding: 8px; box-sizing: border-box; font-size: 16px;"
                    placeholder={placeholder}
                    value={input_text.get_untracked()}
                    on:input={move |e| input_text.set(event_target_value(&e))}
                    on:keydown={move |e| e.stop_propagation()}
                    on:keyup={move |e| e.stop_propagation()}
                    on:keypress={move |e| e.stop_propagation()}
                ;
                input
                    type="number"
                    style="width: 70px; padding: 8px; box-sizing: border-box; font-size: 16px;"
                    value={input_qty.get_untracked().to_string()}
                    on:input={move |e| {
                        if let Ok(val) = event_target_value(&e).parse::<u32>() {
                            input_qty.set(val);
                        }
                    }}
                    on:keydown={move |e| e.stop_propagation()}
                    on:keyup={move |e| e.stop_propagation()}
                    on:keypress={move |e| e.stop_propagation()}
                ;
                button
                    style="padding: 8px 16px; font-size: 16px; cursor: pointer; white-space: nowrap;"
                    on:click={
                        let on_submit = on_submit.clone();
                        move |_| {
                            let text = input_text.get_untracked();
                            if !text.is_empty() {
                                if let Some(disp) = &dispatcher {
                                    disp.dispatch(on_submit(text, input_qty.get_untracked()));
                                    
                                    input_text.set(String::new());
                                    input_qty.set(1);
                                    if let Some(input_el) = text_input_ref.get() {
                                        input_el.set_value("");
                                    }
                                }
                            }
                        }
                    }
                { {button_text} }
            }
        }
    }
}

// 👑 Unityを表示するための汎用コンポーネント
#[component]
pub fn UnityPlayer() -> impl IntoView {
// 👑 インフラごとの拡張子切り替えロジック
    let ext = if cfg!(feature = "cloudflare") {
        ".unityweb"
    } else {
        ".unityweb"
    };
    
    Effect::new(move |_| {
        let code = format!(r#"
            (function() {{
                var canvas = document.querySelector('#unity-canvas');
                if (!canvas) return;

                if (window.unityInstance) return;

                var loaderScript = document.createElement('script');
                loaderScript.src = '/unity/Build/build.loader.js';
                loaderScript.onload = function() {{
                    var config = {{
                        dataUrl: '/unity/Build/build.data{ext}',
                        frameworkUrl: '/unity/Build/build.framework.js{ext}',
                        codeUrl: '/unity/Build/build.wasm{ext}',
                        streamingAssetsUrl: 'StreamingAssets',
                        companyName: 'DefaultCompany',
                        productName: 'My Unity Game',
                        productVersion: '1.0',
                    }};
                    createUnityInstance(canvas, config)
                        .then(function(instance) {{
                            window.unityInstance = instance;
                            console.log('🎉 Unity起動成功！');
                        }})
                        .catch(function(message) {{
                            console.error('Unity Launch Error:', message);
                        }});
                }};
                document.body.appendChild(loaderScript);
            }})();
        "#);

        let _ = js_sys::eval(&code);
    });

    mview! {
        div style="width: 100%; height: 100dvh; max-width: 960px; max-height: 600px; margin: 0 auto; background: #000; overflow: hidden;" {
            canvas 
                id="unity-canvas" 
                tabindex="0" 
                style="width: 100%; height: 100%; display: block; outline: none;" 
                // 👑 追加: 矢印キーやスペースキーを押した時、ブラウザのスクロール機能を無効化する！
                on:keydown={move |e| {
                    let key = e.key();
                    // 上下左右の矢印キーと、スペースキー(ジャンプ等で使う場合)のスクロールを止める
                    if key == "ArrowUp" || key == "ArrowDown" || key == "ArrowLeft" || key == "ArrowRight" || key == " " {
                        e.prevent_default();
                    }
                }}
            {}
        }
    }
}