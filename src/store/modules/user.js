import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, setUserId, removeSessionStorage } from '@/utlis/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {},
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
}

const actions = {
  login({ commit }, loginInfo) {
    const { grant_type, username, password } = loginInfo
    return new Promise((resolve, reject) => {
      login({ grant_type: grant_type, username: username.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户信息
  getInfo({ commit }, username) {
    return new Promise((resolve, reject) => {
      getInfo({ username }).then(response => {
        const { result } = response
        commit('SET_USERINFO', result)
        setUserId(result.userId)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', {})
        removeSessionStorage()
        resetRouter()
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 清除Vuex
  resetVuex({ commit }) {
    commit('SET_USERINFO', {})
  },
  // 清除Token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeSessionStorage()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

