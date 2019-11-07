import { Auth } from '~/middleware/auth.js'

class AuthAdmin extends Auth {
  constructor ({ store, app }) {
    super({ store, app })
    this.adminPath = 'admin'
  }
  /**
   * @returns boolean
   */
  isAdmin () {
    if (this.userFromStore && this.userFromStore.admin) {
      return true
    }
  }
  /**
   * Init admin authorization
   * @returns redirection
   */
  initAdmin ({ redirect }) {
    if (this.targetPath.includes(this.adminPath) && !this.isAdmin()) {
      return redirect('/')
    }
  }
}

export default function ({ store, redirect, app }) {
  const auth = new AuthAdmin({ store, app })
  auth.init({ store, redirect, app })
  auth.initAdmin({ redirect })
}
