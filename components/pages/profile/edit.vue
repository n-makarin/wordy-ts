<template>
  <div class="edit">
    <div class="user-info">
      <div
        v-for="(item, key) in user"
        :key="key"
        class="user-info__item"
      >
        <input
          v-model="item.value"
          :class="`user-info__${key}`"
          :type="key === 'password' ? 'password' : 'text'"
          :min="item.range ? item.range.min : false"
          :max="item.range ? item.range.max : false"
          @keydown="input(key, $event)"
          @change="$emit('change', user)"
        >
        <div v-if="item.error.visible" class="juser-info-item__error">
          {{ item.error.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import validate from '~/utils/form/validate.ts'

import * as ValidateTypes from '~/types/utils/form/validate.ts'

export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
  },
  methods: {
    input (fieldId: string, event: any): void {
      const validateResult: ValidateTypes.InputFuncResult = validate.onInput(this.user[fieldId], event)
      if (validateResult.needToUpdate) {
        this.user[fieldId] = validateResult.field
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'common'

</style>
