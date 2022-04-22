import { constantRoutes } from '@/router'

const state = {
  routes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      let accessedRoutes = []
      for (let item of constantRoutes) {
        if (item.children) {
          accessedRoutes = item.children
        }
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}