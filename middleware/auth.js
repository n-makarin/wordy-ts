import { cookies } from '~/store/config.ts'

export class Auth {
  constructor ({ store, app }) {
    this.userFromStore = store.getters['auth/user']
    this.loginPath = '/login'
    this.joinPath = '/join'
    this.targetPath = app.context.route.fullPath
  }
  /**
   * Try to get user from cookies
   * @returns void
   */
  setUserFromCookies ({ store, app }) {
    const userFromCookies = app.$cookies.get(cookies.authUser.name)
    if (userFromCookies) {
      store.commit('auth/SET_USER', userFromCookies)
      this.userFromStore = userFromCookies
      store.dispatch('auth/prolongAuth', userFromCookies)
    }
  }
  /**
   * @returns boolean
   */
  needRedirectToLogin () {
    if (!this.userFromStore &&
      this.targetPath !== this.loginPath &&
      this.targetPath !== this.joinPath) {
      return true
    }
  }
  /**
   * @returns boolean
   */
  needRedirectToHome () {
    if (this.userFromStore &&
      (this.targetPath === this.loginPath ||
      this.targetPath === this.joinPath)) {
      return true
    }
  }
  /**
   * Init authorization
   * @returns redirection
   */
  init ({ store, redirect, app }) {
    if (!this.userFromStore) {
      this.setUserFromCookies({ store, app })
    }
    if (this.needRedirectToLogin()) {
      return redirect(this.loginPath)
    }
    if (this.needRedirectToHome()) {
      return redirect('/')
    }
  }
}
export default function ({ store, redirect, app }) {
  const auth = new Auth({ store, app })
  auth.init({ store, redirect, app })
}
