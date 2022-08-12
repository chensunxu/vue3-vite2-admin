import { createStore } from 'vuex'
import getters from './getters'
import state from './state'
import user from './modules/user'
import app from './modules/app'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import permission from './modules/permission'

import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    app,
    settings,
    user,
    tagsView,
    permission
  },
  getters,
  state,
  plugins: [createPersistedState()]
})
