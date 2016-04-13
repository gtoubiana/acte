/** TACHES PRINCIPALES DU FICHIER :
 * gulp certifications
 */
var config = require('../config');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var prettify = require('gulp-jsbeautifier');
var sequence = require('gulp-sequence');
var lazyLint = lazypipe()
  .pipe(eslint)
  .pipe(eslint.format)
  .pipe(eslint.failAfterError);

gulp.task('certifications', sequence(

    // Certification eslint airbnb/legacy du script acte.js
    'certifications.script'

));

// TASK Pour valider les scripts ./
gulp.task('certifications.script', function () {
  'use strict';
  return gulp.src([config.paths.dist + '/acte.js'])
    .pipe(prettify({
      config: config.paths.dist + '/.jsbeautifyrc'
    }))
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.dist));
});
