/*
 * @Description: 分页逻辑
 */
import { reactive, provide } from 'vue'
import { IPagination, TSetPagination } from '../types'

export const defaultPagination: IPagination = {
  pageSize: 10,
  pageNo: 1,
  pageSizes: [10, 20, 50, 100],
  totalCount: 100,
  pages: 0,
}

// 该 hook 返回类型
type TUsePaginationEffectReturn = { pagination: IPagination; setPagination: TSetPagination }
export function usePaginationEffect(): TUsePaginationEffectReturn {
  let pagination = reactive(defaultPagination)

  // 修改分页参数
  // 可能改变 totalCount 的时候需要用到。 此时不需要通知父组件去请求数据
  const setPagination = (changePageInfo = {}, cb) => {
    pagination = Object.assign(pagination, changePageInfo)
    cb && cb()
  }

  provide('setPagination', setPagination)
  provide('pagination', pagination)

  return {
    pagination,
    setPagination,
  }
}
