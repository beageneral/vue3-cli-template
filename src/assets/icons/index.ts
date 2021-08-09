import { App } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue'

// 使用require.context 加载./svg目录下所有svg文件
const req = require.context('./svg', false, /\.svg$/)
// 导入 ./svg/ 下所有.svg文件
const requireAll = (requireContext: ReturnType<typeof require.context>) => requireContext.keys().map(requireContext)
requireAll(req)

// 全局注册svg-icon组件
export default (app: App): void => {
  app.component('SvgIcon', SvgIcon)
}
