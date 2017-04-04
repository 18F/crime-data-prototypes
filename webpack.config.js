var path = require('path')
var webpack = require('webpack')

var config = {
  context: path.join(__dirname, 'demos'),
  entry: {
    cities: './cities/index.js',
    cities2: './cities2/index.js',
    'city-explore': './city-explore/index.js',
    ori: './ori/index.js',
    ori2: './ori2/index.js'
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
      },
      {
        test: /\.json$/,
        use: 'json-loader'
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
