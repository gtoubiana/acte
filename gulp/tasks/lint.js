/** TACHES PRINCIPALES DU FICHIER :
 * gulp lint
 */
const concat = require('gulp-concat');
const config = require('../config');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const jscs = require('gulp-jscs');
const lazypipe = require('lazypipe');
const prettify = require('gulp-jsbeautifier');
const sequence = require('gulp-sequence');
const stylish = require('gulp-jscs-stylish');
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
  'lint.public.functions',
  'lint.private.functions',

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
  const stream = gulp.src([`${config.paths.gulpTask}/*.js`])
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.gulpTask));

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
  const stream = gulp.src([`${config.paths.privConst}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(config.paths.privConst));

  return stream;
});

// Valider les scripts ./src/js/private-functions/
gulp.task('lint.private.functions', () => {
  const stream = gulp.src([`${config.paths.privFunc}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(config.paths.privFunc));

  return stream;
});

// Valider les scripts ./src/js/public-functions/
gulp.task('lint.public.functions', () => {
  const stream = gulp.src([`${config.paths.pubFunc}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(`${config.paths.pubFunc}`));

  return stream;
});

// Valider les scripts ./src/js/classes/
gulp.task('lint.constructors', () => {
  const stream = gulp.src([`${config.paths.pubConstr}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(config.paths.pubConstr));

  return stream;
});

// Valider les scripts ./src/js/prototypes/
gulp.task('lint.prototypes', () => {
  const stream = gulp.src([`${config.paths.pubProto}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(config.paths.pubProto));

  return stream;
});

gulp.task('lint.dist', () => {
  const stream = gulp.src(config.acteScripts)
    .pipe(concat('acte.TEMP.ES2015.js'))
    .pipe(prettify({
      config: `${config.paths.src}/.jsbeautifyrc`,
    }))
    .pipe(eslint({
      rules: {
        'no-unused-vars': 1,
        'no-use-before-define': 1,
        'no-shadow': 1,
      },
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish());

  return stream;
});
