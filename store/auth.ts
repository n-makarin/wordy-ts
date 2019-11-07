export const state = {
  authUser: null
}

export const mutations = {
  SET_AUTH_USER (state: any, user: any) {
    state.authUser = user
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
    this.app.$sendRequest({
      method: 'GET',
      url: `/login/?login=${login}&password=${password}`
    })
      .catch((err: any) => {
        console.log(err)
        return false
      })
      .then((response: any) => {
        if (!response || !response.data || response.data.length === 0) { return }
        const user: any = response.data[0]
        commit('SET_AUTH_USER', user)
        // @ts-ignore
        this.app.$cookies.set('authUser', user, {
          path: '/authUser',
          maxAge: 60 * 60 * 24 * 7
        })
        return true
      })
  },
  /**
   * 
   */
  logout ({ commit = Function }): void {
    commit('SET_AUTH_USER', '')
  }
}

export const getters = {
  authUser(state: any) {
    return state.authUser
  } 
}