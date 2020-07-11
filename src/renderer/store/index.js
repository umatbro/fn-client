import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    client: null,
  },
  mutations: {
    setClient (state, client) {
      state.client = client
    },
  },
  actions: {
    setClient (store, client) {
      store.commit('setClient', client)
    },
  },
  modules,
  plugins: [
    createPersistedState(),
  ],
  strict: process.env.NODE_ENV !== 'production',
})
