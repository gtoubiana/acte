/** TACHES PRINCIPALES DU FICHIER :
 * gulp clean
 * gulp clean.dist
 * gulp clean.tests
 */

const config = require('../config');
const del = require('del');
const gulp = require('gulp');
const sequence = require('gulp-sequence');

gulp.task('clean', sequence(

  // supprimer les fichiers issus de la tache generations
  'clean.dist',

  // supprimer les fichiers issus de la tache tests
  'clean.tests'

));

// TASK Pour nettoyer les fichiers issus de la tache generations
gulp.task('clean.dist', (done) => {
  const stream = del([
    `${config.paths.dist}/*.{js,map,md,zip}`,
    `${config.paths.const}/*.md`,
    `${config.paths.func}/*.md`,
  ], done);

  return stream;
});

// TASK Pour nettoyer les fichiers issus de la tache tests
gulp.task('clean.tests', (done) => {
  const stream = del([
    `${config.paths.jasmine}/*.js`,
    `${config.paths.jasmine}/lib/`,
    `${config.paths.coverage}`,
  ], done);

  return stream;
});
