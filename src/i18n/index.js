import en from './en'
import zh from './zh'
import store from '@/store'
import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

const messages = {
  en: {
    ...en,
    ...enLocale,
  },
  zh: {
    ...zh,
    ...zhLocale,
  },
}

const i18n = createI18n({
  locale: () => store.getters['settings/language'] || 'zh',
  fallbackLocale: 'en',
  messages,
})

export default i18n
