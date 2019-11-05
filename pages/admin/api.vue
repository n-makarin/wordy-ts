<template>
  <div class="api">
    <h1>Api</h1>
    <section class="api-example-list">
      <div
        v-for="query in queryList"
        :key="query.id"
        class="api-example-list__item"
      >
        <div class="example-list-query">
          <div
            :ref="exampleQueryRefName + query.id"
            class="example-list-query__pattern"
            @click.prevent="copyToClipboard(query.id)"
          >
            {{ query.pattern }}
          </div>
          <div class="example-list-query__description">
            {{ query.description }}
          </div>
          <input v-model="query.input" type="text">
          <select
            :id="query.id"
            v-model="query.method"
            name="example-query"
          >
            <option
              v-for="(option, key) in methodList"
              :key="key"
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.text }}
            </option>
          </select>
          <button
            :disabled="query.method === 'undefined' || !query.input"
            @click="sendRequest(query.id, query.method, query.input)"
          >
            Send
          </button>
        </div>
        <div class="example-list-response">
          {{ query.response }}
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const routes: any = require('~/json-server/routes.json')

export default Vue.extend({
  data () {
    // START: queryList
    const queryList: any = []
    let queryCounter: number = 0
    const routeList: Object = routes.list
    const descriptionList: Array<String> = routes.list
    for (const key in routeList) {
      if (routeList.hasOwnProperty(key)) {
        queryList.push({
          id: queryCounter++,
          description: descriptionList[queryCounter],
          pattern: key,
          method: 'undefined',
          input: '',
          response: null
        })
      }
    }
    // END: queryList

    return {
      queryList,
      methodList: [
        { disabled: true, text: 'method', value: 'undefined' },
        { text: 'get', value: 'GET' },
        { text: 'post', value: 'POST' },
        { text: 'put', value: 'PUT' },
        { text: 'patch', value: 'PATCH' },
        { text: 'delete', value: 'DELETE' }
      ],
      exampleQueryRefName: 'example-query-'
    }
  },

  methods: {
    /**
     *  Send specified request, get and show response
     */
    sendRequest (queryId: number, method: string, query: string): void {
      console.log(queryId, method, query)
      this.queryList[queryId].response = 'some response'
    },
    /**
     * Copy query pattern to clipboard and show result of this operation
     */
    copyToClipboard (queryId: number): void {
      const self: any = this
      const element: any = this.$refs[this.exampleQueryRefName + queryId]
      const text:string = element[0].textContent
      if (!text) { return }
      // @ts-ignore
      this.$copyText(text.trim()).then(() => {
        self.addAndRemoveModifier({ element, modifier: 'copy-success' })
      }, () => {
        self.addAndRemoveModifier({ element, modifier: 'copy-error' })
      })
    },
    /**
     * Add class name to element and remove it on some delay
     */
    addAndRemoveModifier (
      { element = null, modifier = '', delay = 900 }:
      { element?: any; modifier?: string; delay?: number } = {}): void {
      element[0].classList.add(modifier)
      setTimeout(function () {
        element[0].classList.remove(modifier)
      }, delay)
    }
  }
})
</script>

<style lang="scss">
</style>
