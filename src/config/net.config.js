/*
 * @Description: 请求库配置
 */
module.exports = {
  // 最长请求时间 30s
  requestTimeout: 30000,
  // 业务页面范围的 loading
  requestLoading: false,
  // 报错时 toast
  showToastOnError: true,
  // 开启 console.log 打印请求响应相关信息 || process.env.NODE_ENV === "development"
  consoleDebug: false,
}
