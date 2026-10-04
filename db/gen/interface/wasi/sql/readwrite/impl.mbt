pub fn query(_c : @types.Connection, q : @types.Statement) -> Result[Array[@types.Row], @types.Error_] {
  match q {
    @types.Statement::Statement(id) => {
      let data = @types.statement_store[id]
      
      match @db_spi.query(data.query, data.params) {
        Ok(rows) => {
          let converted_rows = rows.map(fn(r) {
            let dt = match r.value {
              Str(s) => @types.DataType::Str(s)
              Double(d) => @types.DataType::Double(d)
              Boolean(b) => @types.DataType::Boolean(b)
              Null => @types.DataType::Null
              _ => @types.DataType::Null // 👑 追加: 未処理のバリアントをすべて補足
            }
            @types.Row::{ field_name: r.field_name, value: dt }
          })
          Ok(converted_rows)
        }
        Err(_) => Err(@types.Error_::Error_(0))
      }
    }
  }
}

pub fn exec(_c : @types.Connection, q : @types.Statement) -> Result[UInt, @types.Error_] {
  match q {
    @types.Statement::Statement(id) => {
      let data = @types.statement_store[id]
      
      match @db_spi.exec(data.query, data.params) {
        Ok(rows) => Ok(rows)
        Err(_) => Err(@types.Error_::Error_(0))
      }
    }
  }
}