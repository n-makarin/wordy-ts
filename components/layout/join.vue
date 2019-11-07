<template>
  <div class="join">
    <nuxt-link v-if="!authorized" to="/join">
      {{ joinText }}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      joinText: 'Sign up'
    }
  },
  computed: {
    authorized () {
      return this.$store.getters['auth/user']
    }
  }
})
</script>

<style lang="scss" scoped>
.join {
  display: inline-block;
}
</style>
