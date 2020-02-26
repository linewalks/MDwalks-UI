const path = require('path')
const { version } = require('./package');

module.exports = {
  require: [path.resolve(__dirname, 'src/assets/styles/reset.css')],
  moduleAliases: {
    '@src': path.resolve(__dirname, 'src'),
    '@Components': path.resolve(__dirname, 'src/components'),
    '@Charts': path.resolve(__dirname, 'src/components/charts'),
    '@Cards': path.resolve(__dirname, 'src/components/card'),
  },
  version,
}
