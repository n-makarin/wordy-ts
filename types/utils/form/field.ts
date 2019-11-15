export interface Field {
  value: string;
  required: boolean;
  error: Error;
  label?: string;
  tooltip?: string;
  range?: Range;
}
export interface List {
  [key: string]: Field;
}
export interface Error {
  visible: boolean;
  message: string;
}
export interface Range {
  min: number;
  max: number;
}