/*
 * @Author: wujy
 * @Date: 2021-01-11 18:55:31
 * @LastEditTime: 2021-06-22 15:20:13
 * @Description: 响应拦截器
 */
import { showError } from './handleException'
import { handleLog } from './utils'
import { requestLoading } from '@/config'
import { validType } from '@utils/validate'

export default function handleResponse(res) {
  const { data, config } = res
  requestLoading && config.loadingInstance.close()
  handleLog('success', '响应结果', res)

  // 业务失败
  if (validType(data) === 'string') {
    showError({ status: 500, msg: `接口返回异常>>>${data}` })
    return
  }

  if (!data?.success) {
    showError({ status: data?.errorCode, msg: data?.message })
    return
  }

  return data
}
