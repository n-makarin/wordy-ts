<template>
  <div class="admin">
    <nuxt-child />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'empty',
  data () {
    return {
      auth: null
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
