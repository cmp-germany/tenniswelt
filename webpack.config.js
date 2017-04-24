var path = require('path');
var webpack = require('webpack');


module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    'navigation': './js/navigation.js',
    'messages': './js/messages.js'
  },
  output: {
    path: './js',
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor.bundle.js")
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: [],
        }
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'json'
      },
      { test: /\.js$/, loader: 'exports-loader' }
    ]
  },
  devtool: 'eval-source-map'
};
