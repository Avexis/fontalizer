var path = require('path');
var webpack = require('webpack');
var fs = require('fs');


var config = {
  entry: './script.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'script.js'
  },
  target: 'web',
  resolve: {
    extensions: [
      '.webpack.js',
      '.js',
      '.jsx'
    ]
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]

    }]
  }
}


module.exports = config;