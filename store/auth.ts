import { cookies } from '~/store/config.ts'
import { email } from '~/utils/regexp'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state: any, user: any) {
    state.user = user
  }
}

export const actions = {
  /**
   * Verify user's login and password.
   * Set user to store and cookies 
   */
  async login ({ commit = Function }, 
    { identifier = '', password = '' }:
    { identifier?: string; password?: string; } = {}): Promise<any> {
      let url: string
      if (email.test(identifier)) {
        url = `/login-email/?email=${identifier}&password=${password}`
      } else {
        url = `/login/?login=${identifier}&password=${password}`
      }
    // @ts-ignore
    await this.app.$sendRequest({
      method: 'GET',
      url: url
    })
      .catch((err: any) => {
        console.log(err)
      })
      .then((response: any) => {
        if (!response || !response.data || response.data.length === 0) { return }
        const user: any = response.data[0]
        commit('SET_USER', user)
        // @ts-ignore
        this.app.$cookies.set(cookies.authUser.name, user, {
          maxAge: cookies.authUser.maxAge
        })
      })
  },
  /**
   * Remove user from store and cookies
   */
  logout ({ commit = Function }): void {
    commit('SET_USER', '')
    // @ts-ignore
    this.app.$cookies.remove(cookies.authUser.name)
  },
  /**
   * Prolong autharization when got user from cookies
   */
  prolongAuth({}, user: object): void {
    // @ts-ignore
    this.app.$cookies.set(cookies.authUser.name, user, {
      maxAge: cookies.authUser.maxAge
    })
  }
}

export const getters = {
  user: (state: any) => state.user
}