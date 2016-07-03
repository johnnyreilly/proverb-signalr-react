'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var failPlugin = require('webpack-fail-plugin');
var webpackConfig = require('../webpack.config.js');
var packageJson = require('../package.json');

function getCommonChunks() {
  return new webpack.optimize.CommonsChunkPlugin({ names: commonChunks });
}

function buildProduction(done) {
    // modify some webpack config options
    var myProdConfig = Object.create(webpackConfig);
    myProdConfig.output.filename = '[name].[hash].js';

    myProdConfig.plugins = myProdConfig.plugins.concat(
      new webpack.DefinePlugin({
          __IN_DEBUG__: false,
          __VERSION__: JSON.stringify(packageJson.version + '.' + Date.now())
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[hash].js' }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      failPlugin
    );

    // run webpack
    webpack(myProdConfig, function (err, stats) {
        if (err) { throw new gutil.PluginError('webpack:build', err); }
        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));

        if (done) { done(); }
    });
}

function createDevCompiler() {
    // modify some webpack config options
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.devtool = 'inline-source-map';
    myDevConfig.debug = true;

    myDevConfig.plugins = myDevConfig.plugins.concat(
      new webpack.DefinePlugin({
          __IN_DEBUG__: true,
          __VERSION__: JSON.stringify(packageJson.version + '.' + Date.now())
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
      new WebpackNotifierPlugin({ title: 'Webpack build', excludeWarnings: true })
    );

    // create a single instance of the compiler to allow caching
    return webpack(myDevConfig);
}

function buildDevelopment(done, devCompiler) {
    // run webpack
    devCompiler.run(function (err, stats) {
        if (err) { throw new gutil.PluginError('webpack:build-dev', err); }
        gutil.log('[webpack:build-dev]', stats.toString({
            chunks: false,
            colors: true
        }));

        if (done) { done(); }
    });
}


function bundle(options) {
    var devCompiler;

    function build(done) {
        if (options.shouldWatch) {
            buildDevelopment(done, devCompiler);
        } else {
            buildProduction(done);
        }
    }

    if (options.shouldWatch) {
        devCompiler = createDevCompiler();

        gulp.watch('src/**/*', function () { build(); });
    }

    return new Promise(function (resolve, reject) {
        build(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve('webpack built');
            }
        });
    });
}

module.exports = {
    build: function () { return bundle({ shouldWatch: false }); },
    watch: function () { return bundle({ shouldWatch: true }); }
};
