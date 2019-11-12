import * as ValidateTypes from '~/types/utils/form/validate.ts'
import * as FieldTypes from '~/types/utils/form/field.ts'
import { Field } from '~/utils/form/validate/field.ts'
import { emptyField } from '~/utils/form/validate/constants.ts'

export class FinalCheck extends Field implements ValidateTypes.FinalCheck {
  valid = true
  constructor() {
    super(emptyField);
  }
  validate (fieldList: FieldTypes.List): ValidateTypes.FinalCheckResult {
    for (const key in fieldList) {
      if (fieldList.hasOwnProperty(key)) {
        this.field = fieldList[key]
        this.setRangeRestriction(this.field, 'min')
        this.setRangeRestriction(this.field, 'max')

        this.required()
        if (this.needToValidate()) {
          this.email(key)
          this.minLength()
          this.maxLength()
        }

        fieldList[key] = this.field
      }
    }
    return {
      valid: this.valid,
      dataWithErrors: fieldList
    }
  }
  required (): void {
    if (!this.field.required) { return }
    if (this.field.value) { return }
    this.valid = false
    this.field.error = {
      visible: true,
      message: 'Field is required'
    }
  }
  email (key: string): void {
    if (key === 'email' && !this.isEmail(this.field.value)) {
      this.valid = false
      this.field.error = {
        visible: true,
        message: 'Invalid email'
      }
    }
  }
  minLength (): void {
    if (!this.minRange.declared) { return }
    // if (this.field.required && !this.field.value.length) { return }
    if (this.inRange('min')) { return }
    this.valid = false
    this.field.error = {
      visible: true,
      message: `Minimum field length is ${this.minRange.value} characters`
    }
  }
  maxLength (): void {
    if (!this.maxRange.declared) { return }
    if (this.inRange('max')) { return }
    
    this.valid = false
    this.field.error = {
      visible: true,
      message: `Maximum field length is ${this.maxRange.value} characters`
    }
  }
  needToValidate (): boolean {
    if (!this.field.value) { return false }
    if (!this.field.required && this.field.value) { return true }
    return true
  }
}