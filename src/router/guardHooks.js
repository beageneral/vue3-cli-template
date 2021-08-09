// 路由守卫
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { toLoginRoute } from '@utils/routes'
import { authentication, loginInterception, routesWhiteList, supportVisit } from '@/config'

export function setupGuard(router) {
  NProgress.configure({
    easing: 'ease',
    speed: 500,
    trickleSpeed: 200,
    showSpinner: false,
  })

  router.beforeEach(async (to, from, next) => {
    const { showProgressBar } = store.getters['settings/theme']
    showProgressBar && NProgress.start()

    let hasToken = store.getters['user/token']
    let hasRouters = store.getters['routes/routes']?.length

    if (!loginInterception) hasToken = true

    if (hasToken) {
      // 登录校验
      if (hasRouters) {
        // 已登录用户, 访问登录页面需要重定向到首页
        to.path === '/login' ? next({ path: '/' }) : next()
        showProgressBar && NProgress.done()
      } else {
        try {
          // 登录拦截开启(TODO)：获取用户数据；关闭：使用虚拟用户
          if (loginInterception) {
            await store.dispatch('user/getUserInfo')
          } else {
            await store.dispatch('user/setVirtualRoles')
          }

          // 前端 or 后端导出路由，最后通过角色和权限进行过滤
          await store.dispatch('routes/setRoutes', authentication)
          next({ ...to, replace: true })
        } catch (err) {
          // 登录拦截过程失败：重置用户信息，去登录页
          await store.dispatch('user/resetAll')
          next(toLoginRoute(to.path))
        }
      }
    } else {
      // 特殊路由处理，如白名单路由
      if (routesWhiteList.includes(to.path)) {
        // 设置游客，非必需(can remove)
        if (supportVisit && !hasRouters) {
          await store.dispatch('routes/setRoutes', 'visit')
          next({ path: to.path, replace: true })
        } else {
          next(toLoginRoute(to.path))
        }
      }
    }
  })

  router.afterEach((to) => {
    document.title = to.meta.title
    if (NProgress.status) NProgress.done()
  })
}
