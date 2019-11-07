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
  layout: 'empty',
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
  methods: {
    signIn (): void {
      const authenticated: any = this.$store.dispatch('auth/login', {
        login: this.login.data, password: this.password.data
      })
      if (authenticated) {
        this.$router.push('/')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
