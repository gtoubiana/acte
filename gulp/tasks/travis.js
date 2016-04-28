/** TACHES PRINCIPALES DU FICHIER :
 * gulp travis
 */
var gulp = require('gulp');
var sequence = require('gulp-sequence');

// Tâche build par défaut
gulp.task('travis', sequence(
  'default'
));
