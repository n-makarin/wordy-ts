import * as Types from '~/types/utils/validate.ts'
import { lettersAndNumbers, email } from '~/utils/regexp.ts'

export default {
  /**
   * 
   */
  input(event: any, field: any): Types.Input {
    const fieldLengthMax: number|null = field.length ? field.length.max : null
    const keyCode: string = String.fromCharCode(event.keyCode);

    if (lettersAndNumbers.test(keyCode)) {
      // remove error message
      if (field.error.visible) {
        this.removeErrorMessage(field)
      }
      // max length limit
      if (fieldLengthMax && field.value.length >= fieldLengthMax) {
        event.preventDefault()
        return {
          needToUpdate: false,
          field: null
        }
      }
    }
    return {
      needToUpdate: false,
      field
    }
  },
  /**
   * 
   */
  removeErrorMessage (field: any): void {
    field.error = {
      visible: false,
      message: ''
    }
  },
  final(fieldList: object, Types: any) {
    let valid: boolean = true
    for (const key in fieldList) {
      if (fieldList.hasOwnProperty(key)) {
        // @ts-ignore
        const field: Types.Field = fieldList[key]
  
        // if required and empty
        if (field.required && !field.value) {
          field.error = {
            visible: true,
            message: 'Field is required'
          }
          valid = false
        } else if (key === 'email' && !this.email(field.value)) {
          field.error = {
            visible: true,
            message: 'Invalid email'
          }
        } else {
          field.error = {
            visible: false,
            message: ''
          }
        }
        
  
  
        // @ts-ignore
        fieldList[key] = field
      }
    }
    return {
      valid: valid,
      errorsComplemented: fieldList
    }
  },
  /**
   * 
   */
  email(value: string): boolean {
    return email.test(value)
  }
}
