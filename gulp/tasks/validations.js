var config = require('../config');
var depcheck = require('gulp-depcheck');
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

gulp.task('validations', sequence(

  // Vérifier les dépendances dans le package.json
  'validation.dependances',

  // Valider les constantes
  'validation.constantes',

  // Valider les utilitaires
  'validation.utilitaires',

  // Valider le gulpfile et les gulptasks
  'validation.gulp',

  // Valider les methodes
  'validation.methodes',

  // Valider les specs pour les tests
  'validation.tests'
));

// TASK Pour vérifier l'utilisation des dépendances
gulp.task('validation.dependances', depcheck({
  ignoreDirs: ['docs', 'build'],
  ignoreMatches: ['glob']
}));

// TASK Pour valider les scripts ./
gulp.task('validation.gulp', function () {
  'use strict';
  return gulp.src(['./gulpfile.js', config.paths.task + '/*.js'])
    .pipe(prettify({
      config: './.jsbeautifyrc'
    }))
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.root));
});

// TASK Pour valider les scripts ./src/js/
gulp.task('validation.methodes', function () {
  'use strict';
  return gulp.src([config.paths.methodes + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.methodes));
});

// TASK Pour valider les scripts ./src/js/constantes/
gulp.task('validation.constantes', function () {
  'use strict';
  return gulp.src([config.paths.constantes + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.constantes));
});

// TASK Pour valider les scripts ./src/js/utilitaires/
gulp.task('validation.utilitaires', function () {
  'use strict';
  return gulp.src([config.paths.utilitaires + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.utilitaires));
});

// TASK Pour valider les scripts ./dist/test
gulp.task('validation.tests', function () {
  'use strict';
  return gulp.src([config.paths.test + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.test));
});

// TASK Pour valider les scripts ./
gulp.task('validation.script', function () {
  'use strict';
  return gulp.src([config.paths.dist + '/acte.js'])
    .pipe(prettify({
      config: config.paths.dist + '/.jsbeautifyrc'
    }))
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.dist));
});
