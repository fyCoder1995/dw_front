import { constantRoutes } from '@/router'
import { getUserRouters } from '@/api/public'

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
  },
  getPermRoutes({ commit }, obj) {
    return new Promise((resolve, reject) => {
      getUserRouters(obj).then(({ result }) => {
        let permRoutes = result.routes.filter(item => {
          if (item.meta) {
            return item
          }
        })
        let accessedRoutes = []
        for (let i of constantRoutes[2].children) {
          for (let j of permRoutes) {
            if (i.path === j.path) {
              accessedRoutes.push(i)
            }
          }
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}