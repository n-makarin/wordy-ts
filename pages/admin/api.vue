<template>
  <div class="api">
    <h1>Api</h1>
    <!-- TODO: add table of contents -->
    <section class="api-example-list">
      <!-- query list -->
      <div
        v-for="query in queryList"
        :key="query.id"
        class="api-example-list__item example-list-item"
      >
        <!-- pattern -->
        <div
          :ref="exampleQueryRefName + query.id"
          class="example-list-query__pattern"
          :title="exampleQueryTooltip"
          @click.prevent="copyToClipboard(query.id)"
        >
          {{ query.pattern }}
        </div>
        <div class="flex-wrapper">
          <!-- request -->
          <div class="example-list-item__query example-list-query">
            <div class="example-list-query__wrapper">
              <!-- method -->
              <select
                v-model="query.method"
                class="example-list-query__method"
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
              <!-- input -->
              <input
                v-model="query.input"
                class="example-list-query__input"
                type="text"
                :title="query.description"
              >
            </div>
            <!-- payload -->
            <textarea
              v-model="query.payload"
              class="example-list-query__payload"
            />
            <div>
              <!-- send button -->
              <button
                class="example-list-query__button example-list-query__button_send"
                :disabled="query.method === 'undefined' || !query.input"
                @click="sendRequest(query.id)"
              >
                Send
              </button>
              <!-- reset button -->
              <button
                class="example-list-query__button example-list-query__button_reset"
                :disabled="query.method === 'undefined' || !query.input"
                @click="resetQueryFields(query.id)"
              >
                Reset
              </button>
            </div>
          </div>
          <!-- response -->
          <div class="example-list-item__response">
            {{ query.response }}
          </div>
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
    const descriptionList: Array<String> = routes.description
    for (const key in routeList) {
      if (routeList.hasOwnProperty(key)) {
        queryList.push({
          id: queryCounter++,
          description: descriptionList[queryCounter - 1],
          pattern: key,
          method: 'undefined',
          input: key,
          payload: null,
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
      exampleQueryRefName: 'example-query-',
      exampleQueryTooltip: 'Copy to clipboard'
    }
  },

  methods: {
    /**
     *  Send specified request, get and show response
     */
    async sendRequest (queryId: number): Promise<any> {
      const queryItem = this.queryList[queryId]
      const method: string = queryItem.method
      const query: string = queryItem.input
      let payload: any = null
      try {
        payload = JSON.parse(queryItem.payload)
      } catch (error) {
        console.log(error)
      }
      console.log(`queryId: ${queryId}, method: ${method}, query: ${query}`)
      // @ts-ignore
      await this.$sendRequest({
        method,
        url: query,
        data: payload
      })
        .catch((err: any) => {
          this.queryList[queryId].response = `Request error. ${err}`
        })
        .then((response: any) => {
          if (!response || !response.data) { return null }
          this.queryList[queryId].response = response.data
        })
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
      { element = null, modifier = '', delay = 600 }:
      { element?: any; modifier?: string; delay?: number } = {}): void {
      element[0].classList.add(modifier)
      setTimeout(function () {
        element[0].classList.remove(modifier)
      }, delay)
    },
    /**
     *
     */
    resetQueryFields (queryId: number): void {
      const queryItem = this.queryList[queryId]
      queryItem.payload = null
      queryItem.response = null
      queryItem.method = 'undefined'
      this.queryList[queryId] = queryItem
    }
  }
})
</script>

<style lang="scss" scoped>
$gray: #d3d3d3;
$green: #00c58e;
$red: #f56565;
$inner-padding: 3px 4px;
.api {
  padding: 10px 20px;
  h1 {
    margin-bottom: 20px;
  }
  .flex-wrapper {
    display: flex;
  }
}
.example-list-item {
  margin-bottom: 20px;
  padding-bottom: 20px;
  &:last-child {
    border-bottom: none;
  }
  textarea, input, select {
    border: 1px solid $gray;
  }
  &__query {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 10px;
    flex-grow: 0;
    max-width: 70%;
  }
  &__response {
    border: 1px solid $gray;
    padding: 10px;
    overflow: auto;
    max-height: 300px;
    flex-grow: 1;
  }
}
.example-list-query {
  border: 1px solid $gray;
  padding: 10px;
  &__wrapper {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }
  &__pattern {
    display: inline-block;
    margin-bottom: 10px;
    font-weight: 600;
    transition: color .2s, background .2s;
    &.copy-success {
      color: $green;
    }
    &.copy-error {
      color: $red;
    }
  }
  &__method {
    padding: 2px 4px;
    margin-right: 5px;
  }
  &__input {
    width: 100%;
    padding: $inner-padding;
    min-width: 400px;
  }
  &__payload {
    min-width: 482px;
    min-height: 80px;
    max-width: 100%;
    margin-bottom: 10px;
    padding: $inner-padding;
    z-index: 2;
  }
  &__button {
    padding: 4px 10px;
    border-radius: 3px;
    border: none;
    color: white;
    cursor: pointer;
    &:disabled {
      cursor: auto;
      background: $gray;
    }
    &:first-child {
      margin-right: 5px;
    }
    &_send {
      background: $green;
    }
    &_reset {
      background: $red;
    }
  }
}
</style>
