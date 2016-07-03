'use strict';

var gulp = require('gulp');
var cache = require('gulp-cached');

var targets = [
  { description: 'font-awesome-fonts', src: './node_modules/font-awesome/fonts/**/*.*', dest: './dist/fonts' },
  { description: 'bootstrap-fonts', src: './node_modules/bootstrap-less/fonts/**/*.*', dest: './dist/fonts' },
  { description: 'images', src: './src/images/**/*.*', dest: './dist/images' },
  { description: 'templates', src: './src/templates/**/*.html', dest: './dist/templates' }
];

function copy(options) {
  function run(target) {
    gulp.src(target.src)
      .pipe(cache(target.description))
      .pipe(gulp.dest(target.dest));
  }

  function watch(target) {
    gulp.watch(target.src, function() { run(target); });
  }

  targets.forEach(run);

  if (options.shouldWatch) {
    targets.forEach(watch);
  }
}

module.exports = {
  build: function() { return copy({ shouldWatch: false }); },
  watch: function() { return copy({ shouldWatch: true }); }
};
