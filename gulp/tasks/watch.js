const gulp = require('gulp');
const config = require('../config');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');

// TASK Pour générer le script pour le watch
gulp.task('watch.js', () => {
  const stream = gulp.src(config.acteScripts)
    .pipe(concat('acte.js'))
    .pipe(wrap(config.umd))
    .pipe(gulp.dest(`${config.paths.jasmine}/lib`));

  return stream;
});

// TASK de watch pour SpecRunner.html
gulp.task('watch', ['default'], () => {
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
