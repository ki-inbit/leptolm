pub fn process_add_item(req : AddItemReq) -> AddItemRes {
  // 1. DB接続を開く
  let conn = match @types.Connection::open("d1") {
    Ok(c) => c
    Err(_) => return { success: false, message: "DB接続エラー", server_time: "" }
  }

  // 2. INSERTクエリを準備
  // id は SQLite の機能 (hex(randomblob(8))) を使ってランダムな16文字の文字列を自動生成させます
  let query = "INSERT INTO items (id, item_name, quantity) VALUES (hex(randomblob(8)), ?, ?)"
  
  // パラメータは配列として渡す (数値の quantity は to_string() で文字列化)
  let params = [req.item_name, req.quantity.to_string()]
  
  let stmt = match @types.Statement::prepare(query, params) {
    Ok(s) => s
    Err(_) => return { success: false, message: "クエリ準備エラー", server_time: "" }
  }

  // 3. クエリ実行（🚀 ここでRustの exec ドライバへ飛び、サスペンドループが発動）
  match @readwrite.exec(conn, stmt) {
    Ok(affected_rows) => {
      let msg = "追加成功！(影響行数: \{affected_rows}) - \{req.item_name} (数量: \{req.quantity})"
      { success: true, message: msg, server_time: "2026-10-08" }
    }
    Err(_) => {
      { success: false, message: "アイテムの追加に失敗しました", server_time: "" }
    }
  }
}

pub fn get_items() -> GetItemsRes {
  // 1. DB接続を開く
  let conn = match @types.Connection::open("d1") {
    Ok(c) => c
    Err(_) => return { items: [] }
  }

  // 👑 --- 複数クエリ対応テスト用のダミークエリ ---
  let dummy_stmt = match @types.Statement::prepare("SELECT 'dummy_ok' as status", []) {
    Ok(s) => s
    Err(_) => return { items: [] }
  }
  
  // 実行（1回目のサスペンドが発動し、JS側でキャッシュ配列の0番目に結果が入る）
  let _ = match @readwrite.query(conn, dummy_stmt) {
    Ok(r) => r
    Err(_) => return { items: [] }
  }
  // ------------------------------------------------

  // 2. 本番クエリを準備
  let stmt = match @types.Statement::prepare("SELECT id, item_name, quantity FROM items", []) {
    Ok(s) => s
    Err(_) => return { items: [] }
  }

  // 3. クエリ実行（2回目のサスペンドが発動し、JS側でキャッシュ配列の1番目に結果が入る）
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
            current_qty = n.to_int().reinterpret_as_uint()
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

pub fn process_delete_item(req : DeleteItemReq) -> DeleteItemRes {
  // 1. DB接続を開く
  let conn = match @types.Connection::open("d1") {
    Ok(c) => c
    Err(_) => return { success: false, message: "DB接続エラー" }
  }

  // 2. DELETEクエリを準備
  let query = "DELETE FROM items WHERE id = ?"
  let params = [req.id]
  
  let stmt = match @types.Statement::prepare(query, params) {
    Ok(s) => s
    Err(_) => return { success: false, message: "クエリ準備エラー" }
  }

  // 3. クエリ実行（🚀 サスペンド・リプレイループ発動！）
  match @readwrite.exec(conn, stmt) {
    Ok(affected_rows) => {
      // D1(SQLite)は、該当するIDが無かった場合エラーにはならず「影響行数0」を返します
      if affected_rows > 0 {
        let msg = "アイテムを削除しました (対象ID: \{req.id})"
        { success: true, message: msg }
      } else {
        { success: false, message: "指定されたアイテムが見つかりませんでした" }
      }
    }
    Err(_) => {
      { success: false, message: "アイテムの削除に失敗しました" }
    }
  }
}