const state = () => ({
  user: null,
})

const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  }
}

const getters = {
  isAuthenticated (state) {
    return state.user != null
  },
  getUser () {
    return state.user
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};