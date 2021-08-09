/*
 * @Description: 路由信息
 */
import { asyncRoutes } from '@/router/asyncRoutes'
import { constantRoutes } from '@/router/constantRoutes'
import { resetRouter } from '@/router'

import { authentication, rolesControl } from '@/config'
import { convertRouter, filterRoutes } from '@utils/routes'
import { isArray } from '@utils/validate'

import { ElMessage } from 'element-plus'

const state = () => ({
  routes: [],
  activeMenu: [],
})

const getters = {
  routes: (state) => state.routes,
  activeMenu: (state) => state.activeMenu,
}

const mutations = {
  // 多模式设置路由
  setRoutes(state, routes) {
    state.routes = routes
  },

  /**
   * @description 修改 activeMenu
   */
  changeActiveMenu(state, activeMenu) {
    state.activeMenu = activeMenu
  },

  // 修改 Meta
  changeMenuMeta(state, options) {
    function handleRoutes(routes) {
      return routes.map((route) => {
        if (route.name === options.name) Object.assign(route.meta, options.meta)
        if (route.children && route.children.length) route.children = handleRoutes(route.children)
        return route
      })
    }
    state.routes = handleRoutes(state.routes)
  },
}

const actions = {
  // 多模式设置路由
  async setRoutes({ commit }, mode = 'none') {
    // 默认前端路由
    let routes = [...asyncRoutes]
    // 设置游客路由关闭路由拦截(can remove)
    const control = mode === 'visit' ? false : rolesControl

    // TODO 路由表来自于后端时

    // 根据权限和 rolesControl 过滤路由
    const accessRoutes = filterRoutes([...constantRoutes, ...routes], control)
    // 设置菜单所需路由
    commit('setRoutes', JSON.parse(JSON.stringify(accessRoutes)))

    // 根据可访问路由重置Vue Router
    await resetRouter(accessRoutes)
  },

  // 修改 activeMenu
  changeActiveMenu({ commit }, activeMenu) {
    commit('changeActiveMenu', activeMenu)
  },

  // 修改 Route Meta
  changeMenuMeta({ commit }, options = {}) {
    commit('changeMenuMeta', options)
  },
}

export default { state, getters, mutations, actions }
