import { cookies } from '~/store/config.ts'

export default {
  async create({}, payload: object): Promise<void> {
    // @ts-ignore
      await this.app.$sendRequest({
        method: 'POST',
        url: '/user/list',
        data: payload
      })
        .catch((err: any) => {
          console.log(err)
        })
        .then((response: any) => {
          if (!response || !response.data || response.data.length === 0) { return }
          const user: any = response.data
          // @ts-ignore
          this.app.store.commit('auth/SET_USER', user)
          // @ts-ignore
          this.app.$cookies.set(cookies.authUser.name, user, {
            maxAge: cookies.authUser.maxAge
          })
        })
  }
}