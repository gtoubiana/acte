/** TACHES PRINCIPALES DU FICHIER :
 * gulp demo
 * gulp demo.vendors
 */

const config = require('../config');
const gulp = require('gulp');
const sequence = require('gulp-sequence');

// Copier les fichiers du Bootstrap
gulp.task('demo.vendors', () => {
  const stream = gulp.src(
    [`${config.paths.bootstrapCore}/js/bootstrap.min.js`,
    `${config.paths.jqueryCore}/jquery.min.js`,
    ])
    .pipe(gulp.dest(`${config.paths.demo}/js/`))
    .on('end', () => {
      const sstream = gulp.src(
        [`${config.paths.bootstrapCore}/css/bootstrap-theme.min.css`])
        .pipe(gulp.dest(`${config.paths.demo}/css/`))
        .on('end', () => {
          const ssstream = gulp.src(
            [`${config.paths.bootstrapCore}/fonts/glyphicons*`])
            .pipe(gulp.dest(`${config.paths.demo}/fonts/`));

          return ssstream;
        });

      return sstream;
    });

  return stream;
});

// Tâche de la démo
gulp.task('demo', sequence(

  // Copier les fichiers Bootstrap & Jquery
  'demo.vendors'

));
