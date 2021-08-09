/*
 * @Description: 配置信息
 */
import { getLocalStorage } from '@utils/storage'
import {
  layout,
  fixedHeader,
  showTabs,
  showProgressBar,
  themeName,
  tabsBarStyle,
  showTabsBarIcon,
  showRefresh,
  logo,
  menuTitle,
  showLanguage,
  i18n,
} from '@/config'

let defaultTheme = {
  layout,
  fixedHeader,
  showTabs,
  showProgressBar,
  themeName,
  tabsBarStyle,
  showTabsBarIcon,
  showRefresh,
  showLanguage,
}

const { collapse } = getLocalStorage('collapse')
const { language } = getLocalStorage('language')

const state = () => ({
  logo,
  menuTitle,
  device: 'desktop', // [desktop 桌面端 | mobile 移动端]
  collapse: collapse || false, // 侧边栏是否收缩
  language: language || i18n,
  theme: getLocalStorage('theme') || { ...defaultTheme }, // 主题配置信息
  extra: { first: '', transferRouteName: '' },
})

const getters = {
  logo: (state) => state.logo,
  menuTitle: (state) => state.menuTitle,
  device: (state) => state.device,
  collapse: (state) => state.collapse,
  language: (state) => state.language,
  theme: (state) => state.theme,
  extra: (state) => state.extra,
}

const mutations = {
  openSideBar(state) {
    state.collapse = false
  },
  foldSideBar(state) {
    state.collapse = true
  },
  toggleDevice(state, device) {
    state.device = device
  },
  toggleCollapse(state) {
    state.collapse = !state.collapse
    localStorage.setItem('collapse', `{"collapse":${state.collapse}}`)
  },
  changeLanguage(state, language) {
    state.language = language
    localStorage.setItem('language', `{"language":"${language}"}`)
  },
  saveTheme(state) {
    localStorage.setItem('theme', JSON.stringify(state.theme))
  },
  resetTheme(state) {
    // 缓存主题配置，并补充 body 上的样式类
    state.theme = { ...defaultTheme }
    localStorage.removeItem('theme')
    document.getElementsByTagName('body')[0].className = `layout-theme-${state.theme.themeName}`
  },
}

const actions = {
  openSideBar({ commit }) {
    commit('openSideBar')
  },
  foldSideBar({ commit }) {
    commit('foldSideBar')
  },
  toggleDevice({ commit }, device) {
    commit('toggleDevice', device)
  },
  toggleCollapse({ commit }) {
    commit('toggleCollapse')
  },
  changeLanguage: ({ commit }, language) => {
    commit('changeLanguage', language)
  },
  saveTheme({ commit }) {
    commit('saveTheme')
  },
  resetTheme({ commit }) {
    commit('resetTheme')
  },
}

export default { state, getters, mutations, actions }
