import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    breadListState: [
      { name: '统计管理', path: '/statistics/index' }
    ]
  },
  mutations: {
    breadListStateAdd(state, obj) {
      state.breadListState.push(obj);
    },
    breadListStateRemove(state, num) {
      state.breadListState = state.breadListState.slice(0, num);
    }
  },
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters
})

export default store
