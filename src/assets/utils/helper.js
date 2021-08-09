import { merge, keyBy, values, uniqBy } from 'lodash'

/**
 * 通过指定 key 合并两个列表
 * @param {*} options1 列表1
 * @param {*} options2 列表2
 * @param {*} key 指定的 key，默认是 id
 * @returns
 */
export const mergeOptions = (options1 = [], options2 = [], key = 'id') => {
  if (options1?.length > 0 || options2?.length > 0) {
    const mergedList = uniqBy([...options1, ...options2], key)
    return mergedList
  }

  return []
}
