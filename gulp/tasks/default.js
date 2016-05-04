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

  // Générations des fichiers [lint.src]
  'dist.acte.es5',
  'dist.acte.es3',
  'dist.min',
  'dist.zip',

  // Générations des documentations
  // [lint.src, dist.acte.es3]
  'docs.dist',
  'docs.constants',
  'docs.functions',

  // Validation airbnb-base/legacy [dist.acte.es3]
  'lint.dist'

  // Couvertures des tests avec istanbul et COVERALLS [tests.specs, dist.acte]
  // 'tests.coverage'

));
