/*
 * @Description: ESLint 配置
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-recommended','plugin:@typescript-eslint/recommended',"plugin:prettier/recommended", '@vue/prettier', 'eslint:recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'vue/no-mutating-props': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/interface-name-prefixed': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    "no-unused-expressions": "off",
    'vue/no-v-html': 'off',
    'vue/require-default-prop':'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/order-in-components': [
      'warn',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'fetch',
          'asyncData',
          'data',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }
    ],
    'vue/attributes-order': [
      'warn',
      {
        order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT'],
        alphabetical: true
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // AMD & ESM
    '@typescript-eslint/no-var-requires': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-module-boundary-types": ["error"]
      }
    }
  ]
}
