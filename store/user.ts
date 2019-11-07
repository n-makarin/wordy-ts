import Mutations from '~/store/user/mutations.ts'
import Actions from '~/store/user/actions.ts'
import Getters from '~/store/user/getters.ts'

export const state = () => ({
  id: null,
  login: null
})

export const mutations = Mutations
export const actions = Actions
export const getters = Getters