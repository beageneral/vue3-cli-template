// 通用型请求处理
// loading + messageTip + throw error log + callback
import { ElMessage } from 'element-plus'

// action 请求方法
// handler 数据格式化
// query 查询参数
// msg 成功 | 失败的提示信息，不传不显示
// loading 传入的是 ref 对象
export const useFetchEffect = ({ action, handler, errorHandler, query = {}, msg = { success: '', error: '' }, loading = null }) => {
  async function $fetchData() {
    try {
      loading && (loading.value = true)
      const { data, success, message } = await action(query)
      if (success) {
        handler && handler({ data, success })
        msg.success && ElMessage.success(msg.success)
      }
    } catch (error) {
      console.error(error)
      msg.error && ElMessage.error(msg.error, error)
      errorHandler && errorHandler({ message: msg.error })
    } finally {
      loading && (loading.value = false)
    }
  }

  return {
    $fetchData,
  }
}
