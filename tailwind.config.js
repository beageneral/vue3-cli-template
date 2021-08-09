'use strict'

module.exports = {
  // 以下规则未被匹配的样式都被剔除
  purge: {
    // enabled: true,
    // 用到 tailwind 的文件
    content: ['./src/**/*.{vue,js,html}'],
  },
  darkMode: false,
  theme: {},
  variants: {},
  plugins: [],
}
