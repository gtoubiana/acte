var config = require('../config');
var del = require('del');
var gulp = require('gulp');
var sequence = require('gulp-sequence');

gulp.task('nettoyages', sequence(
  // supprimer les fichiers issus de la tache generations
  'nettoyage.generations',
  // supprimer les fichiers issus de la tache specifications
  'nettoyage.specifications',
  // supprimer les fichiers issus de la tache couvertures
  'nettoyage.couvertures'
));

// TASK Pour nettoyer les fichiers issus de la tache generations
gulp.task('nettoyage.generations', function () {
  'use strict';
  return del([
    config.paths.dist + '/*.{js,map,md,zip}',
    config.paths.constantes + '/*.md',
    config.paths.utilitaires + '/*.md',
    'LICENSE'
  ]);
});

// TASK Pour nettoyer les fichiers issus de la tache specifications
gulp.task('nettoyage.specifications', function () {
  'use strict';
  return del([
    config.paths.jasmine + '/*.js',
    config.paths.jasmine + '/lib/'
  ]);
});

// TASK Pour nettoyer les fichiers issus de la tache couvertures
gulp.task('nettoyage.couvertures', function () {
  'use strict';
  return del([
    config.paths.coverage
  ]);
});
