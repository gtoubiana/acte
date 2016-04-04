var config = require('../config');
var del = require('del');
var gulp = require('gulp');
var sequence = require('gulp-sequence');

gulp.task('nettoyages', sequence(

  // supprimer les fichiers issus de la tache generations
  'nettoyages.generations',

  // supprimer les fichiers issus de la tache specifications
  'nettoyages.specifications',

  // supprimer les fichiers issus de la tache couvertures
  'nettoyages.couvertures'
));

// TASK Pour nettoyer les fichiers issus de la tache generations
gulp.task('nettoyages.generations', function () {
  'use strict';
  return del([
    config.paths.dist + '/*.{js,map,md,zip}',
    config.paths.constantes + '/*.md',
    config.paths.utilitaires + '/*.md',
    'LICENSE'
  ]);
});

// TASK Pour nettoyer les fichiers issus de la tache specifications
gulp.task('nettoyages.specifications', function () {
  'use strict';
  return del([
    config.paths.jasmine + '/*.js',
    config.paths.jasmine + '/lib/'
  ]);
});

// TASK Pour nettoyer les fichiers issus de la tache couvertures
gulp.task('nettoyages.couvertures', function () {
  'use strict';
  return del([
    config.paths.coverage
  ]);
});
