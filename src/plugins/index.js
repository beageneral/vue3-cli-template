import { asyncRoutes } from '@/router/asyncRoutes'
import { menuTitle, menuSubTitle, menuLink, menuLinkName } from '@/config'
import mitt from 'mitt'
import _ from 'lodash'
import '@/assets/scss/index.scss'

export function setupGlobalPlugin(app) {
  if (process.env.VUE_APP_ENV !== 'production') {
    app.config.devtools = true
    app.config.performance = true
  }

  app.config.globalProperties.$RouteMap = asyncRoutes
  app.config.globalProperties.$CONFIG = {
    menuTitle,
    menuSubTitle,
    menuLink,
    menuLinkName,
  }

  app.provide('$RouteMap', asyncRoutes)

  // 加载主题
  const Themes = require.context('../assets/scss/themes', false, /\.scss$/)
  Themes.keys().map(Themes)

  // 自动注册 component 目录下的组件
  const requireComponent = require.context('@/components', true, /\.vue$/)
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    const componentName = componentConfig.default.name
    app.component(componentName, componentConfig.default || componentConfig)
  })

  // 自动注册 layout 目录下的组件
  const requireComponentLayout = require.context('@/layouts', true, /\.vue|\.tsx$/)
  requireComponentLayout.keys().forEach((fileName) => {
    const componentConfig = requireComponentLayout(fileName)
    const componentName = componentConfig.default.name
    app.component(componentName, componentConfig.default || componentConfig)
  })

  // 加载插件
  const Plugins = require.context('@/plugins', true, /\.js|\.ts$/)
  Plugins.keys().forEach((key) => {
    if (!key.includes('index.js')) {
      Plugins(key).setup(app)
    }
  })

  // 全局注册 sub
  const _emitter = mitt()
  app.config.globalProperties.$pub = (...args) => {
    _emitter.emit(_.head(args), args.slice(1))
  }
  app.config.globalProperties.$sub = function () {
    Reflect.apply(_emitter.on, _emitter, _.toArray(arguments))
  }
  app.config.globalProperties.$unsub = function () {
    Reflect.apply(_emitter.off, _emitter, _.toArray(arguments))
  }
}
