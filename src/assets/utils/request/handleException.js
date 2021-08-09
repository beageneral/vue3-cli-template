/*
 * @Author: wujy
 * @Date: 2021-01-13 10:31:08
 * @LastEditTime: 2021-06-22 15:18:50
 * @Description: 异常管理
 */
import { ElMessage } from 'element-plus'
import statusCode from './statusCode'
import { $$log } from '@utils/debug'
import { consoleDebug, showToastOnError } from '@/config'

export function showError({ status, msg }) {
  if (String(status).startsWith('2') || !msg) {
    return
  }

  ElMessage.error(statusCode[status] || msg)
}

export function handleError(err) {
  const { message, config, response } = err
  try {
    showToastOnError && showError({ status: response?.status, msg: message })
    consoleDebug && $$log.danger(`${response ? '响应' : '请求'}异常 ——>`, { ...err })
  } catch (error) {
    showError({ status: response?.status, msg: message || error })
  }

  return Promise.reject(err)
}
