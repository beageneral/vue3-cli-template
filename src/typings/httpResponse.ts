// 请求返回体
export interface IHttpResponse<T> {
  data: T
  errorCode: number
  message: string
  success: boolean
  pageBean: {
    pageNo: number
    pageSize: number
    pages: number
    totalCount: number
  }
}
