export default function ({ store, redirect }) {
  const authUser = store.getters['auth/user']
  if (!authUser) {
    return redirect('/login')
  }
}
