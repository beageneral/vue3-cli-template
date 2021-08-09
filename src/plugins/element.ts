import { App } from 'vue'
import i18n from '@/i18n'
import ElementPlus, { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import '@/assets/scss/variables/element-variables.scss'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'

export function setup(app: App): void {
  app.use(ElementPlus, {
    size: 'small',
    i18n: i18n.global.t,
    zIndex: 2000,
  })

  app.config.globalProperties.$loading = ElLoading
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
}
