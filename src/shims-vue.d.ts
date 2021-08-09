/* eslint-disable */
import { Size } from './typings/elementPlus'
import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vue 全局变量挂载
// 如果无效，则直接放在 main.ts 中
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $loading: typeof ElMessage
    $message: typeof ElMessage
    $notify: typeof ElNotification
    $confirm: typeof ElMessageBox.confirm
    $alert: typeof ElMessageBox.alert
    $prompt: typeof ElMessageBox.prompt
  }
}
