/*
 * @Description: route 辅助
 */
import { resolve } from 'path'
import { recordRoute } from '@/config'
import { isExternal } from '@utils/validate'
import { hasAccess } from '@utils/hasAccess'

/**
 * @description all模式渲染后端返回路由,支持包含views路径的所有页面
 * @export
 * @param {*} asyncRoutes
 * @return {*}
 */
export function convertRouter(asyncRoutes) {
  return asyncRoutes.map((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = () => import('@/layouts')
      } else {
        const index = route.component.indexOf('views')
        const path = index > 0 ? route.component.slice(index) : `views/${route.component}`
        route.component = () => import(`@/${path}`)
      }
    }
    if (route?.children?.length) route.children = convertRouter(route.children)
    if (route?.children?.length === 0) delete route.children
    return route
  })
}

/**
 * @description 根据roles数组拦截路由
 * @export
 * @param {*} routes 路由
 * @param {*} rolesControl 是否进行权限控制
 * @param {string} [baseUrl='/'] 基础路由
 * @return {*}
 */
export function filterRoutes(routes, rolesControl, baseUrl = '/') {
  return routes
    .filter((route) => (rolesControl && route.meta && route.meta.roles ? hasAccess(route.meta.roles) : true))
    .map((route) => {
      route = { ...route }
      route.path = route.path !== '*' && !isExternal(route.path) ? resolve(baseUrl, route.path) : route.path

      if (route.children) {
        route.children = filterRoutes(route.children, rolesControl, route.path)
        route.childrenPathList = route.children.flatMap((_) => _.childrenPathList)
        if (!route.redirect) {
          route.redirect = route.children[0].redirect ? route.children[0].redirect : route.children[0].path
        }
      } else {
        route.childrenPathList = [route.path]
      }

      return route
    })
}

/**
 * @description 根据当前 route 获取激活菜单
 * @export
 * @param {*} route 当前路由
 * @param {boolean} [isTabsBar=false] 是否是标签
 * @return {*}
 */
export function handleActivePath(route, isTabsBar = false) {
  const { meta, path, fullPath } = route
  const rawPath = route.matched ? route.matched[route.matched.length - 1].path : path
  if (isTabsBar) return meta.dynamicNewTab ? fullPath : rawPath
  if (meta.activeMenu) return meta.activeMenu
  return fullPath ? fullPath : rawPath
}

/**
 * @description 获取当前跳转登录页的Route
 * @export
 * @param {*} currentPath 当前页面地址
 * @return {*}
 */
export function toLoginRoute(currentPath) {
  if (recordRoute && currentPath !== '/')
    return {
      path: '/login',
      query: { redirect: currentPath },
      replace: true,
    }
  else return { path: '/login', replace: true }
}

/**
 * @description 获取路由中所有的Name
 * @export
 * @param {*} routes 路由数组
 * @return {*}  Name数组
 */
export function getNames(routes) {
  return routes.flatMap((route) => {
    let names = []
    if (route.name) names.push(route.name)
    if (route.children) names.push(...getNames(route.children))
    return names
  })
}
