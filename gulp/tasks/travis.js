/** TACHES PRINCIPALES DU FICHIER :
 * gulp travis
 */
const gulp = require('gulp');
const sequence = require('gulp-sequence');

// Tâche build par défaut
gulp.task('travis', sequence(
  'default'
));
