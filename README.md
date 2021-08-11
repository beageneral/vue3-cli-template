# vue3-cli-template

## TODO LIST

- [x] Vue3 全家桶
- [x] Typescript & TSX
- [x] Element Plus
- [x] TailwindCSS
- [x] StoryBook
- [x] 国际化
- [x] Gitlab Static Pages

## 启动和打包

> node 环境必须大于 12

| 环境         | 命令               |
| ------------ | ------------------ |
| 开发环境启动 | yarn serve         |
| 测试环境启动 | yarn debug         |
| 生产环境启动 | yarn watch         |
| 打包测试环境 | yarn build:develop |
| 打包生产环境 | yarn build:master  |

<hr>

## 插件和类库

### element-plus

vue3 的 UI 库，目前仍然是高频更新迭代。

且经常性有破坏性更新。需要经常去更新并解决问题。

### @vue/babel-plugin-jsx

项目中使用了 `tsx`

### storybook

关于如何应用

- 可以参考官方文档，[StoryBook for Vue](https://storybook.js.org/docs/vue/writing-stories/introduction)
- 一些简单的梳理，[StoryBook Note 语雀](https://www.yuque.com/wujy/giv0be/gmyvwe)

### tailwindcss

一个潮流的 CSS 类库。只需要在 html 上写样式类名，样式就可以生效。相当于给你提供了一大堆已经命名好的样式类集合。

### vue-i18n

vue 项目的国际化解决方案。

### json-server

前端 Mock 和 RESTful API 解决方案

## 工程化

### 代码规范

- eslint 代码语法校验
- prettier 代码格式化
- stylelint 样式代码格式化

### CI

- commitlint 代码提交规范
- commitizen 代码提交可视化交互, `yarn commit`
- standard-version 版本号规范 + changelog
- husky + lint-staged， 用于 git hooks

### CD

- [Gitlab Static Pages](https://xxxx/vue3-cli-template/storybook-static)

### 工具脚本

- webpackbar，项目构建进度交互

### 配套 vscode 插件

- volar，vue3 专用插件
- Tailwind CSS IntelliSense，TailwindCSS 模板语法提示

## 项目设计

### 基建配置化

基于 `config` 目录，针对 `开发`、`主题&布局`、`调试`、`构建` 等内容的配置化。

### 多主题兼容

TODO...

### 请求库封装

- 拦截器分治思想
- error code 优先级理念
  TODO... `abort 中断机制`, `基于 node 的接口缓存`, `refresh token 二次刷新机制`，`接口防重设计`

### 权限路由设计

TODO...

### 项目组织分层理念

- Logic 视图/逻辑分离设计
- assets 静态资源目录
- public 未编译静态目录
- 项目级、模块级和页面级组件 components 分治理念
- 关于 plugins、utils、vendors 的区分设计
- 基础样式的应用， 页面级的样式类 `*-container` 限定
- TODO...

### 优化方案

- svgo，压缩 svg 文件，效率比大概为 50%
- 图片、图标及各字体类型的不同压缩方案
- uglifyjs-webpack-plugin，混淆代码
- 懒路由、组件按需加载
- gzip,7z 等文件压缩，提升上传、下载速度
- TODO...

## QA

### 使用 `<script setup>` 默认注入的一些 API，被 eslint 报错未定义怎么办？

> https://eslint.vuejs.org/user-guide/#faq
> 通过 eslint 的配置文件进行全局声明，

```js
module.exports = {
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
```
