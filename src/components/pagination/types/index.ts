/**
 * @description 分页属性
 * @export
 * @interface IPagination
 */
export interface IPagination {
  /**
   * @description 页码
   * @type {number}
   * @memberof IPagination
   */
  pageNo?: number
  /**
   * @description 每页条数
   * @type {number}
   * @memberof IPagination
   */
  pageSize?: number
  /**
   * @description 每页条数断点
   * @type {number[]}
   * @memberof IPagination
   */
  pageSizes?: number[]
  /**
   * @description 总条数
   * @type {number}
   * @memberof IPagination
   */
  totalCount?: number
  /**
   * @description 总页数
   * @type {number}
   * @memberof IPagination
   */
  pages?: number
}

type TEmptyFunction = (() => void) | boolean
// 设置分页参数的方法
export type TSetPagination = (changePageInfo: IPagination, cb: TEmptyFunction) => void
