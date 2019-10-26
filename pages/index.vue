<template>
  <div class="container">
    <div>
      <logo />
      {{ info }}
      {{ userInfo }}
      {{ userInfo.fullName }}
      {{ storeName }}
      <h1 class="title">
        wordy
      </h1>
      <h2 class="subtitle">
        Website for learning foreign words
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'

import { User } from '~/types/index.ts'

interface UserInfo {
  fullName: String;
  age: Number;
  phone: Number;
}

export default Vue.extend({
  components: {
    Logo
  },
  data () {
    const user: User = {
      firstName: 'John',
      secondName: 'Dhoe',
      age: 27,
      phone: 5569
    }
    return {
      user
    }
  },
  computed: {
    info (): String {
      return `${this.user.firstName} ${this.user.age}`
    },
    userInfo (): UserInfo {
      return {
        fullName: this.fullName,
        age: this.user.age,
        phone: this.user.phone
      }
    },
    fullName (): String {
      return `${this.user.firstName} ${this.user.secondName}`
    },
    storeName (): string {
      return this.$store.getters.userName
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
