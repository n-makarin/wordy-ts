import * as Types from '~/types/utils/validate.ts'
import { lettersAndNumbers } from '~/utils/regexp.ts'

export default {
  input(event: any, field: any): Types.Input {
    const fieldLengthMax: number|null = field.length ? field.length.max : null
    const inp: string = String.fromCharCode(event.keyCode);

    if (lettersAndNumbers.test(inp)) {
      if (fieldLengthMax && field.value.length >= fieldLengthMax) {
        event.preventDefault()
        return {
          needToUpdate: false,
          field: null
        }
      }
    }
    if (field.error.visible) {
      this.removeErrorMessage(field)
    }
    return {
      needToUpdate: false,
      field
    }
  },
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
  } 
}