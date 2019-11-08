export interface Error {
  visible: boolean;
  message: string;
}
export interface FieldLength {
  min: number;
  max: number;
}
export interface Field {
  value: string;
  label: string;
  tooltip: string;
  required: boolean;
  length?: FieldLength;
  error: Error;
}
export interface FieldList {
  [key: string]: Field;
}
export interface ValidateResult {
  valid: boolean;
  errorsComplemented: {
    [key: string]: Field
  };
}