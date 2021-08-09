/*
 * @Description: 路由配置
 */
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { publicPath, isHashRouterMode } from '@/config'

import { constantRoutes } from './constantRoutes'
import { setupGuard } from './guardHooks'

// 创建路由
const router = createRouter({
  history: isHashRouterMode ? createWebHashHistory(publicPath) : createWebHistory(publicPath),
  routes: constantRoutes,
})

// flat routers 递归
function fatteningRoutes(routes) {
  return routes.flatMap((route) => (route.children ? fatteningRoutes(route.children) : route))
}

// 增加路由
function addRouter(routes) {
  routes.forEach((route) => {
    if (!router.hasRoute(route.name)) router.addRoute(route)
    if (route.children) addRouter(route.children)
  })
}

// 重置路由
export function resetRouter(routes = constantRoutes) {
  // 拍平路由
  routes.map((route) => {
    if (route.children) {
      route.children = fatteningRoutes(route.children)
    }
  })

  // 去重
  router.getRoutes().forEach((route) => {
    const routeName = route.name
    router.hasRoute(routeName) && router.removeRoute(routeName)
  })

  addRouter(routes)
}

// 注册路由 + 守卫
export function setupRouter(app) {
  setupGuard(router)
  app.use(router)
  return router
}

export default router
