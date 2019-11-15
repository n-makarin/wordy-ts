<template>
  <div class="preview">
    <div class="user-info">
      <div
        v-for="(item, key) in user"
        :key="key"
        class="user-info__item"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
@import 'common'

</style>
