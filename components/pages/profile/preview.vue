<template>
  <div class="preview">
    <div class="user-info">
      <div class="user-info__login">
        {{ user.login }}
      </div>
      <div class="user-info__name">
        {{ user.name }}
      </div>
      <div class="user-info__surname">
        {{ user.surname }}
      </div>
      <div class="user-info__email">
        {{ user.email }}
      </div>
      <div class="user-info__date-of-birth">
        {{ user.date_of_birth }}
      </div>
      <div class="user-info__date-of-reg">
        {{ user.date_of_reg }}
      </div>
      <div class="user-info__current-target-lang">
        {{ user.current_target_lang }}
      </div>
      <div v-if="user.admin" class="user-info__is-admin">
        {{ user.admin }}
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
