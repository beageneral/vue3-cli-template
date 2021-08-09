/*
 * @Description: 本地缓存管理
 */
import { isJson } from './validate'

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (isJson(value)) {
    return JSON.parse(value)
  } else {
    return false
  }
}
