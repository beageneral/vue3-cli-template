# vue3-cli-template

## TODO LIST
- [ ] Gitlab Static Pages

## 启动和打包

> node 环境必须大于 12

| 环境         | 命令               |
| ------------ | ------------------ |
| 开发环境启动 | yarn serve         |
| 测试环境启动 | yarn debug         |
| 生产环境启动 | yarn watch         |
| 打包测试环境 | yarn build:develop |
| 打包灰度环境 | yarn build:canary  |
| 打包生产环境 | yarn build:master  |

<hr>

## 插件和类库

### element-plus

vue3 的 UI 库，目前仍然是高频更新迭代。

且经常性有破坏性更新。需要经常去更新并解决问题。

### @vue/babel-plugin-jsx

项目中使用了 `tsx`

### storybook

涉及到安装 `css-loader, style-loader, postcss-loader, sass-loader` ，遇到跑不起来的问题，多半是依赖的版本问题。

可通过 `npm view xxx versions` 查看该依赖发布的版本，然后对其进行降级处理， `npm i xxx@^n -D`。

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

### 优化方案

- svgo，压缩 svg 文件，效率比大概为 50%
- uglifyjs-webpack-plugin，混淆代码

### 工具脚本

- webpackbar，项目构建进度交互
