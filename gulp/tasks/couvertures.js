var config = require('../config');
var coveralls = require('gulp-coveralls');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var istanbul = require('gulp-istanbul');
var jasmineNode = require('gulp-jasmine');
var sequence = require('gulp-sequence');

require('gulp-stats')(gulp);
require('gulp-util');

gulp.task('couvertures', sequence(

    // Coverage des Tests avec Istanbul et Coveralls
    'couvertures.coveralls'

));

gulp.task('couvertures.coveralls', function () {
  'use strict';

  // generation de la couverture
  return gulp.src([config.paths.dist + '/acte.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())

    // https://nodejs.org/api/stream.html
    .on('finish', function () {
      // generation du rapport de couverture
      gulp.src([config.paths.jasmine + '/acteSpec.js'])
        .pipe(jasmineNode())
        .pipe(istanbul.writeReports({
          dir: config.paths.coverage,

          // 'reporters': ['lcov', 'json', 'text-summary', 'text'],
          reporters: ['lcov', 'json', 'text-summary']
        }))
        .on('finish', function () {
          // Envoi des données à Coveralls depuis Travis
          return gulp.src([config.paths.coverage + '/lcov.info'])
            .pipe(gulpIf(!!process.env.TRAVIS, coveralls()));
        });
    });
});
