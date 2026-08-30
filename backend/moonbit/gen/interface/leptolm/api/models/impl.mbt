pub fn process_add_item(req : AddItemReq) -> AddItemRes {
  let name = req.item_name
  let qty = req.quantity
  let msg = "MoonBitが処理しました！追加完了: \{name} (数量: \{qty})"
  let time = "2026-08-26 21:00:00"

  { success: true, message: msg, server_time: time }
}