// Karma configuration
// Generated on Thu Jul 16 2015 21:14:44 GMT+0100 (GMT Summer Time)

module.exports = function(config) {
  var gulpConfig = require("./gulpfile.config.js");
  var scripts = [].concat(
    gulpConfig.getBowerScriptsOrStyles('js'),
    'bower_components/angular-mocks/angular-mocks.js',
    gulpConfig.scripts.map(function(s) { return s.replace('.{ts,js.map,js}', '.js'); }),
    gulpConfig.tests);

  config.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: scripts,
    // files: ['src/hello.js', 'tests/hello.specs.js' ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'junit'],

/*
https://www.npmjs.com/package/karma-junit-reporter
*/

    // the default configuration
    junitReporter: {
      outputDir: 'test-results', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: ''
    },

    // enable / disable colors in the output (reporters and logs)
    //colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    //autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [/*'Chrome',*/ 'PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
