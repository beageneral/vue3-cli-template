const { copyright } = require('./setting.config')

const cliEnv = process.env.VUE_APP_ENV
const buildEnv = process.env.NODE_ENV

const domainPrefix = 'https://xxx.com/xxx'

module.exports = {
  devPort: 6366,
  // 打包部署后的环境上下文
  // hash 模式下，一般是用 "", 或用 "/二级目录/"
  // history 模式下，一般是 "/", 或 "/二级目录/"
  publicPath:
    cliEnv === 'mock' || buildEnv === 'development'
      ? '/'
      : `${domainPrefix}${
          {
            development: '_develop',
            canary: '_canary',
            production: '',
          }[cliEnv]
        }/dist/`,
  // 生产环境构建文件的目录名
  outputDir: 'dist',
  // 相对于 outputDir
  assetsDir: '',
  // 开发环境每次保存时是否输出为 eslint 编译警告
  lintOnSave: false,
  // 支持 vue 实例写 template 选项, 会多 10kb(没用到 jsx 基本用不到)
  runtimeCompiler: false,
  // 生产环境 sourceMap，关闭增加打包构建速度
  productionSourceMap: false,
  // 默认会在生产打包后的静态文件上增加 hash 以控制缓存
  // (要求 index.html 是 vue-cli 创建的)
  filenameHashing: true,
  // 在 node_modules 中且需要被 babel 编译的依赖
  transpileDependencies: [],
  // 需要自动注入并加载的模块
  providePlugin: {},
  // 生产环境打包是否自动生成 7z 压缩包(整个项目生成一个7z)
  build7z: false,
  // 生产环境打包是否生成 gzip
  // request 包含字段Accept-Encoding: gzip代表浏览器支持gzip压缩文件
  // response 包含字段Content-Encoding: gzip代表返回的是压缩文件
  buildGzip: true,
  // 需要压缩 gzip 的文件格式
  // 图片 jpg(jpeg)、png、gif、webp 已经内优化，无需多处理
  // 字体 eot、woff、woff2(base64)、ttf、svg 中只需压缩 eot ttf
  productionGzipExtensions: ['html', 'js', 'css', 'svg', 'eot', 'ttf'],
  // 是否强制提取 css 为单独的文件（生产模式默认开启）
  // 开发模式一般不开启，因为跟个 CSS 热重载冲突
  // 开发组件库的时候不建议开启，不然用户得单独引入 CSS 文件
  cssExtract: buildEnv === 'production',
  // 生产环境下是否保留 console.log
  productConsole: false,
  // 浏览器版权信息，给源码文件增加注释
  webpackBanner: ` build: vue3-cli-template \n ${copyright} \n time: `,
  // 打包构建进度
  webpackBarName: 'vue3-cli-template',
  // 缩写
  abbreviation: 'vue3-cli-template',
}
