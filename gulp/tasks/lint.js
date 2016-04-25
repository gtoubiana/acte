/** TACHES PRINCIPALES DU FICHIER :
 * gulp lint
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
var lazyPrettyLint = lazypipe()
  .pipe(prettify, {
    config: config.paths.src + '/.jsbeautifyrc'
  })
  .pipe(lazyLint);

gulp.task('lint', sequence(

  // Valider le gulpfile et les gulptasks
  'lint.gulp',

  // Valider les specs pour les tests
  'lint.specs',

  // Valider les constantes
  'lint.constants',

  // Valider les utilitaires
  'lint.functions',

  // Valider les classes
  'lint.constructors',
  'lint.prototypes'

));

// Valider les scripts Gulp
gulp.task('lint.gulp', function () {
  'use strict';
  return gulp.src(['./gulpfile.js', config.paths.task + '/*.js'])
    .pipe(prettify({
      config: './.jsbeautifyrc'
    }))
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.root));
});

// Valider les scripts ./test
gulp.task('lint.specs', function () {
  'use strict';
  return gulp.src([config.paths.test + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.test));
});

// Valider les scripts ./src/js/constants/
gulp.task('lint.constants', function () {
  'use strict';
  return gulp.src([config.paths.const + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.const));
});

// Valider les scripts ./src/js/functions/
gulp.task('lint.functions', function () {
  'use strict';
  return gulp.src([config.paths.func + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.func));
});

// Valider les scripts ./src/js/classes/
gulp.task('lint.constructors', function () {
  'use strict';
  return gulp.src([config.paths.class + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.class));
});

// Valider les scripts ./src/js/prototypes/
gulp.task('lint.prototypes', function () {
  'use strict';
  return gulp.src([config.paths.proto + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.proto));
});

// TASK Pour valider dist/acte
gulp.task('lint.dist', function () {
  'use strict';
  return gulp.src([config.paths.dist + '/acte.js'])
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.dist));
});
