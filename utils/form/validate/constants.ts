import * as FieldTypes from '~/types/utils/form/field.ts'

export const emptyField: FieldTypes.Field = {
  value: '',
  label: '',
  required: false,
  error: {
    visible: false,
    message: ''
  }
}