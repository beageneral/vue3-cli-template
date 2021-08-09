module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-prettier'],
  ignoreFiles: ["**/*.js"],
  rules: {
    // NOTE 解决 tailwind 校验，配合 vsocde 插件 => stylelint + tailwind css intellisense
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          'mixin', 'extend', 'content', 'include', 'for', 'function', 'return', "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
}
