/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    main: './src/main.tsx',
    vendor: [
      'babel-polyfill',
      'jquery',
      'moment',
      'fbemitter',
      'flux',
      'react',
      'react-dom',
      'react-bootstrap',
      'react-router',
      'react-router-bootstrap',
      'signalr',
      'toastr'
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
      loader: 'babel-loader?presets[]=es2016&presets[]=es2015&presets[]=react!ts-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2016', 'es2015', 'react']
      }
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
