<template>
  <div class="login">
    <h1>Sign in</h1>
    <form class="login-form" @submit.prevent="signIn">
      <label for="identifier">{{ identifier.label }}</label>
      <input id="identifier" v-model="identifier.value" type="text" required>

      <label for="password">{{ password.label }}</label>
      <input id="password" v-model="password.value" type="password" required>

      <button>Sign in</button>
    </form>
    <div v-if="error.visible" class="login__error">
      {{ error.text }}
    </div>
    <div>
      <span>Don't have an account?</span>
      <join />
    </div>
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
      identifier: {
        value: '',
        label: 'Login or email address'
      },
      password: {
        value: '',
        label: 'Password'
      },
      error: {
        visible: false,
        text: 'Invalid data (login, email or password)'
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
        identifier: this.identifier.value, password: this.password.value
      })
      if (!this.authorized) {
        this.error.visible = true
        return
      }
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
