/** TACHES PRINCIPALES DU FICHIER :
 * gulp build
 */
var gulp = require('gulp');
var sequence = require('gulp-sequence');

// Tâche build par défaut
gulp.task('build', sequence(
  'default'
));
