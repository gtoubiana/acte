module.exports = function karma(config) {
  // Check out https://saucelabs.com/platforms
  var customLaunchers = {
    sl_safari_osx: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11',
      version: 'latest'
    },
    sl_chrome_osx: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'OS X 10.11',
      version: 'latest'
    },
    sl_firefox_osx: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'OS X 10.11',
      version: 'latest'
    },
    sl_edge_win: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10',
      version: 'latest'
    },
    sl_ie11_win: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '11',
      platform: 'Windows 8.1'
    },
    sl_ie10_win: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10',
      platform: 'Windows 8'
    },
    sl_ie9_win: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '9',
      platform: 'Windows 7'
    },
    sl_chrome_win: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 10',
      version: 'latest'
    },
    sl_firefox_win: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Windows 10',
      version: 'latest'
    },
    sl_iphone_osx: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.10',
      version: 'latest'
    },
    sl_chrome_linux: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Linux',
      version: 'latest'
    },
    sl_firefox_linux: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Linux',
      version: 'latest'
    },
    sl_android_linux: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      deviceName: 'Android Emulator',
      version: 'latest',
      deviceType: 'phone'
    },
    sl_ie8_win: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '8',
      platform: 'Windows 7'
    }
  };
  var sauceLabs;
  var concurrency;

  // Use ENV vars on Travis and sauce.json locally
  if (process.env.TRAVIS) {
    sauceLabs = {
      testName: '[Travis ' + process.env.TRAVIS_BUILD_NUMBER +
        '] Karma Tests of Acte',
      startConnect: false,
      recordVideo: false,
      recordScreenshots: false,
      build: process.env.TRAVIS_BUILD_NUMBER,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      public: 'public'
    };
    concurrency = 'Infinity';
  } else {
    sauceLabs = {
      testName: '[Local] Karma Tests of Acte',
      startConnect: true,
      recordVideo: false,
      recordScreenshots: false,

      // Variables d'environnement obligatoires (#90)
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      public: 'public'
    };
    concurrency = 1;
  }

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      '../../dist/acte.js',
      '../jasmine/lib/acteSpec.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'saucelabs'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever
    // any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/
    // karma-launcher
    // browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS', 'Opera'],
    browsers: Object.keys(customLaunchers),

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous (Infinity, 1-10)
    concurrency: concurrency,

    // Launcher config : https://github.com/karma-runner/karma-sauce-launcher
    sauceLabs: sauceLabs,
    customLaunchers: customLaunchers,
    captureTimeout: 240000
  });
};
