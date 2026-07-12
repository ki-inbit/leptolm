use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct AddItemReq {
    pub item_name: String,
    pub quantity: u32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AddItemRes {
    pub success: bool,
    pub message: String,
    pub server_time: String,
}