
pub fn query(conn : @types.Connection, stmt : @types.Statement) -> Result[Array[@types.Row], @types.Error_] {
  ignore(conn)
  ignore(stmt)
  let sql = @types.get_last_sql()
  let params = @types.get_last_params()
  match @db_spi.query(sql, params) {
    Ok(rows) => {
      let res : Array[@types.Row] = []
      rows.each(fn (r) {
        let val = match r.value {
          @spi_types.DataType::Str(s) => @types.DataType::Str(s)
          // 👑 SQLite の Int64 を D1 仕様の Double へファサード側で自動正規化
          @spi_types.DataType::Int64(n) => @types.DataType::Double(n.to_double())
          @spi_types.DataType::Double(f) => @types.DataType::Double(f)
          @spi_types.DataType::Boolean(b) => @types.DataType::Boolean(b)
          _ => @types.DataType::Str("")
        }
        res.push({ field_name: r.field_name, value: val })
      })
      Ok(res)
    }
    Err(_) => Err(@types.Error_::new(1))
  }
}

pub fn exec(conn : @types.Connection, stmt : @types.Statement) -> Result[UInt, @types.Error_] {
  ignore(conn)
  ignore(stmt)
  let sql = @types.get_last_sql()
  let params = @types.get_last_params()
  match @db_spi.exec(sql, params) {
    Ok(n) => Ok(n)
    Err(_) => Err(@types.Error_::new(1))
  }
}
