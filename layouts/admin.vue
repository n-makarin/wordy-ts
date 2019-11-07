<template>
  <div>
    <nuxt />
  </div>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  middleware: 'auth-admin'
})
</script>

<style>
</style>
