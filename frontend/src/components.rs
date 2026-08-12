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
    let dispatcher = use_context::<Dispatcher<MyApp>>()
        .expect("ディスパッチャーが見つかりません");

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
                                let action = on_submit(text, input_qty.get_untracked());
                                dispatcher.dispatch(action);
                                
                                input_text.set(String::new());
                                input_qty.set(1);
                            }
                        }
                    }
                { {button_text} }
            }
        }
    }
}