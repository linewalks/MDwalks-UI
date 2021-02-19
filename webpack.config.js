const sass = require('node-sass')
const path = require('path')

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
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(svg)(\?.*)?$/,
        loader: 'file-loader',
        query: { name: 'static/media/[name].[hash:8].[ext]' },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.ts', '.tsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components/'),
      '@Charts': path.resolve(__dirname, 'src/components/charts/'),
      '@Cards': path.resolve(__dirname, 'src/components/card'),
      '@Styles': path.resolve(__dirname, 'src/assets/styles/'),
      '@Table': path.resolve(__dirname, 'src/components/table/'),
    },
  },
}
