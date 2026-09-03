use leptos::prelude::*;
use leptos_mview::mview;
use leptolm_core::Dispatcher;

use crate::model::Action;
use crate::update::MyApp;

#[component]
pub fn GenericInputForm<F>(
    #[prop(into)] title: String,
    #[prop(into)] placeholder: String,
    #[prop(into)] button_text: String,
    on_submit: F, 
) -> impl IntoView
where
    F: Fn(String, u32) -> Action + Clone + Send + Sync + 'static,
{
    // 👑 修正1: expect を削除し、Option<Dispatcher<MyApp>> として安全に受け取る
    let dispatcher = use_context::<Dispatcher<MyApp>>();

    let input_text = RwSignal::new(String::new());
    let input_qty = RwSignal::new(1u32);

    mview! {
        div style="margin-bottom: 20px; padding: 15px; background: #fff9e6; border: 1px solid #ffe0b2; border-radius: 4px;" {
            h3 style="margin-top: 0; color: #f57c00;" { {title} }
            div style="display: flex; gap: 10px; align-items: center;" {
                input
                    type="text"
                    placeholder={placeholder}
                    prop:value={move || input_text.get()}
                    on:input={move |e| input_text.set(event_target_value(&e))}
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
                    on:click={
                        let on_submit = on_submit.clone();
                        move |_| {
                            let text = input_text.get_untracked();
                            if !text.is_empty() {
                                // 👑 修正2: ディスパッチャーが存在する場合（ブラウザでのHydration完了後）のみ実行
                                if let Some(disp) = &dispatcher {
                                    let action = on_submit(text, input_qty.get_untracked());
                                    disp.dispatch(action);
                                    
                                    input_text.set(String::new());
                                    input_qty.set(1);
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
        div style="width: 960px; height: 600px; margin: 0 auto; background: #000;" {
            canvas id="unity-canvas" style="width: 100%; height: 100%;" {}
        }
    }
}