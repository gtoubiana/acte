var concat = require('gulp-concat');
var config = require('../config');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var sequence = require('gulp-sequence');
var wrap = require('gulp-wrap');

// Lazypipes
var lazyLint = lazypipe()
  .pipe(eslint)
  .pipe(eslint.format)
  .pipe(eslint.failAfterError);

gulp.task('specifications', sequence(

  // Générer des specs pour Node et le navigateur
  'specifications.tests'

));

// Générer les Specs utilisés par jasmine dans le browser
gulp.task('specifications', function () {
  'use strict';
  return gulp.src([config.paths.test + '/*.js'])
    .pipe(concat('acteSpec.js'))
    .pipe(lazyLint())
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
