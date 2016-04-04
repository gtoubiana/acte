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
  'validations.dependances',

  // Valider les constantes
  'validations.constantes',

  // Valider les utilitaires
  'validations.utilitaires',

  // Valider le gulpfile et les gulptasks
  'validations.gulp',

  // Valider les methodes
  'validations.methodes',

  // Valider les specs pour les tests
  'validations.tests'
));

// TASK Pour vérifier l'utilisation des dépendances
gulp.task('validations.dependances', depcheck({
  ignoreDirs: ['docs', 'build'],
  ignoreMatches: ['glob']
}));

// TASK Pour valider les scripts ./
gulp.task('validations.gulp', function () {
  'use strict';
  return gulp.src(['./gulpfile.js', config.paths.task + '/*.js'])
    .pipe(prettify({
      config: './.jsbeautifyrc'
    }))
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.root));
});

// TASK Pour valider les scripts ./src/js/
gulp.task('validations.methodes', function () {
  'use strict';
  return gulp.src([config.paths.methodes + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.methodes));
});

// TASK Pour valider les scripts ./src/js/constantes/
gulp.task('validations.constantes', function () {
  'use strict';
  return gulp.src([config.paths.constantes + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.constantes));
});

// TASK Pour valider les scripts ./src/js/utilitaires/
gulp.task('validations.utilitaires', function () {
  'use strict';
  return gulp.src([config.paths.utilitaires + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.utilitaires));
});

// TASK Pour valider les scripts ./dist/test
gulp.task('validations.tests', function () {
  'use strict';
  return gulp.src([config.paths.test + '/*.js'])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.test));
});

// TASK Pour valider les scripts ./
gulp.task('validations.script', function () {
  'use strict';
  return gulp.src([config.paths.dist + '/acte.js'])
    .pipe(prettify({
      config: config.paths.dist + '/.jsbeautifyrc'
    }))
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.dist));
});
