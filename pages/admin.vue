<template>
  <div class="admin">
    <nuxt-child />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      auth: null
    }
  }
})
</script>

<style lang="scss">
</style>
