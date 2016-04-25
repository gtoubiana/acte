/** TACHES PRINCIPALES DU FICHIER :
 * gulp
 * gulp travis
 */
var gulp = require('gulp');
var sequence = require('gulp-sequence');

require('eslint-config-airbnb');
require('eslint-plugin-react');
require('eslint-plugin-jsx-a11y');
require('eslint-plugin-import');
require('karma-jasmine');
require('karma-chrome-launcher');
require('karma-firefox-launcher');
require('karma-opera-launcher');
require('karma-safari-launcher');
require('karma-sauce-launcher');
require('babel-preset-es2015-without-strict');

// Tâche travis ci
gulp.task('travis', sequence(

  // Nettoyages
  'clean.dist',
  'clean.tests',

  // Vérification des dépendances
  'depcheck',

  // Validations des fichiers src
  'lint.gulp',
  'lint.specs',
  'lint.constants',
  'lint.functions',
  'lint.constructors',
  'lint.prototypes',

  // Spécifications des tests [lint.specs]
  'tests.specs',

  // Générations des documentations
  // [lint.constants, lint.functions, lint.constructors, lint.prototypes]
  'docs.dist',
  'docs.constants',
  'docs.functions',

  // Générations des fichiers [docs.dist]
  'dist.acte',
  'dist.min',
  'dist.zip',

  // Validation airbnb es5 [dist.acte]
  'lint.dist'

));