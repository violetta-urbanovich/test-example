// Karma configuration
// Generated on Tue Oct 18 2016 19:25:51 GMT+0300 (RTZ 2 (зима))

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'public/bower_components/jquery/dist/jquery.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/oclazyload/dist/ocLazyLoad.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/bower_components/angular-resource/angular-resource.js',
      'public/bower_components/angular-translate/angular-translate.js',
      'public/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'public/bower_components/angular-cookies/angular-cookies.js',
      'public/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'public/bower_components/angular-ui/build/angular-ui.js',
      'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
      'public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'public/bower_components/bootstrap/dist/css/bootstrap.css',
      'public/bower_components/bootstrap/dist/css/bootstrap-theme.css',
      'public/css/styles.css',
      'public/js/main/main.js',
      'public/js/resource.js',
      'public/js/main/*.js',
      'public/js/*.js',
      'tests/*.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};