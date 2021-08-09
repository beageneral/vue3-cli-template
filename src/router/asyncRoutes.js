/*
 * @Description: 前端导出路由时才有用， intelligence
 */
import Layout from '@/layouts'

// 异步路由表
export const asyncRoutes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'el-icon-s-home',
      levelHidden: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "base-page" */ '@/views/dashboard'),
        meta: {
          title: '看板',
          icon: 'el-icon-s-data',
          noClosable: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'NotFound',
    meta: {
      hidden: true,
    },
  },
]
