/** TACHES PRINCIPALES DU FICHIER :
 * gulp demo
 * gulp demo.assets
 */

const config = require('../config');
const gulp = require('gulp');
const sequence = require('gulp-sequence');

// Copier les fichiers du Bootstrap
gulp.task('demo.assets', () => {
  const stream1 = gulp.src(
    [`${config.paths.bootstrapBower}/js/bootstrap.min.js`,
    `${config.paths.jqueryBower}/jquery.min.js`,
    `${config.paths.html5shivBower}/html5shiv.min.js`,
    `${config.paths.respondBower}/respond.min.js`,
    `${config.paths.src}/demo/ie10-viewport-bug-workaround.js`,
    `${config.paths.src}/demo/script.js`,
    ])
    .pipe(gulp.dest(`${config.paths.demo}/js/`))
    .on('end', () => {
      const stream2 = gulp.src(
        [`${config.paths.bootstrapBower}/css/bootstrap.min.css`,
        `${config.paths.bootstrapBower}/css/bootstrap-theme.min.css`,
        `${config.paths.src}/demo/demo-theme.css`,
      ])
        .pipe(gulp.dest(`${config.paths.demo}/css/`))
        .on('end', () => {
          const stream3 = gulp.src(
            [`${config.paths.bootstrapBower}/fonts/glyphicons*`])
            .pipe(gulp.dest(`${config.paths.demo}/fonts/`))

            /* eslint-disable max-nested-callbacks */
            .on('end', () => {
              const stream4 = gulp.src(
                [`${config.paths.src}/demo/favicon.ico`])
                .pipe(gulp.dest(`${config.paths.demo}/`))
                .on('end', () => {
                  const stream5 = gulp.src(
                    [`${config.paths.src}/demo/*.{jpg,png}`])
                    .pipe(gulp.dest(`${config.paths.demo}/img/`));

                  return stream5;
                });

              return stream4;
            });

          /* eslint-enable max-nested-callbacks */
          return stream3;
        });

      return stream2;
    });

  return stream1;
});

// Tâche de la démo
gulp.task('demo', sequence(

  // Copier les fichiers Bootstrap & Jquery
  'demo.assets'

));
