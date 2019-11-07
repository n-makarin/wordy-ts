import { cookies } from '~/store/config.ts'

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
   * 
   */
  async login ({ commit = Function }, 
    { login = '', password = '' }:
    { login?: string; password?: string; } = {}): Promise<any> {
    // @ts-ignore
    await this.app.$sendRequest({
      method: 'GET',
      url: `/login/?login=${login}&password=${password}`
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
   * 
   */
  logout ({ commit = Function }): void {
    commit('SET_USER', '')
    // @ts-ignore
    this.app.$cookies.remove(cookies.authUser.name)
  }
}

export const getters = {
  user(state: any) {
    return state.user
  } 
}