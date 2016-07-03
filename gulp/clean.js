'use strict';

var del = require('del');
var gutil = require('gulp-util');

function run(done) {
    del([
      './dist/**/*.*', '!./dist',
      './fonts/**/*.*', '!./fonts'
      //'./src/**/*.js', './src/**/*.js.map' // cater for visual studio generating unwanted files on build
    ], { force: true })
    .then(function (paths) {
        gutil.log('Deleted files/folders:\n', paths.join('\n'));
        done();
    })
    .catch(function (error) {
        gutil.log('Problem deleting:\n', error);
        done();
    });
}

module.exports = {
    run: function (done) { return run(done); }
};
