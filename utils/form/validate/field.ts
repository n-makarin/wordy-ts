import * as ValidateTypes from '~/types/utils/form/validate.ts'
import * as FieldTypes from '~/types/utils/form/field.ts'
import { email } from '~/utils/regexp.ts'
import { emptyField } from '~/utils/form/validate/constants.ts'

export class Field implements ValidateTypes.Field {
  field = emptyField
  minRange = {
    declared: false,
    value: 0
  }
  maxRange = {
    declared: false,
    value: 0
  }
  constructor (field: FieldTypes.Field) {
    this.field = field
  }
  removeErrorMessage (): void {
    this.field.error = {
      visible: false,
      message: ''
    }
  }
  isEmail (value: string): boolean {
    return email.test(value)
  }
  setRangeRestriction (field: FieldTypes.Field, range: string): void {
    if (range === 'min') {
      this.minRange = {
        declared: Boolean(field.range),
        value: field.range ? field.range.min : 0
      }
    } else if (range === 'max') {
      this.maxRange = {
        declared: Boolean(field.range),
        value: field.range ? field.range.max : 0
      }
    }
  }
  inRange (range: string, onInput = false): boolean {
    let fieldVelueLength: number = this.field.value.length
    // increase field length, when char wasn't inserted
    // to input field on input event
    if (onInput) {
      fieldVelueLength++
    }
    if (range === 'min') {
      if (this.minRange.value > fieldVelueLength) { return false }
    } else if (range === 'max') {
      if (this.maxRange.value < fieldVelueLength) { return false }
    }
    return true
  }
}