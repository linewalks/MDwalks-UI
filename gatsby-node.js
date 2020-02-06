const path = require('path')

exports.onCreateWebpackConfig = (args) => {
  args.actions.setWebpackConfig({
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, '../src/'),
        '@Components': path.resolve(__dirname, '../src/components'),
        '@Charts': path.resolve(__dirname, '../src/components/charts'),
        '@Cards': path.resolve(__dirname, '../src/components/card'),
      },
    },
  })
}
