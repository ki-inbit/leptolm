use reactive_stores::Store;

// 👑 新しいコアのCmd型。これがフレームワークの標準機能になります。
pub enum Cmd<T> {
    None,
    Single(T),
    Batch(Vec<Cmd<T>>),
}

pub trait ElmApp: 'static + Sized {
    type State: 'static;
    type Action: 'static;
    // 👑 ユーザーが定義する副作用は「Effect」という名前に変わります
    type Effect: 'static;

    // 👑 戻り値を core の Cmd<Self::Effect> に変更
    fn update(store: &Store<Self::State>, action: Self::Action) -> Cmd<Self::Effect>;

    // 👑 コマンドではなく「単一の副作用(Effect)」を受け取って実行する関数
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

    // 👑 Cmd を再帰的に処理して、Batchなら中身を全て実行する仕組み
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