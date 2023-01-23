import { createStore } from 'vuex'
import toyStore from './modules/toy-module.js'
import chartStore from './modules/chart-module.js'

// create a store instance
const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    toyStore,
    chartStore
  },
})

export default store
