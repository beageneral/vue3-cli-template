/*
 * @Description: 系统配置
 */
module.exports = {
  // 登录后提示标题
  loginNotificationTitle: 'apper',
  // 标题分隔符
  titleSeparator: ' - ',
  // 标题是否反转
  // 如果为false: "page - title"
  // 如果为ture : "title - page"
  titleReverse: false,
  // token名称
  tokenName: 'token',
  // token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: 'app-token',
  // token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  // token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  // 是否开启登录拦截
  loginInterception: false,
  // intelligence(前端导出路由)和all(后端导出路由)两种方式 | 后端模式未开发
  authentication: 'intelligence',
  // 是否开启roles字段进行角色权限控制(如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段)
  rolesControl: true,
  // 不经过token校验的路由
  routesWhiteList: ['/login'],
  // 缓存路由的最大数量
  keepAliveMaxNum: 20,
  // 是否支持游客模式，支持情况下，访问白名单，可查看所有asyncRoutes （给予最高权限）
  supportVisit: true,
  // 是否为 hash 路由模式
  isHashRouterMode: true,
  // 语言类型zh、en
  i18n: 'zh',
}
