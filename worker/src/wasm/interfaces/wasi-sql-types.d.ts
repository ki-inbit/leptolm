/** @module Interface wasi:sql/types **/
export type DataType = DataTypeInt32 | DataTypeInt64 | DataTypeUint32 | DataTypeUint64 | DataTypeFloat | DataTypeDouble | DataTypeStr | DataTypeBoolean | DataTypeDate | DataTypeTime | DataTypeTimestamp | DataTypeBinary | DataTypeNull;
export interface DataTypeInt32 {
  tag: 'int32',
  val: number,
}
export interface DataTypeInt64 {
  tag: 'int64',
  val: bigint,
}
export interface DataTypeUint32 {
  tag: 'uint32',
  val: number,
}
export interface DataTypeUint64 {
  tag: 'uint64',
  val: bigint,
}
export interface DataTypeFloat {
  tag: 'float',
  val: number,
}
export interface DataTypeDouble {
  tag: 'double',
  val: number,
}
export interface DataTypeStr {
  tag: 'str',
  val: string,
}
export interface DataTypeBoolean {
  tag: 'boolean',
  val: boolean,
}
export interface DataTypeDate {
  tag: 'date',
  val: string,
}
export interface DataTypeTime {
  tag: 'time',
  val: string,
}
export interface DataTypeTimestamp {
  tag: 'timestamp',
  val: string,
}
export interface DataTypeBinary {
  tag: 'binary',
  val: Uint8Array,
}
export interface DataTypeNull {
  tag: 'null',
}
export interface Row {
  fieldName: string,
  value: DataType,
}
