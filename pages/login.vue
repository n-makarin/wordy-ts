<template>
  <div class="login">
    <h1>Sign in</h1>
    <form class="login-form" @submit.prevent="signIn">
      <label for="login">{{ login.label }}</label>
      <input id="login" v-model="login.data" type="text" required>

      <label for="password">{{ password.label }}</label>
      <input id="password" v-model="password.data" type="password" required>

      <button>Sign in</button>
      <div>
        <span>Don't have an account?</span>
        <join />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Join from '~/components/layout/join.vue'

export default Vue.extend({
  components: {
    Join
  },
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
