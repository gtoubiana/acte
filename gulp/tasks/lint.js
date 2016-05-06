/** TACHES PRINCIPALES DU FICHIER :
 * gulp lint
 */
const config = require('../config');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const lazypipe = require('lazypipe');
const prettify = require('gulp-jsbeautifier');
const sequence = require('gulp-sequence');
const lazyLint = lazypipe()
  .pipe(eslint)
  .pipe(eslint.format)
  .pipe(eslint.failAfterError);
const lazyPrettyLint = lazypipe()
  .pipe(prettify, {
    config: `${config.paths.src}/.jsbeautifyrc`,
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

gulp.task('lint.src', sequence(
  'lint.constants',
  'lint.functions',
  'lint.constructors',
  'lint.prototypes'
));

gulp.task('lint.test', sequence(
  'lint.specs'
));

// Valider les scripts Gulp
gulp.task('lint.gulp', () => {
  const stream = gulp.src(['./gulpfile.js', `${config.paths.task}/*.js`])
    .pipe(prettify({
      config: './.jsbeautifyrc',
    }))
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.root));

  return stream;
});

// Valider les scripts ./test
gulp.task('lint.specs', () => {
  const stream = gulp.src([`${config.paths.test}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.test));

  return stream;
});

// Valider les scripts ./src/js/constants/
gulp.task('lint.constants', () => {
  const stream = gulp.src([`${config.paths.const}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.const));

  return stream;
});

// Valider les scripts ./src/js/functions/
gulp.task('lint.functions', () => {
  const stream = gulp.src([`${config.paths.func}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.func));

  return stream;
});

// Valider les scripts ./src/js/classes/
gulp.task('lint.constructors', () => {
  const stream = gulp.src([`${config.paths.class}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.class));

  return stream;
});

// Valider les scripts ./src/js/prototypes/
gulp.task('lint.prototypes', () => {
  const stream = gulp.src([`${config.paths.proto}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.proto));

  return stream;
});
