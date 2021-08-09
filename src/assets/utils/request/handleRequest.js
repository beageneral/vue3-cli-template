/*
 * @Date: 2021-01-11 10:31:08
 * @LastEditTime: 2021-08-09 14:14:17
 * @Description: 请求拦截器
 */
import { requestLoading } from '@/config'
import { handleLog } from './utils'
import { ElLoading } from 'element-plus'

export default function handleRequest(config) {
  handleLog('primary', `请求信息`, config)
  handleLog('info', `接口环境`, process.env.VUE_APP_ENV)

  requestLoading &&
    (config.loadingInstance = ElLoading.service({
      fullscreen: false,
      target: document.querySelector('.layout-app-main'),
      customClass: 'global-el-loading',
    }))

  // app mock 平台路径含 /mock-api
  if (process.env.VUE_APP_ENV !== 'mock') {
    config.url = config.realURL
    handleLog('primary', `请求非 mock 接口`, location.origin + config.url)
  } else {
    handleLog('warning', `请求 mock 接口`, config.baseURL + config.url)
  }

  return config
}
