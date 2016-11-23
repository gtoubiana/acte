/** TACHES PRINCIPALES DU FICHIER :
 * gulp demo
 * gulp demo.assets
 */

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const config = require('../config');
const fse = require('fs-extra');
const gulp = require('gulp');
const hb = require('gulp-hb');
const prettify = require('gulp-jsbeautifier');
const rename = require('gulp-rename');
const sequence = require('gulp-sequence');
const size = require('gulp-size');

// TASK Pour générer un index.html à partir d'un template .hbs'
gulp.task('demo.index', () => {
  const packageInfos = JSON.parse(fse.readFileSync('./package.json',
    'utf8'));
  const indexInfos = JSON.parse(fse.readFileSync('./src/tmpl/index.json',
    'utf8'));
  const stream = gulp.src(`${config.paths.src}/tmpl/index.hbs`)
    .pipe(rename('index.html'))
    .pipe(hb())
    .data({
      name: packageInfos.name,
      version: packageInfos.version,
      description: packageInfos.description,
      author: packageInfos.author,
      license: packageInfos.license,
      homepage: packageInfos.homepage,
      menu: indexInfos.menu,
      zip: indexInfos.zip,
      doc: indexInfos.doc,
      titreconv: indexInfos.titreconv,
      detailconv: indexInfos.detailconv,
      saisiedate: indexInfos.saisiedate,
      debrider: indexInfos.debrider,
      debridconv: indexInfos.debridconv,
      pourquoideb: indexInfos.pourquoideb,
      detailpourquoideb: indexInfos.detailpourquoideb,
    })
    .pipe(gulp.dest(config.paths.root));

  return stream;
});

// Copier les fichiers du Bootstrap
gulp.task('demo.assets', () => {
  const stream1 = gulp.src(
    [`${config.paths.bootstrapBower}/js/bootstrap.min.js`,
    `${config.paths.jqueryBower}/jquery.min.js`,
    `${config.paths.jqueryUIBower}/jquery-ui.min.js`,
    `${config.paths.html5shivBower}/html5shiv.min.js`,
    `${config.paths.respondBower}/respond.min.js`,
    `${config.paths.codePrettifyBower}/run_prettify.js`,
    `${config.paths.src}/demo/ie10-viewport-bug-workaround.js`,
    ])
    .pipe(gulp.dest(`${config.paths.demo}/js/`))
    .on('end', () => {
      const stream2 = gulp.src(
        [`${config.paths.bootstrapBower}/css/bootstrap.min.css`,
        `${config.paths.src}/demo/*.css`,
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

// TASK Pour générer le script ES5 ./demo/js/script.js
gulp.task('demo.script.es5', () => {
  const stream = gulp.src(`${config.paths.src}/demo/script.js`)
  .pipe(babel({
    plugins: [

      // es2015 preset
      'transform-es2015-template-literals',
      'transform-es2015-literals',
      'transform-es2015-function-name',
      'transform-es2015-arrow-functions',
      'transform-es2015-block-scoped-functions',
      'transform-es2015-classes',
      'transform-es2015-object-super',
      'transform-es2015-shorthand-properties',
      'transform-es2015-duplicate-keys',
      'transform-es2015-computed-properties',
      'transform-es2015-for-of',
      'transform-es2015-sticky-regex',
      'transform-es2015-unicode-regex',
      'check-es2015-constants',
      'transform-es2015-spread',
      'transform-es2015-parameters',
      'transform-es2015-destructuring',
      'transform-es2015-block-scoping',
      'transform-es2015-typeof-symbol', ['transform-regenerator', {
        async: false,
        asyncGenerators: false,
      },
    ],

        // no strict
        ['transform-es2015-modules-commonjs', {
          strict: false,
        },
      ],
    ],
  }))
    .pipe(prettify({
      config: `${config.paths.jasmine}/.jsbeautifyrc`,
    }))
    .pipe(size({
      title: 'ES5 script.js Size ->',
    }))
    .pipe(gulp.dest(`${config.paths.demo}/js/`));

  return stream;
});

gulp.task('demo.script.es3', () => {
  const stream = gulp.src(`${config.paths.demo}/js/script.js`)
    .pipe(babel({
      plugins: [

        // ES3 compatibility preset
        'transform-object-assign',
        'transform-es3-member-expression-literals',
        'transform-es3-property-literals',
        'transform-jscript',
        'transform-undefined-to-void',
      ],
    }))
    .pipe(prettify({
      config: `${config.paths.jasmine}/.jsbeautifyrc`,
    }))
    .pipe(size({
      title: 'ES3 script.js Size ->',
    }))
    .pipe(gulp.dest(`${config.paths.demo}/js`));

  return stream;
});

gulp.task('demo.concat.js', () => {
  const stream = gulp.src(
    [`${config.paths.dist}/acte.min.js`,
    `${config.paths.demo}/js/jquery.min.js`,
    `${config.paths.demo}/js/jquery-ui.min.js`,
    `${config.paths.demo}/js/bootstrap.min.js`,
    `${config.paths.demo}/js/script.js`,
    `${config.paths.demo}/js/run_prettify.js`,
    `${config.paths.demo}/js/ie10-viewport-bug-workaround.js`,
    ])
    .pipe(concat('concat.js'))
    .pipe(gulp.dest(`${config.paths.demo}/js`));

  return stream;
});

gulp.task('demo.concat.css', () => {
  const stream = gulp.src(
    [`${config.paths.demo}/css/bootstrap.min.css`,
    `${config.paths.demo}/css/jquery-ui-bootstrap.css`,
    `${config.paths.demo}/css/demo-theme.css`,
    ])
    .pipe(concat('concat.css'))
    .pipe(gulp.dest(`${config.paths.demo}/css`));

  return stream;
});

// Tâche de la démo
gulp.task('demo', sequence(

  // Générer le fichier index.html
  'demo.index',

  // Copier les fichiers Bootstrap & Jquery
  'demo.assets',

  // Copier et Babeliser le script.js en ES5
  'demo.script.es5',

  // Babeliser le script.js en ES3
  'demo.script.es3',

  // Concaténer les scripts js
  'demo.concat.js',

  // Concaténer les fichiers css
  'demo.concat.css'

));
