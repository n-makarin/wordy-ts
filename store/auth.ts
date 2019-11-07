export const state = {
  user: null
}

export const mutations = {
  SET_AUTH_USER (state: any, user: any) {
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
        commit('SET_AUTH_USER', user)
        // @ts-ignore
        this.app.$cookies.set('authUser', user, {
          path: '/authUser',
          maxAge: 60 * 60 * 24 * 7
        })
      })
  },
  /**
   * 
   */
  logout ({ commit = Function }): void {
    commit('SET_AUTH_USER', '')
    // @ts-ignore
    this.app.$cookies.remove('authUser', {
      path: '/authUser'
    })
  }
}

export const getters = {
  user(state: any) {
    return state.user
  } 
}