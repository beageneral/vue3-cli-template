import { guid } from '@utils/guid'
import { ElMessage } from 'element-plus'

// 动态表单列表管理 classify
export function useTodoListManageEffect({ formData, fields, customFiled }) {
  const { field, key, value } = fields

  // 增加列表
  const addListItem = () => {
    const GUID = guid()
    let emptyCount = 0
    formData[field] = formData[field] || []
    formData[field].forEach((el) => {
      if (!el[value]) {
        emptyCount++
      }
    })

    if (emptyCount >= 1 && formData[field]?.length) {
      ElMessage.warning('请先补充未完善部分')
      return
    }

    if (formData[field].length >= 999) {
      ElMessage.warning('不能超过 999 个')
      return
    }

    formData[field].push({
      id: GUID,
      [key]: '',
      [value]: '',
      ...(customFiled && customFiled()),
    })
  }

  // 删除数据
  const removeCurrentItem = (id) => {
    formData[field] = formData[field].filter((item) => item.id !== id)
  }

  // 重置 id
  const resetAllItem = (customFormData) => {
    formData[field] = customFormData || formData[field]
    formData[field] = formData[field].map((i) => {
      return {
        ...i,
        id: i.id ? i.id : guid(),
      }
    })
  }

  return { addListItem, removeCurrentItem, resetAllItem }
}
