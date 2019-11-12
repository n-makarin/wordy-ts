import * as ValidateTypes from '~/types/utils/form/validate.ts'
import * as FieldTypes from '~/types/utils/form/field.ts'
import { Field } from '~/utils/form/validate/field.ts'
import { lettersAndNumbers } from '~/utils/regexp.ts'


export class FieldOnInput extends Field implements ValidateTypes.FieldOnInput {
  keyCode = ''
  isLetterOrNumberKeyCode = false
  needToUpdate = false

  super (field: FieldTypes.Field) {
    this.setRangeRestriction(field, 'max')
  }
  input (event: any): ValidateTypes.InputFuncResult {
    this.setKeyCodeType(event)
    if (this.isLetterOrNumberKeyCode) {
      this.makeValidation(event)
    }
    return {
      needToUpdate: this.needToUpdate,
      field: this.field
    }
  }
  makeValidation (event: any): void {
    this.hideError()
    this.setRangeRestriction(this.field, 'max')
    this.limitMaxRange(event)
  }
  setKeyCodeType (event: any): void {
    this.keyCode = String.fromCharCode(event.keyCode)
    this.isLetterOrNumberKeyCode = lettersAndNumbers.test(this.keyCode)
  }
  limitMaxRange (event: any): void {
    if (!this.maxRange.declared) { return }
    if (this.inRange('max', true)) { return }
    event.preventDefault()
    this.needToUpdate = false
  }
  hideError(): void {
    if (this.field.error.visible) {
      this.removeErrorMessage()
    }
  }
}