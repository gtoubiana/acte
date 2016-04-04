var concat = require('gulp-concat');
var config = require('../config');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var sequence = require('gulp-sequence');
var wrap = require('gulp-wrap');
var Server = require('karma').Server;

// Lazypipes
var lazyLint = lazypipe()
  .pipe(eslint)
  .pipe(eslint.format)
  .pipe(eslint.failAfterError);

gulp.task('specifications', sequence(

  // Générer des specs pour le navigateur
  'specifications.tests',

  // Copie des sources Jasmine
  'specifications.lib',

  // Générer des specs pour Node.js
  'specifications.node'

  // Tester les specs avec Karma dans Sauce Labs
  // 'specifications.karma'
));

// TASK Pour générer les Specs utilisés par jasmine dans le browser
gulp.task('specifications.tests', function () {
  'use strict';
  return gulp.src([config.paths.test + '/*.js'])
    .pipe(concat('acteSpec.js'))
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.jasmine + '/lib/'));
});

// TASK Pour copier les librairies jasmine dans ./dist/test/lib
gulp.task('specifications.lib', function () {
  'use strict';
  return gulp.src(config.paths.jasmineCore + '/*.{css,js}')
    .pipe(gulp.dest(config.paths.jasmine + '/lib/'));
});

// TASK Pour générer les Specs utilisés par jasmine dans node
gulp.task('specifications.node', function () {
  'use strict';
  return gulp.src([config.paths.jasmine + '/lib/acteSpec.js'])
    .pipe(wrap(
      'var acte = require(\'' + config.paths.scriptRequire +
      '\')\n<%= contents %>\n'
    ))
    .pipe(gulp.dest(config.paths.jasmine));
});

// TASK Pour effectuer les tests avec Karma //
gulp.task('specifications.karma', function (done) {
  new Server({
    configFile: __dirname + '/../karma.conf-ci.js',
    singleRun: true
  }, done).start();
});
