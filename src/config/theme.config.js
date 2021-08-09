/*
 * @Author: wujy
 * @Date: 2021-01-14 19:43:33
 * @LastEditTime: 2021-08-09 14:31:33
 * @Description: 主题配置
 */

module.exports = {
  // 布局模式
  layout: 'vertical',
  // 冻结 Header 置顶
  fixedHeader: true,
  // 显示标签页时标签页样式：卡片风格 card、灵动风格 smart、圆滑风格 smooth
  tabsBarStyle: 'card',
  menuTitle: 'vue3-cli-templatye',
  // insight 链接
  insightLink: '/manage',
  // 退出链接
  logout: '/manage/auth/logout',
  // 菜单 logo
  logo: 'https://user-images.githubusercontent.com/33750626/128667660-b3617df0-a30e-4927-91d2-654dda0d1e4b.png',
  // 默认游客头像
  // 主题名称：default
  themeName: 'default',
  // 版权信息
  copyright: `Copyright © 2000-${new Date().getFullYear()} DXY All Rights Reserved. 浙B2-20070219（含BBS）版本：${process.env.VUE_APP_VERSION}`,
  // 是否只保持一个子菜单的展开
  uniqueOpened: false,
  // 默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOpeneds: ['/'],
  // 分栏布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单
  openFirstMenu: true,
  // 显示 tabs 组件
  showTabs: false,
  // 是否标签页图标
  showTabsBarIcon: true,
  // 是否开启顶部进度条
  showProgressBar: true,
  // 是否开启语言选择组件
  showLanguage: true,
  // 是否开启刷新组件
  showRefresh: true,
  // 是否开启搜索组件
  showSearch: false,
  // 是否开启主题组件
  showTheme: false,
  // 是否开启通知组件
  showNotice: false,
  // 是否开启全屏组件
  showFullScreen: false,
  // 是否开启右侧悬浮窗
  showThemeSetting: false,
  // 版本更新记录
  versionChangeLog: [
    `
    迭代版本：1.8.0<br>
    更新时间：2021-08-06<br>
    更新内容：<br>
    【迭代】SKU/SPU/账号管理列表新增字段；<br>
    【功能】国际化整合；<br>
    `,
    `
    迭代版本：1.7.0<br>
    更新时间：2021-07-21<br>
    更新内容：<br>
    【迭代】SKU、通用名、部分字段更新；<br>
    【新增】账号管理模块；<br>
    【新增】合理用药模块; <br>
    `,
  ],
}
