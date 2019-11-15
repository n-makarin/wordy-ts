import { cookies } from '~/store/config.ts'
import { User as UserTypes } from '~/types/index.ts'

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
  },
  async edit({}, payload: UserTypes): Promise<boolean> {
    // @ts-ignore
    const response: any = await this.app.$sendRequest({
      method: 'PATCH',
      url: `/user/${payload.id}`,
      data: payload
    })
      .catch((err: any) => {
        console.log(err)
      })
      .then((response: any) => {
        if (!response || !response.data || response.data.length === 0) { return false }
        const user: any = response.data
        // @ts-ignore
        this.app.store.commit('auth/SET_USER', user)
        // @ts-ignore
        this.app.$cookies.set(cookies.authUser.name, user, {
          maxAge: cookies.authUser.maxAge
        })
        return true
      })
    return response
  }
}