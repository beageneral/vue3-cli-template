const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-postcss'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      resolve: {
        alias: {
          vue: 'vue/dist/vue.esm-bundler.js',
          '@': path.resolve(__dirname, '../src'),
        },
      },
    })

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: {
                tailwindcss: {},
                autoprefixer: {},
              },
            },
          },
        },
        'sass-loader',
      ],
      include: path.resolve(__dirname, '../'),
    })

    return config
  },
}
