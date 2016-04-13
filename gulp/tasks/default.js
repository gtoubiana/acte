/** TACHES PRINCIPALES DU FICHIER :
 * gulp
 * gulp default
 */
var gulp = require('gulp');
var sequence = require('gulp-sequence');

require('eslint-config-airbnb');
require('eslint-plugin-react');
require('karma-jasmine');
require('karma-sauce-launcher');
require('conventional-changelog-custom');

// Tâche par défaut
gulp.task('default', sequence(

  // Validations de fichiers
  'validations',

  // Générations de fichiers
  'generations',

  // Spécifications des tests
  'specifications',

  // Couvertures des tests avec istanbul et COVERALLS
  'couvertures',

  // Certification eslint airbnb/legacy du fichier acte.js
  'certifications'

));
