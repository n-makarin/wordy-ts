<template>
  <div class="login">
    <h1>Sign in</h1>
    <form class="login-form" @submit.prevent="signIn">
      <label for="login">{{ login.label }}</label>
      <input id="login" v-model="login.data" type="text" required>

      <label for="password">{{ password.label }}</label>
      <input id="password" v-model="password.data" type="password" required>

      <button>Sign in</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      login: {
        data: '',
        label: 'Login or email address'
      },
      password: {
        data: '',
        label: 'Password'
      }
    }
  },
  computed: {
    authorized () {
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    async signIn (): Promise<void> {
      await this.$store.dispatch('auth/login', {
        login: this.login.data, password: this.password.data
      })
      if (this.authorized) {
        this.$router.push('/')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
