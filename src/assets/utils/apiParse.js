/*
 * @Description: API 自定义传参和配置格式化
 */
import http from '@utils/request'
import qs from 'qs'

// 解析请求方法构造
export const parseRequest = ({ url, realURL, method = 'get', useForm = false }) => {
  return (params = {}) => {
    const config = {
      url,
      realURL,
      [method === 'get' ? 'params' : 'data']: params,
      method: method || 'get',
    }
    if (useForm) {
      config.data = qs.stringify(config.data)
      Object.assign(config, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    }

    return http(config)
  }
}
