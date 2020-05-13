const path = require('path')
const { version } = require('./package');

const ignore = ['**/__tests__/**', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts']

module.exports = {
  title: 'MDwalks-UI Style Guide',
  require: [
    path.resolve(__dirname, 'src/assets/styles/reset.css'),
    path.resolve(__dirname, 'src/assets/styles/spoqaHansans.css'),
  ],
  components: [
    'src/assets/styles/font.js',
    'src/components/**/*.{js,jsx,ts,tsx}',
  ],
  moduleAliases: {
    '@src': path.resolve(__dirname, 'src'),
    '@Components': path.resolve(__dirname, 'src/components'),
    '@Charts': path.resolve(__dirname, 'src/components/charts'),
    '@Cards': path.resolve(__dirname, 'src/components/card'),
  },
  version,
  ignore: ignore.concat([
    'src/components/table/THead.js',
    'src/components/table/TBody.js',
    'src/components/table/TFoot.js',
    'src/components/table/Columns.js',
    'src/components/toast/ToastList.js',
    'src/components/list/Item.js',
    'src/components/button/utility.js',
    'src/components/pagination/Input.js',
    'src/components/toast/ToastCtr.js',

    'src/components/notifications/index.js',
    'src/components/notifications/NotificationContainer.js',
    'src/components/notifications/NotificationManager.js',
    'src/components/notifications/Notifications.js',
    'src/components/charts/cartesian/*.js',
  ]),
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css',
        },
      ],
    },
  },
  theme: {
    fontFamily: {
      base: '"Spoqa Han Sans", sans-serif',
    },
  },
  styleguideDir: 'docs',
}
