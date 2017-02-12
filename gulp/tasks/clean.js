/** CLEAN
 * clean.concat
 * clean.dist
 * clean.docs
 * clean.tests
 */

const config = require('../config');
const del = require('del');
const gulp = require('gulp');
const sequence = require('gulp-sequence');

// Nettoyer les fichiers issus de la tache dist
gulp.task('clean.dist', (done) => {
  const stream = del([
    `${config.paths.dist}/*.{js,map,md,zip}`,
    `${config.paths.privConst}/*.md`,
    `${config.paths.privFunc}/*.md`,
  ], done);

  return stream;
});

// Nettoyer les fichiers issus de la tache tests
gulp.task('clean.tests', (done) => {
  const stream = del([
    `${config.paths.testJasmine}/*.js`,
    `!${config.paths.testJasmine}/jasmine-jsreporter.js`,
    `${config.paths.testJasmine}/lib/`,
    `${config.paths.testCov}`,
  ], done);

  return stream;
});

// Nettoyer les fichiers issus de la tache docs
gulp.task('clean.docs', (done) => {
  const stream = del([
    `${config.paths.docs}/*`,
  ], done);

  return stream;
});

// Nettoyer les fichiers issus de la tache docs/concat
gulp.task('clean.concat', (done) => {
  const stream = del([
    `${config.paths.docs}/css/*.css`,
    `!${config.paths.docs}/css/concat.css`,
  ], done);

  return stream;
});

// Nettoyages default
gulp.task('clean', sequence(
    'clean.dist',
    'clean.tests',
    'clean.docs'));
