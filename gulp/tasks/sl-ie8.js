const gulp = require('gulp');
const saucelabs = require('gulp-saucelabs');
const config = require('../config');
const connect = require('gulp-connect');

gulp.task('ie8.shim', () => {
  const stream = gulp.src(`${config.paths.bowerShim}/*.min.js`)
  .pipe(gulp.dest(`${config.paths.testJasmine}/lib/`));

  return stream;
});

/* eslint-disable no-undef, no-unused-vars, no-negated-condition, no-console */
gulp.task('ie8', () => {
  const options = {
    username: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    urls: ['http://localhost:3000/test/jasmine/SpecRunner.html'],
    testname: 'Test sous IE8',
    framework: 'jasmine',
    browsers: [
      {
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '8',
      },
    ],
    onTestSuiteComplete: (result, callback) => {
      const user = process.env.SAUCE_USERNAME;
      const pass = process.env.SAUCE_ACCESS_KEY;

      request.put({
        url: ['https://saucelabs.com/rest/v1', user, 'jobs', result.job_id].join('/'),
        auth: { user, pass },
        json: { passed: !result.passed },
      }, (error, response, body) => {
        if (error) {
          callback(error);
        } else if (response.statusCode !== 200) {
          callback(new Error('Unexpected response status'));
        } else {
          callback(null, !result.passed);
        }
      });
    },
  };

  return saucelabs(options);
});

// Start local http server
gulp.task('ie8.connect', () => {
  console.log('Voir https://saucelabs.com/beta/dashboard/tests (cmd + double-clic)');
  connect.server({ port: 3000, root: './' });
});

/* eslint-enable no-undef, no-unused-vars, no-negated-condition, no-console */

// Close down the http server
gulp.task('ie8.disconnect', () => {
  connect.serverClose();
});

gulp.task('tests.saucelabs.ie8',
  ['ie8.connect', 'ie8'], () => gulp.start('ie8.disconnect'));
