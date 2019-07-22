const path = require('path')
const custom = require('../webpack.config.js')
  
module.exports = async ({ config, mode }) => {
  config.resolve.alias['@Charts'] = path.resolve(__dirname, '../src/components/charts')
  return {...config, module: { ...config.module, rules: custom.module.rules}}
}