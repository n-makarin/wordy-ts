import * as ValidateTypes from '~/types/utils/form/validate.ts'
import * as FieldTypes from '~/types/utils/form/field.ts'
import { Field } from '~/utils/form/validate/field.ts'
import { emptyField } from '~/utils/form/validate/constants.ts'
import axios from 'axios'
import { endpoint } from '~/app-config.ts'

export class FinalCheck extends Field implements ValidateTypes.FinalCheck {
  valid = true
  constructor() {
    super(emptyField);
  }
  async validate (fieldList: FieldTypes.List): Promise<ValidateTypes.FinalCheckResult> {
    for (const key in fieldList) {
      if (fieldList.hasOwnProperty(key)) {
        this.field = fieldList[key]
        this.setRangeRestriction(this.field, 'min')
        this.setRangeRestriction(this.field, 'max')

        this.required()
        if (this.needToValidate()) {
          this.minLength()
          this.maxLength()
          await this.login(key)
          await this.email(key)
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
  async email (key: string): Promise<void> {
    if (key !== 'email') { return }
    if (this.hasError()) { return }
    if (!this.isEmail(this.field.value)) {
      this.valid = false
      this.field.error = {
        visible: true,
        message: 'Invalid email'
      }
      return
    }
    const isUnique: boolean = await this.isUniqueField(key, this.field.value)
    if (!isUnique) {
      this.valid = false
      this.field.error = {
        visible: true,
        message: `Email ${this.field.value} is already exist`
      }
    }
  }
  async login (key: string): Promise<void> {
    if (key !== 'login') { return }
    if (this.hasError()) { return }
    const isUnique: boolean = await this.isUniqueField(key, this.field.value)
    if (!isUnique) {
      this.valid = false
      this.field.error = {
        visible: true,
        message: `Login ${this.field.value} is already exist`
      }
    }
  }
  minLength (): void {
    if (!this.minRange.declared) { return }
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
  hasError (): boolean {
    if (this.field.error.visible) { return true }
    return false
  }
  needToValidate (): boolean {
    if (!this.field.value) { return false }
    if (!this.field.required && this.field.value) { return true }
    return true
  }
  async isUniqueField (field: string, value: string): Promise<boolean> {
    const response: boolean = await axios({
      method: 'GET',
      url: `${endpoint}/user/detail/?${field}=${value}`
    })
      .catch((err: any) => {
        console.log(err)
        return false
      })
      .then((response: any) => {
        return !response || !response.data || response.data.length === 0
      })
    return response
  }
}