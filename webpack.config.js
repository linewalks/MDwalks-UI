const path = require('path');
const sass = require('node-sass')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
        ],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.(svg)(\?.*)?$/,
        loader: 'file-loader',
        query: { name: 'static/media/[name].[hash:8].[ext]' },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: sass,
            },
          },
        ],
      },
    ],
  },
};
