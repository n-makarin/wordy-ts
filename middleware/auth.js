import { cookies } from '~/store/config.ts'

export default function ({ store, redirect, app }) {
  let userFromStore = store.getters['auth/user']
  const loginPath = '/login'
  const targetPath = app.context.route.fullPath

  // try to get user from cookies
  if (!userFromStore) {
    const userFromCookies = app.$cookies.get(cookies.authUser.name)
    if (userFromCookies) {
      store.commit('auth/SET_USER', userFromCookies)
      userFromStore = userFromCookies
    }
  }

  // redirect to /login when no user and targetPath is not /login yet
  if (!userFromStore && targetPath !== loginPath) {
    return redirect(loginPath)
  }

  // redirect to home pahe when have a user and targetPath is /login
  if (userFromStore && targetPath === loginPath) {
    return redirect('/')
  }
}
