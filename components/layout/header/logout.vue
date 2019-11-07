<template>
  <div class="logout">
    <button v-if="authorized" @click="logout">
      {{ logOutText }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      logOutText: 'Sign out'
    }
  },
  computed: {
    authorized () {
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    logout (): void {
      this.$store.dispatch('auth/logout')
      if (!this.authorized) {
        this.$router.push('/login')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
