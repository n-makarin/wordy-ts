import * as FieldTypes from '~/types/utils/form/field.ts'

export interface InputFunc {
  (event: any, field: any): InputFuncResult;
}

export interface InputFuncResult {
  needToUpdate: boolean;
  field: any
}

export interface FinalCheckResult {
  valid: boolean;
  dataWithErrors: {
    [key: string]: FieldTypes.Field
  };
}

export interface FieldRange {
  declared: boolean;
  value: number | undefined;
}

export interface Field {
  field: FieldTypes.Field;
  minRange: FieldRange;
  maxRange: FieldRange;
  removeErrorMessage(): void;
  isEmail(value: string): boolean;
  setRangeRestriction(field: FieldTypes.Field, range: string): void;
  inRange(range: string): boolean;
}

export interface FieldOnInput extends Field {
  keyCode: string;
  isLetterOrNumberKeyCode: boolean;
  needToUpdate: boolean;
  input(event: any): InputFuncResult;
  makeValidation(event: any): void;
  setKeyCodeType(event: any): void;
  limitMaxRange(event: any): void;
  hideError(): void;
}

export interface FinalCheck extends Field {
  valid: boolean;
  validate(fieldList: FieldTypes.List): FinalCheckResult
  required(): void
  email(key: string): void
  minLength(): void
  maxLength(): void
  needToValidate(): boolean
}