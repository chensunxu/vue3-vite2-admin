import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => ({
  token: getToken(),
  name: '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: [],
  userInfo: ''
})

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  setUserInfo({ commit }, data) {
    commit('SET_USERINFO', data)
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const params = {
        username: username.trim(),
        password: password
      }
      login(params)
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response
          if (!data) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject('Verification failed, please Login again.')
          }
          const { roles, name, avatar } = data

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_USERINFO', data)
          commit('SET_ROLES', roles)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      // logout(state.token).then(() => {
      removeToken() // must remove  token  first
      // resetRouter()
      commit('RESET_STATE')
      commit('SET_NAME', null)
      commit('SET_AVATAR', null)
      commit('SET_USERINFO', null)
      commit('SET_ROLES', null)
      resolve()

      /*
       * }).catch(error => {
       *   reject(error)
       * })
       */
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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
