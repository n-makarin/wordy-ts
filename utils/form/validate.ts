import * as ValidateTypes from '~/types/utils/form/validate.ts'
import * as FieldTypes from '~/types/utils/form/field.ts'
import { lettersAndNumbers, email } from '~/utils/regexp.ts'


const emptyField: FieldTypes.Field = {
  value: '',
  label: '',
  required: false,
  error: {
    visible: false,
    message: ''
  }
}

class Field implements ValidateTypes.Field {
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

class FieldOnInput extends Field implements ValidateTypes.FieldOnInput {
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

class FinalCheck extends Field implements ValidateTypes.FinalCheck {
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

export default {
  onInput(field: FieldTypes.Field, event: any): ValidateTypes.InputFuncResult {
    const init = new FieldOnInput(field)
    return init.input(event)
  },
  finalCheck(fieldList: FieldTypes.List): ValidateTypes.FinalCheckResult {
    const init = new FinalCheck()
    return init.validate(fieldList)
  }
}