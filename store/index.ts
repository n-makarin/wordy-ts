export const state = () => ({
  userName: 'Johny'
})

export const mutations = {
  SET_USER_NAME (state: any, payload: any) {
    state.userName = payload
  }
}

export const getters = {
  userName(state: any) {
    return state.userName
  } 
}