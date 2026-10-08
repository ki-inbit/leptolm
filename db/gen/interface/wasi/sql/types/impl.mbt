
let last_sql : Array[String] = [""]
let last_params : Array[Array[String]] = [[]]

pub fn get_last_sql() -> String {
  last_sql[0]
}

pub fn get_last_params() -> Array[String] {
  last_params[0]
}

pub fn Connection::open(name : String) -> Result[Connection, Error_] {
  ignore(name)
  Ok(Connection::new(1))
}

pub fn Statement::prepare(query : String, params : Array[String]) -> Result[Statement, Error_] {
  last_sql[0] = query
  last_params[0] = params
  Ok(Statement::new(1))
}

pub fn Statement::dtor(_self : Statement) -> Unit {}
pub fn Connection::dtor(_self : Connection) -> Unit {}
pub fn Error_::dtor(_self : Error_) -> Unit {}
pub fn Error_::trace(_self : Error_) -> String { "" }
