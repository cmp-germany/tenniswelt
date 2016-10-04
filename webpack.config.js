var path = require('path');
var webpack = require('webpack');


module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    './js/navigation.js'
  ],
  output: {
    path: './js',
    filename: 'navigation.bundle.js'
  },
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
      }
    ]
  }
};
