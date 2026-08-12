use reactive_stores::Store;

pub enum Cmd<T> {
    None,
    Single(T),
    Batch(Vec<Cmd<T>>),
}

pub trait ElmApp: 'static + Sized {
    type State: 'static;
    type Action: 'static;
    type Effect: 'static;

    fn global_error_action(error_msg: String) -> Self::Action;

    fn update(store: &Store<Self::State>, action: Self::Action) -> Cmd<Self::Effect>;
    fn execute_effect(effect: Self::Effect, dispatcher: Dispatcher<Self>);
}

pub struct Dispatcher<T: ElmApp> {
    pub store: Store<T::State>,
}

impl<T: ElmApp> Clone for Dispatcher<T> {
    fn clone(&self) -> Self {
        Self {
            store: self.store.clone(),
        }
    }
}

impl<T: ElmApp> Copy for Dispatcher<T> {}

impl<T: ElmApp> Dispatcher<T> {
    pub fn new(store: Store<T::State>) -> Self {
        Self { store }
    }

    pub fn dispatch(&self, action: T::Action) {
        let cmd = T::update(&self.store, action);
        self.handle_cmd(cmd);
    }

    pub fn dispatch_error(&self, error_message: impl Into<String>) {
        let action = T::global_error_action(error_message.into());
        self.dispatch(action);
    }

    fn handle_cmd(&self, cmd: Cmd<T::Effect>) {
        match cmd {
            Cmd::None => {}
            Cmd::Single(effect) => {
                T::execute_effect(effect, *self);
            }
            Cmd::Batch(cmds) => {
                for c in cmds {
                    self.handle_cmd(c);
                }
            }
        }
    }
}