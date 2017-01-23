/** DEFAULT (npm run build)
 * default
 */

const gulp = require('gulp');
const sequence = require('gulp-sequence');

// Tâche par défaut
gulp.task('default', sequence(

  // Nettoyages
  'clean.dist',
  'clean.tests',
  'clean.docs',

  // Vérification des dépendances
  'depcheck',

  // Validations des fichiers src
  'lint.gulp',
  'lint.specs',
  'lint.constants',
  'lint.public.functions',
  'lint.private.functions',
  'lint.constructors',
  'lint.prototypes',
  'lint.dist',
  'lint.docs.js',
  'lint.docs.css',

  // Spécifications des tests
  'tests.specs',

  // Générations des fichiers
  'dist.acte.es5',
  'dist.acte.es3',
  'dist.min',

  // Générations des documentations
  'docs.dist',
  'docs.constants',
  'docs.functions',
  'docs.readme',

  // Génération du zip
  'dist.zip',

  // Génération de la démo dans /docs
  'docs.index',
  'docs.assets',
  'docs.script.es5',
  'docs.script.es3',
  'docs.concat.js',
  'docs.concat.css',

  // Validation du html de la demo
  'lint.docs.html'

));
