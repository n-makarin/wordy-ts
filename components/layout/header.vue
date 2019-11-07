<template>
  <div class="logout">
    <logout />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logout from '~/components/layout/header/logout.vue'

export default Vue.extend({
  components: {
    Logout
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
</style>
