const path = require('path')
const custom = require('../webpack.config.js')
  
module.exports = async ({ config, mode }) => {
  config.resolve.alias['@Charts'] = path.resolve(__dirname, '../src/components/charts')
  config.resolve.alias['@Data'] = path.resolve(__dirname, '../src/data')
  config.resolve.alias['@Card'] = path.resolve(__dirname, '../src/components/card')
  config.resolve.alias['@Table'] = path.resolve(__dirname, '../src/components/table')
  return {...config, module: { ...config.module, rules: custom.module.rules}}
}