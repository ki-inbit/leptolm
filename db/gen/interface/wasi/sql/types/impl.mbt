pub struct StatementData {
  query : String
  params : Array[String] // 👑 DataType から String に修正
}

pub let statement_store : Array[StatementData] = []

pub fn Connection::open(_name : String) -> Result[Connection, Error_] {
  Ok(Connection::Connection(1))
}

// 👑 _params のアンダースコアを取り、受け取った params をそのまま保存する
pub fn Statement::prepare(query : String, params : Array[String]) -> Result[Statement, Error_] {
  let id = statement_store.length()
  statement_store.push({ query: query, params: params })
  Ok(Statement::Statement(id))
}

// ==========================================
// 👑 以下、WITが要求するリソース破棄(dtor)等のダミー実装を追加
// ==========================================

pub fn Statement::dtor(_self : Statement) -> Unit {
  // 破棄時の処理（今回は何もしない）
}

pub fn Error_::dtor(_self : Error_) -> Unit {
  // 破棄時の処理（今回は何もしない）
}

pub fn Connection::dtor(_self : Connection) -> Unit {
  // 破棄時の処理（今回は何もしない）
}

pub fn Error_::trace(_self : Error_) -> String {
  "Database Error"
}