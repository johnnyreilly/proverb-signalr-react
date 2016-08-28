/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

var path = require('path');
var webpack = require('webpack');
var packageJson = require('./package.json');

module.exports = {
  cache: true,
  entry: {
    main: './src/app/main.ts',

    // common dependencies bundled together packaged with CommonsChunkPlugin in gulp/webpack.js
    vendor: [
      'babel-polyfill',
      'jquery',
      'angular',
      'angular-animate',
      'angular-ui-bootstrap',
      'angular-ui-router'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015!ts-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'raw'
    }]
  },
  plugins: [ // Check gulp/webpack.js for build specific plugins
      new webpack.ProvidePlugin({
          "window.jQuery": "jquery",
          "jQuery": "jquery",
          "$": "jquery"
      })
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.ts', '.tsx', '.js']
  },
};
