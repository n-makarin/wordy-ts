<template>
  <div class="profile">
    <h1>Profile</h1>
    <preview
      v-if="viewType === viewTypeList.preview"
      :user="user"
    />
    <edit
      v-else
      :user="user"
      @change="setEditData"
    />
    <button @click="toggleViewType">
      {{ buttonText }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Preview from '~/components/pages/profile/preview.vue'
import Edit from '~/components/pages/profile/edit.vue'
import validate from '~/utils/form/validate.ts'

import * as FieldTypes from '~/types/utils/form/field.ts'
import * as ValidateTypes from '~/types/utils/form/validate.ts'

export default Vue.extend({
  components: {
    Preview,
    Edit
  },
  data () {
    const editData: FieldTypes.List = {}
    return {
      viewTypeList: {
        preview: 'preview',
        edit: 'edit'
      },
      viewType: 'preview',
      editData
    }
  },
  computed: {
    user (): any {
      return this.$store.getters['auth/user']
    },
    buttonText (): string {
      if (this.viewType === this.viewTypeList.preview) {
        return 'Edit'
      } else {
        return 'Save'
      }
    }
  },
  methods: {
    async toggleViewType (): Promise<void> {
      if (this.viewType === this.viewTypeList.preview) {
        this.viewType = this.viewTypeList.edit
      } else {
        const success: boolean = await this.save()
        if (!success) { return }
        this.viewType = this.viewTypeList.preview
      }
    },
    setEditData (fieldList: FieldTypes.List): void {
      this.editData = fieldList
    },
    async save (): Promise<boolean> {
      // @ts-ignore
      const validateResult: ValidateTypes.Result = await validate.finalCheck(
        this.editData,
        { compare: { email: true, login: true } },
        { login: this.editData.login.value, email: this.editData.email.value }
      )
      if (!validateResult.valid) {
        this.editData = validateResult.dataWithErrors
        return false
      }
      const payload: any = {
        id: this.user.id,
        native_lang: this.user.native_lang,
        date_of_reg: this.user.date_of_reg,
        password: this.editData.password.value,
        login: this.editData.login.value,
        email: this.editData.email.value,
        current_target_lang: this.editData.current_target_lang.value,
        name: this.editData.name.value,
        surname: this.editData.surname.value,
        date_of_birth: this.editData.date_of_birth.value
      }

      const isSuccess: boolean = await this.$store.dispatch('user/edit', payload)
      return isSuccess
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
