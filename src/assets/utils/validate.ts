/*
 * @Author: wujy
 * @Date: 2021-01-15 14:54:41
 * @LastEditTime: 2021-06-25 16:19:59
 * @Description: 校验规则
 */

/**
 * @description 判读是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description 判断是否为json
 * @param value 值
 * @returns {boolean}
 */
export function isJson(value) {
  if (typeof value == 'string') {
    try {
      const obj = JSON.parse(value)
      return !!(typeof obj == 'object' && obj)
    } catch (e) {
      return false
    }
  }
}

/**
 * @description 判断是否是字符串
 * @param value
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

/**
 * @description 判断是否是数组
 * @param arg
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @description: 判断类型
 * @param {*} data 任意变量或值
 * @return {string} 小写
 */
export const validType = (data) => {
  const toString = Object.prototype.toString
  const dataType = toString
    .call(data)
    .replace(/\[object\s(.+)\]/, '$1')
    .toLowerCase()
  return dataType
}

// 判断空值
// 当前业务接口，将空字符也视为空值，但是 0 却不是，所以要单独列出来
export const isNotEmpty = (val) => {
  const isNotNull = validType(val) !== 'null'
  const isNotUndefined = val !== undefined
  const isNotEmptyObject = validType(val) === 'object' ? Reflect.ownKeys(val).length : true

  return val !== '' && isNotNull && isNotUndefined && isNotEmptyObject
}
