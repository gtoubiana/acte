/** WATCH
 * prewatch
 * watch.js
 * watch
 */

const gulp = require('gulp');
const config = require('../config');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sequence = require('gulp-sequence');
const wrap = require('gulp-wrap');

/* eslint-disable comma-dangle */

// Tâche de pré-watch
gulp.task('prewatch', sequence(

  'default',
  'tests.coverage'

));

/* eslint-enable comma-dangle */

// TASK Pour générer le script pour le watch
gulp.task('watch.js', () => {
  const stream = gulp.src(config.acteScripts)
    .pipe(concat('acte.js'))
    .pipe(wrap(config.umd))
    .pipe(gulp.dest(`${config.paths.testJasmine}/lib`));

  return stream;
});

// TASK de watch pour SpecRunner.html
gulp.task('watch', ['prewatch'], () => {
  browserSync.init({
    server: {
      baseDir: './test/jasmine/',
      index: 'SpecRunner.html',
    },
  });

  // Eviter les séquences sans callbacks dans les gulp.watch
  gulp.watch(config.acteScripts, ['watch.js'])
    .on('change', browserSync.reload);
  gulp.watch([`${config.paths.test}/*.js`], ['tests.specs'])
    .on('change', browserSync.reload);
});

/* CTRL-C to stop watching */
