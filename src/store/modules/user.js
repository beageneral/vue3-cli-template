/*
 * @Description: 用户信息
 */

import { getToken, removeToken, setToken } from '@utils/token'
import { resetRouter } from '@/router'
import { loginNotificationTitle, tokenName, logo } from '@/config'
import { isArray, isString } from '@utils/validate'
import { ElMessage, ElNotification } from 'element-plus'
import { visitor_avatar } from '@/logic/common/images'

const state = () => ({
  token: getToken(),
  username: '访客',
  avatar: logo,
})
const getters = {
  token: (state) => state.token,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
}

const mutations = {
  // 设置 token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 设置用户名
  setUsername(state, username) {
    state.username = username
  },
  // 设置头像
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}

const actions = {
  // 设置虚拟角色
  setVirtualRoles({ commit, dispatch }) {
    dispatch('acl/setFull', true, { root: true })
    commit('setAvatar', visitor_avatar)
    commit('setUsername', 'Admin')
  },

  // 获取用户信息
  // 核心逻辑和接口请求
  getUserInfo({ state, commit, dispatch }) {
    // TODO const { data } = await getUserInfo()

    // HACK 用于替代上一行获取的数据
    const { username, avatar, roles, ability } = {
      username: '游客',
      avatar: state.avatar,
      roles: [],
      ability: [],
    }

    // 校验回传数据，若无，则用默认信息
    if ((username && !isString(username)) || (avatar && !isString(avatar)) || (roles && !isArray(roles)) || (ability && !isArray(ability))) {
      ElMessage.error({
        showClose: true,
        message: '「获取用户信息」核心接口异常，请检查返回 JSON 格式是否正确',
        duration: 3000,
      })
      return Promise.reject()
    }

    // 如不使用username用户名,可删除以下代码
    if (username) commit('setUsername', username)
    // 如不使用avatar头像,可删除以下代码
    if (avatar) commit('setAvatar', avatar)
    // 如不使用roles权限控制,可删除以下代码
    if (roles) dispatch('acl/setRole', roles, { root: true })
    // 如不使用ability权限控制,可删除以下代码
    if (ability) dispatch('acl/setAbility', ability, { root: true })
  },

  // 重置 token/roles/ability/router/tabsBar 等
  async resetAll({ commit, dispatch }) {
    commit('setUsername', '游客')
    commit('setAvatar', visitor_avatar)
    await dispatch('setToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setAbility', [], { root: true })
    await dispatch('tabs/delAllVisitedRoutes', [], { root: true })
    await resetRouter()
    removeToken()
  },

  // 设置 token
  setToken({ commit }, token) {
    commit('setToken', token)
  },

  // 设置头像
  setAvatar({ commit }, avatar) {
    commit('setAvatar', avatar)
  },

  // 登录：获取 token
  async login({ commit }, userInfo) {
    // TODO const data = await login(userInfo)
    const token = '' // TODO data[tokenName]

    if (token) {
      commit('setToken', token)
      const hour = new Date().getHours()
      const thisTime = hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好'
      ElNotification.success({
        title: `欢迎登录${loginNotificationTitle}`,
        message: `${thisTime}！`,
        position: 'top-right',
      })
    } else {
      ElMessage.error(`登录接口异常，未正确返回${tokenName}...`)
      return Promise.reject()
    }
  },

  // 登出
  async logout({ dispatch }) {
    // TODO 登出接口 await logout()
    await dispatch('resetAll')
  },
}

export default { state, getters, mutations, actions }
