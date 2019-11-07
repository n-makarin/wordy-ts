<template>
  <div class="def">
    <Header />
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '~/components/layout/header.vue'

export default Vue.extend({
  middleware: 'auth',
  components: {
    Header
  }
})
</script>

<style>
</style>
