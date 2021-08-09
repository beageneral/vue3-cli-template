import { defineComponent, toRef } from 'vue'
import i18n from '@/i18n'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'LayoutApp',
  setup() {
    const locale = toRef(i18n.global, 'locale')
    const messages = toRef(i18n.global, 'messages')

    return () => {
      return (
        <el-config-provider locale={messages.value[locale.value] ?? zhCn}>
          <router-view></router-view>
        </el-config-provider>
      )
    }
  },
})
