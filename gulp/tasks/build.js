/** TACHES PRINCIPALES DU FICHIER :
 * gulp build
 */
const gulp = require('gulp');
const sequence = require('gulp-sequence');

// Tâche build par défaut
gulp.task('build', sequence(
  'default'
));
