<template>
  <div class="join">
    <h1>Create your account</h1>
    <form class="join-form" @submit.prevent="createAccount">
      <div
        v-for="(item, key) in fieldList"
        :key="key"
        class="join-form__item join-form-item"
      >
        <label
          :class="['join-form__label', item.required ? 'join-form__label_required' : '']"
          :for="key"
        >
          {{ item.label }}
        </label>
        <input
          :id="key"
          v-model="item.value"
          :type="key === 'password' ? 'password' : 'text'"
          :min="item.range ? item.range.min : false"
          :max="item.range ? item.range.max : false"
          @keydown="input($event, key)"
        >
        <div v-if="item.error.visible" class="join-form-item__error">
          {{ item.error.message }}
        </div>
        <!-- :required="item.required" -->
      </div>
      <button>Create</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/types/index.ts'
import validate from '~/utils/form/validate.ts'
import * as FieldTypes from '~/types/utils/form/field.ts'
import * as ValidateTypes from '~/types/utils/form/validate.ts'

export default Vue.extend({
  data () {
    const fieldList: FieldTypes.List = {
      login: {
        value: '',
        label: 'Login',
        tooltip: '',
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
        label: 'Email adress',
        tooltip: '',
        required: true,
        range: {
          min: 4,
          max: 20
        },
        error: {
          visible: false,
          message: ''
        }
      },
      password: {
        value: '',
        label: 'Password',
        tooltip: '',
        required: true,
        range: {
          min: 6,
          max: 20
        },
        error: {
          visible: false,
          message: ''
        }
      },
      nativeLang: {
        value: '',
        label: 'Native language',
        tooltip: 'You can change this at any time',
        required: true,
        error: {
          visible: false,
          message: ''
        }
      },
      targetLang: {
        value: '',
        label: 'Target language',
        tooltip: 'You can change this at any time',
        required: true,
        error: {
          visible: false,
          message: ''
        }
      },
      name: {
        value: '',
        label: 'Name',
        tooltip: '',
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
        label: 'Surname',
        tooltip: '',
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
      dateOfBirth: {
        value: '',
        label: 'Date of birth',
        tooltip: '',
        required: false,
        error: {
          visible: false,
          message: ''
        }
      }
    }
    return {
      fieldList
    }
  },
  computed: {
    authorized () {
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    async createAccount (): Promise<void> {
      // @ts-ignore
      const validateResult: ValidateTypes.Result = await validate.finalCheck(this.fieldList, FieldTypes)
      if (!validateResult.valid) {
        this.fieldList = validateResult.dataWithErrors
        return
      }
      const payload: User = {
        login: '',
        email: '',
        native_lang: '',
        current_target_lang: '',
        password: '',
        name: '',
        surname: '',
        date_of_birth: null,
        date_of_reg: Date.now()
      }
      for (const key in this.fieldList) {
        if (this.fieldList.hasOwnProperty(key)) {
          // @ts-ignore
          payload[key] = this.fieldList[key].value
        }
      }
      await this.$store.dispatch('user/create', payload)
      if (!this.authorized) { return }
      this.$router.push('/')
    },
    input (event: any, fieldId: string): void {
      const validateResult: ValidateTypes.InputFuncResult = validate.onInput(this.fieldList[fieldId], event)
      if (!validateResult.needToUpdate) { return }
      this.fieldList[fieldId] = validateResult.field
    }
  }
})
</script>

<style lang="scss" scoped>
.join {
  &-form {
    &__label {
      font-size: 14px;
      &_required {
        &::after {
          content: '*';
          color: rgb(163, 1, 1);
        }
      }
    }
  }
}
</style>
