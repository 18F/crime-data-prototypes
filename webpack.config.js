var path = require('path')
var webpack = require('webpack')

var config = {
  context: path.join(__dirname, 'demos'),
  entry: {
    ori: './ori/index.js',
    test: './test/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/build'
  },
  devServer: {
    contentBase: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: []
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' } }),
    new webpack.optimize.UglifyJsPlugin()
  ])
}

module.exports = config
