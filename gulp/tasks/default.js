/** TACHES PRINCIPALES DU FICHIER :
 * gulp
 * gulp default
 */
var gulp = require('gulp');
var sequence = require('gulp-sequence');

// Tâche par défaut
gulp.task('default', sequence(

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

  // Couvertures des tests avec istanbul et COVERALLS [tests.specs, dist.acte]
  // 'tests.coverage'

));
