import * as ValidateTypes from '~/types/utils/form/validate.ts'
import * as FieldTypes from '~/types/utils/form/field.ts'
import { FieldOnInput } from '~/utils/form/validate/field-on-input.ts'
import { FinalCheck } from '~/utils/form/validate/final-check.ts'

export default {
  onInput(field: FieldTypes.Field, event: any): ValidateTypes.InputFuncResult {
    const init = new FieldOnInput(field)
    return init.input(event)
  },
  async finalCheck(
      fieldList: FieldTypes.List, 
      config: ValidateTypes.Config,
      prevData: ValidateTypes.PrevData
    ): Promise<ValidateTypes.FinalCheckResult> {
    const init = new FinalCheck()
    return await init.validate(fieldList, config, prevData)
  }
}