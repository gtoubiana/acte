/** TACHES PRINCIPALES DU FICHIER :
 * gulp
 * gulp default
 */
const gulp = require('gulp');
const sequence = require('gulp-sequence');

// Tâche par défaut
gulp.task('default', sequence(

  // Nettoyages
  'clean.dist',
  'clean.tests',
  'clean.demo',

  // Vérification des dépendances
  'depcheck',

  // Validations des fichiers src
  'lint.gulp',
  'lint.specs',
  'lint.constants',
  'lint.functions',
  'lint.constructors',
  'lint.prototypes',
  'lint.dist',

  // Spécifications des tests [lint.specs]
  'tests.specs',

  // Générations des fichiers [lint.src]
  'dist.acte.es5',
  'dist.acte.es3',
  'dist.min',

  // Générations des documentations
  // [lint.src, dist.acte.es3]
  'docs.dist',
  'docs.constants',
  'docs.functions',
  'docs.readme',
  'docs.index',

  // Génération du zip
  'dist.zip',

  // Génération de la démo
  'demo.assets'

  // Couvertures des tests avec istanbul et COVERALLS [tests.specs, dist.acte]
  // 'tests.coverage'

));
