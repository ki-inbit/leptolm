use reactive_stores::Store;

// 👑 1. 追加: リスト表示用の Item 構造体を定義
#[derive(Clone, Debug, PartialEq, Default)]
pub struct Item {
    pub id: String,
    pub item_name: String,
    pub quantity: u32,
}

#[derive(Store, Clone, Default)]
pub struct AppState {
    pub count: i32,
    pub user_name: String,
    pub status_message: String,
    pub add_item_id: u32,
    pub fetch_list_id: u32,
    pub update_item_id: u32,
    pub delete_item_id: u32,
    pub items: Vec<Item>,
    pub global_error: Option<String>,
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
    FetchListSuccess { request_id: u32, items: Vec<Item> },
    FetchListFailed { request_id: u32, error: String },
    UpdateItemAsync(String, u32), // (id, new_quantity)
    UpdateItemSuccess { request_id: u32, message: String },
    UpdateItemFailed { request_id: u32, error: String },
    DeleteItemAsync(String),
    DeleteItemSuccess { request_id: u32, message: String },
    DeleteItemFailed { request_id: u32, error: String },
    FetchBothAsync,

    GlobalError(String),
    ClearGlobalError,
}

#[derive(Clone, Debug, PartialEq)]
pub enum Effect {
    FetchUserEffect(u32),
    AddItemEffect { request_id: u32, item_name: String, quantity: u32 },
    FetchListEffect { request_id: u32 },
    UpdateItemEffect { request_id: u32, id: String, quantity: u32 },
    DeleteItemEffect { request_id: u32, id: String },
}