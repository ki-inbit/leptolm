pub fn process_add_item(req : AddItemReq) -> AddItemRes {
  let name = req.item_name
  let qty = req.quantity
  let msg = "MoonBitが処理しました！追加完了: \{name} (数量: \{qty})"
  let time = "2026-08-26 21:00:00"

  { success: true, message: msg, server_time: time }
}

pub fn get_items() -> GetItemsRes {
  // 1. DB接続を開く
  let conn = match @types.Connection::open("d1") {
    Ok(c) => c
    Err(_) => return { items: [] }
  }

  // 2. クエリを準備
  let stmt = match @types.Statement::prepare("SELECT id, item_name, quantity FROM items", []) {
    Ok(s) => s
    Err(_) => return { items: [] }
  }

  // 3. クエリ実行（🚀 ここでRustドライバに飛び、JS側でサスペンドループが発動します！）
  let rows = match @readwrite.query(conn, stmt) {
    Ok(r) => r
    Err(_) => return { items: [] }
  }

  // 4. フラットな配列(キーバリュー)を3カラムごとに Item レコードとして組み立てる
  let items : Array[Item] = []
  let mut current_id = ""
  let mut current_name = ""
  let mut current_qty = 0U
  let mut field_count = 0

  rows.each(fn (row) {
    match row.field_name {
      "id" => {
        match row.value {
          @types.DataType::Str(s) => current_id = s
          _ => ()
        }
        field_count = field_count + 1
      }
      "item_name" => {
        match row.value {
          @types.DataType::Str(s) => current_name = s
          _ => ()
        }
        field_count = field_count + 1
      }
      "quantity" => {
        match row.value {
          // JSONパース時にNumberはDoubleとして解釈されています
          @types.DataType::Double(n) => {
            current_qty = n.to_int().to_uint()
          }
          _ => ()
        }
        field_count = field_count + 1
      }
      _ => ()
    }

    // 3カラム揃ったら1行として配列に追加
    if field_count == 3 {
      items.push({ id: current_id, item_name: current_name, quantity: current_qty })
      field_count = 0
      // 変数リセット
      current_id = ""
      current_name = ""
      current_qty = 0U
    }
  })

  { items }
}