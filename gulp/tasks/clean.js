/** TACHES PRINCIPALES DU FICHIER :
 * gulp clean
 * gulp clean.dist
 * gulp clean.tests
 * gulp clean.demo
 */

const config = require('../config');
const del = require('del');
const gulp = require('gulp');
const sequence = require('gulp-sequence');

gulp.task('clean', sequence(

  // supprimer les fichiers issus de la tache dist
  'clean.dist',

  // supprimer les fichiers issus de la tache tests
  'clean.tests',

  // supprimer les fichiers issus de la tache demo
  'clean.demo'

));

// Nettoyer les fichiers issus de la tache dist
gulp.task('clean.dist', (done) => {
  const stream = del([
    `${config.paths.dist}/*.{js,map,md,zip}`,
    `${config.paths.const}/*.md`,
    `${config.paths.func}/*.md`,
  ], done);

  return stream;
});

// Nettoyer les fichiers issus de la tache tests
gulp.task('clean.tests', (done) => {
  const stream = del([
    `${config.paths.jasmine}/*.js`,
    `${config.paths.jasmine}/lib/`,
    `${config.paths.coverage}`,
  ], done);

  return stream;
});

// Nettoyer les fichiers issus de la tache demo
// gulp.task('clean.demo', (done) => {
//   const stream = del([
//     `${config.paths.demo}/css/bootstrap*`,
//     `${config.paths.demo}/js/{bootstrap,jquery}*`,
//     `${config.paths.demo}/fonts/glyphicons*`,
//   ], done);
//
//   return stream;
// });
