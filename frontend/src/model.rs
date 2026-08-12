use reactive_stores::Store;

#[derive(Store, Clone, Default)]
pub struct AppState {
    pub count: i32,
    pub user_name: String,
    pub status_message: String,
    pub add_item_id: u32,
    pub fetch_list_id: u32,
    pub items: Vec<String>,
}

#[derive(Clone, Debug)]
pub enum Action {
    Increment,
    Decrement,
    FetchUser(u32),               
    FetchUserSuccess(String),     
    FetchUserFailed(String),
    ChangeUserName(String),
    AddItemAsync(String, u32),         
    AddItemSuccess { request_id: u32, message: String },
    AddItemFailed { request_id: u32, error: String },
    FetchListAsync,
    FetchListSuccess { request_id: u32, items: Vec<String> },
    FetchListFailed { request_id: u32, error: String },
    // 👑 テスト用に新しいアクションを追加！
    FetchBothAsync, 
}

#[derive(Clone, Debug, PartialEq)]
// 👑 名前を Cmd から Effect に変更！
pub enum Effect {
    FetchUserEffect(u32),
    AddItemEffect { request_id: u32, item_name: String, quantity: u32 },
    FetchListEffect { request_id: u32 },
}