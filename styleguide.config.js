const path = require('path')
const { version } = require('./package');

const ignore = ['**/__tests__/**', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts']

module.exports = {
  require: [path.resolve(__dirname, 'src/assets/styles/reset.css')],
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
    'src/components/toast/ToastList.js',
    'src/components/list/Item.js',
    'src/components/button/utility.js',
    'src/components/pagination/Input.js',
    'src/components/toast/ToastCtr.js',
  ]),
  styleguideDir: 'docs',
}
