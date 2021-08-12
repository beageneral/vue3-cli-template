const Webpack = require('webpack')
const WebpackBar = require('webpackbar')
const dayjs = require('dayjs')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const pkg = require('./package.json')

// 输出版本
process.env.VUE_APP_VERSION = pkg.version

// 生产版本
const IS_PROD = ['production'].includes(process.env.NODE_ENV)
const IS_DEV = ['mock'].includes(process.env.NODE_ENV)
const resolve = (dir) => path.join(__dirname, dir)
const dateTime = dayjs().format('YYYY-M-D HH:mm:ss')
const {
  publicPath,
  outputDir,
  assetsDir,
  lintOnSave,
  runtimeCompiler,
  productionSourceMap,
  transpileDependencies,
  providePlugin,
  filenameHashing,
  buildGzip,
  productionGzipExtensions,
  build7z,
  productConsole,
  cssExtract,
  devPort,
  webpackBarName,
  webpackBanner,
  abbreviation,
  menuTitle,
} = require('./src/config')

// 设置 index.html 文本
process.env.VUE_APP_TITLE = menuTitle

module.exports = {
  publicPath,
  outputDir,
  assetsDir,
  lintOnSave,
  runtimeCompiler,
  productionSourceMap,
  filenameHashing,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/mock': {
        target: `https://xxx`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/mock']: '',
        },
      },
    },
  },
  configureWebpack() {
    const plugins = [
      new Webpack.ProvidePlugin(providePlugin),
      new WebpackBar({
        name: webpackBarName,
      }),
    ]

    // 生产构建用的插件
    if (IS_PROD && !productConsole) {
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // 必须注释，否则 2.2 版本会将 dist 目录下的文件页进行编译然后报错
              // warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], //移除console
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    }

    return {
      resolve: {
        alias: {
          '~': resolve('.'),
          '@': resolve('src'),
          '@common': resolve('src/logic/common'),
          '@utils': resolve('src/assets/utils'),
        },
      },
      plugins,
    }
  },
  chainWebpack(config) {
    // webpack 会默认给 commonChunk 打进 chunk-vendors
    // 所以需要对 webpack 的配置进行 delete
    // 搭配下面 chunk-common 的拆分
    config.optimization.delete('splitChunks')
    // 修复 HMR
    config.resolve.symlinks(true)

    // HACK vue3.2 实验特性，$ref | $computed
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          refSugar: true,
        }
      })

    // svg 处理
    // 在已有的svg loader配置中 排除掉对 assets/icons 里 svg 进行转换
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons/svg')) // 排除掉src/icons目录
      .end()

    // svg icon工作原理 https://segmentfault.com/a/1190000015367490
    // 配置 svg-sprite-loader
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg')) // 指定src/icons要处理svg的文件目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader') // 用svg-sprite-loader解析
      .options({
        symbolId: 'icon-[name]', // symbol id命名格式 icon-图标名称
      })
      .end()

    // 开发
    config.when(IS_DEV, (config) => {
      config.devtool('source-map')
      filenameHashing && config.output.filename('[name].[hash:6].js').end()
    })

    // 生产
    // webpack 默认根据 NODE_ENV === ‘production’ 判断生产环境
    config.when(IS_PROD, (config) => {
      // 关闭 webpack 提示
      config.performance.set('hints', false)
      // 关闭 sourceMap
      config.devtool('none')

      // 分包
      config.optimization.splitChunks({
        automaticNameDelimiter: '-',
        chunks: 'all',
        cacheGroups: {
          chunk: {
            name: 'chunk',
            test: /[\\/]node_modules[\\/]/,
            minSize: 131072,
            maxSize: 524288,
            chunks: 'async',
            minChunks: 2,
            priority: 10,
          },
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/](vue(.*)|core-js)[\\/]/,
            chunks: 'initial',
            priority: 20,
          },
          elementPlus: {
            name: 'element-plus',
            test: /[\\/]node_modules[\\/]element-plus(.*)[\\/]/,
            priority: 30,
          },
          utils: {
            name: 'utils',
            test: resolve('src/assets/utils'),
            priority: 40,
          },
        },
      })
      config.plugin('banner').use(Webpack.BannerPlugin, [`${webpackBanner}${dateTime}`])

      // gzip 压缩, 版本 ^6.1.1
      if (buildGzip) {
        config.plugin('compression').use(CompressionWebpackPlugin, [
          {
            filename: '[path][base].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 8192,
            minRatio: 0.8,
          },
        ])
      }

      // 7z 压缩, 版本 ^3.1.1
      if (build7z) {
        config.plugin('fileManager').use(FileManagerPlugin, [
          {
            events: {
              onEnd: {
                archive: [
                  {
                    source: `./${outputDir}`,
                    destination: `./${outputDir}/${abbreviation}_${dayjs().unix()}.zip`,
                  },
                ],
              },
            },
          },
        ])
      }
    })
  },

  css: {
    extract: cssExtract,
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (relativePath.replace(/\\/g, '/') !== 'src/assets/scss/variables/variables.scss')
            return '@use "sass:math";@import "~@/assets/scss/variables/variables.scss";' + content
          return content
        },
      },
    },
  },
}
