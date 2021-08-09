import '../src/assets/scss/mixins.scss'
import '../src/assets/scss/variables/variables.scss'
import '../src/assets/css/tailwind.css'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
