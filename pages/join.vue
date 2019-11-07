<template>
  <div class="join">
    <h1>Create your account</h1>
    <form class="join-form" @submit.prevent="createAccount">
      <div
        v-for="(item, key) in fieldList"
        :key="key"
      >
        <label :for="key">{{ item.label }}</label>
        <input
          :id="key"
          v-model="item.value"
          :type="key === 'password' ? 'password' : 'text'"
          :required="item.required"
        >
      </div>
      <button>Create</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/types/index.ts'

export default Vue.extend({
  data () {
    return {
      fieldList: {
        login: {
          value: '',
          label: 'Login',
          tooltip: '',
          required: true
        },
        email: {
          value: '',
          label: 'Email adress',
          tooltip: '',
          required: true
        },
        password: {
          value: '',
          label: 'Password',
          tooltip: '',
          required: true
        },
        nativeLang: {
          value: '',
          label: 'Native language',
          tooltip: 'You can change this at any time',
          required: true
        },
        targetLang: {
          value: '',
          label: 'Target language',
          tooltip: 'You can change this at any time',
          required: true
        },
        name: {
          value: '',
          label: 'Name',
          tooltip: '',
          required: false
        },
        surname: {
          value: '',
          label: 'Surname',
          tooltip: '',
          required: false
        },
        dateOfBirth: {
          value: '',
          label: 'Date of birth',
          tooltip: '',
          required: false
        }
      }
    }
  },
  computed: {
    authorized () {
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    async createAccount (): Promise<void> {
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
          payload[key] = this.fieldList[key].value || 'something else'
        }
      }
      await this.$store.dispatch('user/create', payload)
      if (!this.authorized) { return }
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
