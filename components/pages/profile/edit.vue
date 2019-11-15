<template>
  <div class="edit">
    <div class="user-info">
      <div
        v-for="(item, key) in fieldList"
        :key="key"
        class="user-info__item"
      >
        <input
          v-model="item.value"
          :class="`user-info__${key}`"
          :type="key === 'password' ? 'password' : 'text'"
          :min="item.range ? item.range.min : false"
          :max="item.range ? item.range.max : false"
          @keydown="input(key, $event)"
          @change="$emit('change', fieldList)"
        >
        <div v-if="item.error.visible" class="juser-info-item__error">
          {{ item.error.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import validate from '~/utils/form/validate.ts'
import * as FieldTypes from '~/types/utils/form/field.ts'
import * as ValidateTypes from '~/types/utils/form/validate.ts'

export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    fieldList () {
      const fieldList: FieldTypes.List = {
        login: {
          value: '',
          required: true,
          range: {
            min: 4,
            max: 12
          },
          error: {
            visible: false,
            message: ''
          }
        },
        email: {
          value: '',
          required: true,
          range: {
            min: 4,
            max: 30
          },
          error: {
            visible: false,
            message: ''
          }
        },
        password: {
          value: '',
          required: true,
          range: {
            min: 6,
            max: 30
          },
          error: {
            visible: false,
            message: ''
          }
        },
        current_target_lang: {
          value: '',
          required: true,
          error: {
            visible: false,
            message: ''
          }
        },
        name: {
          value: '',
          required: false,
          range: {
            min: 2,
            max: 20
          },
          error: {
            visible: false,
            message: ''
          }
        },
        surname: {
          value: '',
          required: false,
          range: {
            min: 2,
            max: 20
          },
          error: {
            visible: false,
            message: ''
          }
        },
        date_of_birth: {
          value: '',
          required: false,
          error: {
            visible: false,
            message: ''
          }
        }
      }

      for (const key in fieldList) {
        if (fieldList.hasOwnProperty(key)) {
          fieldList[key].value = this.user[key]
        }
      }

      return fieldList
    }
  },
  methods: {
    input (fieldId: string, event: any): void {
      const validateResult: ValidateTypes.InputFuncResult = validate.onInput(this.fieldList[fieldId], event)
      if (validateResult.needToUpdate) {
        this.user[fieldId] = validateResult.field
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'common'

</style>
