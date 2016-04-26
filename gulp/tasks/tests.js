/** TACHES PRINCIPALES DU FICHIER :
 * gulp tests.specs
 * gulp tests.jasmine
 * gulp tests.karma
 * gulp tests.saucelabs
 * gulp tests.coverage
 */
var config = require('../config');
var coveralls = require('gulp-coveralls');
var gulp = require('gulp');

// var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var jasmineNode = require('gulp-jasmine');
var Server = require('karma').Server;
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var wrap = require('gulp-wrap');

// Générer les Specs utilisés par jasmine dans le browser
gulp.task('tests.specs', function () {
  'use strict';
  return gulp.src([config.paths.test + '/*.js'])
    .pipe(concat('acteSpec.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest(config.paths.jasmine + '/lib/'))
    .on('end', function () {
      // Copier les librairies jasmine dans ./dist/test/lib
      return gulp.src(config.paths.jasmineCore + '/*.{css,js}')
        .pipe(gulp.dest(config.paths.jasmine + '/lib/'))
        .on('end', function () {
          // Générer les Specs utilisés par jasmine dans node
          return gulp.src([config.paths.jasmine + '/lib/acteSpec.js'])
            .pipe(wrap(
              'var acte = require(\'' + config.paths.scriptRequire +
              '\');\n<%= contents %>\n'
            ))
            .pipe(gulp.dest(config.paths.jasmine));
        });
    });
});

// Effectuer les tests dans Node avec Jasmine
gulp.task('tests.jasmine', function () {
  'use strict';

  return gulp.src([config.paths.jasmine + '/acteSpec.js'])
        .pipe(jasmineNode());
});

// Effectuer les tests avec Karma
gulp.task('tests.karma', function (done) {
  new Server({
    configFile: __dirname + '/../../test/karma/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Effectuer les tests dans SauceLabs avec Karma
gulp.task('tests.saucelabs', function (done) {
  new Server({
    configFile: __dirname + '/../../test/karma/karma.conf-ci.js',
    singleRun: true
  }, done).start();
});

gulp.task('tests.coverage', function () {
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
          if (process.env.TRAVIS) {
            gutil.log('lcov sent to Coveralls...');
            gulp.src([config.paths.coverage + '/lcov.info'])
              .pipe(coveralls());
          } else {
            gutil.log('lcov not sent to Coveralls...');
          }

          // return gulp.src([config.paths.coverage + '/lcov.info'])
          //   .pipe(gulpIf(!!process.env.TRAVIS, coveralls()))
          //   .on('end', done);
        });
    });
});
