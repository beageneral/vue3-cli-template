import App from './App'
import { createApp } from 'vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import setupSvg from '@/assets/icons'
import { setupGlobalPlugin } from '@/plugins'

import '@/assets/scss/index.scss'
import '@/assets/css/tailwind.css'

const app = createApp(App)
setupGlobalPlugin(app)
setupSvg(app)
setupStore(app)
setupRouter(app)
  .isReady()
  .then(() => app.mount('#app'))
