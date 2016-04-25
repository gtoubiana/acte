/** TACHES PRINCIPALES DU FICHIER :
 * gulp clean
 * gulp clean.dist
 * gulp clean.tests
 */

var config = require('../config');
var del = require('del');
var gulp = require('gulp');
var sequence = require('gulp-sequence');

gulp.task('clean', sequence(

  // supprimer les fichiers issus de la tache generations
  'clean.dist',

  // supprimer les fichiers issus de la tache tests
  'clean.tests'

));

// TASK Pour nettoyer les fichiers issus de la tache generations
gulp.task('clean.dist', function (done) {
  'use strict';
  return del([
    config.paths.dist + '/*.{js,map,md,zip}',
    config.paths.const + '/*.md',
    config.paths.func + '/*.md'
  ], done);
});

// TASK Pour nettoyer les fichiers issus de la tache tests
gulp.task('clean.tests', function (done) {
  'use strict';
  return del([
    config.paths.jasmine + '/*.js',
    config.paths.jasmine + '/lib/',
    config.paths.coverage
  ], done);
});
