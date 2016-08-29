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
    [`${config.paths.bootstrapBower}/js/bootstrap.min.js`,
    `${config.paths.jqueryBower}/jquery.min.js`,
    `${config.paths.html5shivBower}/html5shiv.min.js`,
    `${config.paths.respondBower}/respond.min.js`,
    ])
    .pipe(gulp.dest(`${config.paths.demo}/js/`))
    .on('end', () => {
      const sstream = gulp.src(
        [`${config.paths.bootstrapBower}/css/bootstrap.min.css`,
        `${config.paths.bootstrapBower}/css/bootstrap-theme.min.css`,
      ])
        .pipe(gulp.dest(`${config.paths.demo}/css/`))
        .on('end', () => {
          const ssstream = gulp.src(
            [`${config.paths.bootstrapBower}/fonts/glyphicons*`])
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
