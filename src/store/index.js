import { createStore } from 'vuex'

const rootModule = {
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  getters: {},
}

// vuex 模块集成
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach((key, index) => {
  const store = files(key).default
  const moduleName = key.replace(/^\.\//, '').replace(/\.js$/, '')
  const modules = rootModule.modules || {}
  modules[moduleName] = store
  modules[moduleName].namespaced = true
})

const store = createStore(rootModule)

export function setupStore(app) {
  app.use(store)
}

export default store
