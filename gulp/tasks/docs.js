/** TACHES PRINCIPALES DU FICHIER :
 * gulp docs
 * gulp docs.assets
 * gulp docs.dist
 * gulp docs.constants
 * gulp docs.functions
 * gulp docs.readme
 */
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const config = require('../config');
const fse = require('fs-extra');
const gulp = require('gulp');
const hb = require('gulp-hb');
const imagemin = require('gulp-imagemin');
const jsdoc2md = require('gulp-jsdoc-to-markdown');
const lazypipe = require('lazypipe');
const prettify = require('gulp-jsbeautifier');
const rename = require('gulp-rename');
const rep = require('gulp-replace');
const sequence = require('gulp-sequence');
const size = require('gulp-size');
const uglify = require('gulp-uglify');
const uncss = require('gulp-uncss');

// Lazypipes
const lazyJsdocFr = lazypipe()
  .pipe(rep, /## Constants/g, '## Constantes')
  .pipe(rep, /## Functions/g, '## Utilitaires')
  .pipe(rep, /\*\*Kind\*\*:/g, '**Type** :')
  .pipe(rep, /\*\*Access:\*\*/g, '**Accès** :')
  .pipe(rep, /\*\*Chainable\*\*/g, '**Méthode chainable**')
  .pipe(rep, /\*\*See\*\*:/g, '**Voir** :')
  .pipe(rep, /\*\*Since\*\*:/g, '**Depuis** :')
  .pipe(rep, /\*\*Version\*\*:/g, '**Version** :')
  .pipe(rep, /\*\*Author:\*\*/g, '**Auteur** :')
  .pipe(rep, /\*\*License\*\*:/g, '**Licence** :')
  .pipe(rep, /\*\*Copyright\*\*:/g, '**Copyright** :')
  .pipe(rep, /\*\*Returns\*\*:/g, '**Résultat** :')
  .pipe(rep, /\*\*Example\*\*/g, '**Exemple** :')
  .pipe(rep, /<code>object<\/code>/gi, '<code>Objet</code>')
  .pipe(rep, /<code>function<\/code>/gi, '<code>Fonction</code>')
  .pipe(rep, /<code>String<\/code>/gi, '<code>Chaîne</code>')
  .pipe(rep, /<code>Boolean<\/code>/gi, '<code>Booléen</code>')
  .pipe(rep, /<code>Number<\/code>/gi, '<code>Nombre</code>')
  .pipe(rep, /<code>Array<\/code>/gi, '<code>Tableau</code>')
  .pipe(rep, '| Param |', '| Paramètres |')
  .pipe(rep, '| Default |', '| Par défaut |')
  .pipe(rep, ': global namespace', ': Espace de noms global')
  .pipe(rep, ': private', ': privé')
  .pipe(rep, ': global constant', ': Constante')
  .pipe(rep, ': global function', ': Fonction')
  .pipe(rep, ': static class of', ': Classe statique de')
  .pipe(rep, ': static method of', ': Méthode statique de')
  .pipe(rep, ': instance method of', ': Méthode d\'instance de')
  .pipe(rep, ': instance property of', ': Propriété d\'instance de');

// .pipe(rep, ' ↩︎', '')

gulp.task('docs', sequence(
  'docs.dist',
  'docs.constants',
  'docs.functions',

  // Générer le fichier index.html
  'docs.index',

  // Copier les fichiers Bootstrap & Jquery
  'docs.assets',

  // Copier et Babeliser le script.js en ES5
  'docs.script.es5',

  // Babeliser le script.js en ES3
  'docs.script.es3',

  // Concaténer les scripts js
  'docs.concat.js',

  // Concaténer les fichiers css
  'docs.concat.css'
));

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('docs.dist', () => {
  const stream = gulp.src(`${config.paths.testJasmine}/lib/acte.js`)
    .pipe(rename('README.md'))
    .pipe(jsdoc2md({
      template: fse.readFileSync(
        `${config.paths.partials}/docDist.hbs`, 'utf8'),
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.dist));

  return stream;
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('docs.constants', () => {
  const stream = gulp.src(`${config.paths.privConst}/*.js`)
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true,
      'sort-by': 'name',
      template: fse.readFileSync(
        `${config.paths.partials}/docConstants.hbs`,
        'utf8'),
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.privConst));

  return stream;
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('docs.functions', () => {
  const stream = gulp.src(`${config.paths.privFunc}/*.js`)
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true,
      'sort-by': 'name',
      template: fse.readFileSync(
        `${config.paths.partials}/docFunctions.hbs`,
        'utf8'),
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.privFunc));

  return stream;
});

// TASK Pour générer un README.md à partir d'un template .hbs'
gulp.task('docs.readme', () => {
  const stream = gulp.src(`${config.paths.partials}/README.hbs`)
    .pipe(rename({ extname: '.md' }))
    .pipe(hb({
      data: JSON.parse(fse.readFileSync('./package.json',
        'utf8')),
    }))
    .pipe(gulp.dest(config.paths.root));

  return stream;
});

// TASK Pour générer un index.html à partir d'un template .hbs'
gulp.task('docs.index', () => {
  const stream = gulp.src(`${config.paths.src}/docs/index.hbs`)
    .pipe(hb({
      partials: 'src/docs/partials/**/*.hbs',
      data: JSON.parse(fse.readFileSync('./package.json',
        'utf8')),
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(`${config.paths.root}/docs`));

  return stream;
});

// Copier les fichiers du Bootstrap
gulp.task('docs.assets', () => {
  const stream1 = gulp.src(
    [`${config.paths.bowerBootstrap}/js/bootstrap.min.js`,
    `${config.paths.bowerJquery}/jquery.min.js`,
    `${config.paths.bowerJqueryUI}/jquery-ui.min.js`,
    `${config.paths.bowerShiv}/html5shiv.min.js`,
    `${config.paths.bowerRespond}/respond.min.js`,
    `${config.paths.src}/docs/js/ie10-viewport-bug-workaround.js`,
    ])
    .pipe(gulp.dest(`${config.paths.docs}/js/`))
    .on('end', () => {
      const stream2 = gulp.src(
        [`${config.paths.bowerBootstrap}/css/bootstrap.min.css`,
        `${config.paths.src}/docs/css/*.css`,
      ])
        .pipe(gulp.dest(`${config.paths.docs}/css/`))
        .on('end', () => {
          const stream3 = gulp.src(
            [`${config.paths.bowerBootstrap}/fonts/glyphicons*`])
            .pipe(gulp.dest(`${config.paths.docs}/fonts/`))

            /* eslint-disable max-nested-callbacks */
            .on('end', () => {
              const stream4 = gulp.src(
                [`${config.paths.src}/docs/img/favicon.ico`])
                .pipe(gulp.dest(`${config.paths.docs}/`))
                .on('end', () => {
                  const stream5 = gulp.src(
                    [`${config.paths.src}/docs/img/*.{jpg,png}`])
                    .pipe(imagemin())
                    .pipe(gulp.dest(`${config.paths.docs}/img/`));

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

// TASK Pour générer le script ES5 ./docs/js/script.js
gulp.task('docs.script.es5', () => {
  const stream = gulp.src(`${config.paths.src}/docs/js/demo-script.js`)
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
      config: `${config.paths.testJasmine}/.jsbeautifyrc`,
    }))
    .pipe(size({
      title: 'ES5 script.js Size ->',
    }))
    .pipe(gulp.dest(`${config.paths.docs}/js/`));

  return stream;
});

gulp.task('docs.script.es3', () => {
  const stream = gulp.src(`${config.paths.docs}/js/demo-script.js`)
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
      config: `${config.paths.testJasmine}/.jsbeautifyrc`,
    }))
    .pipe(size({
      title: 'ES3 script.js Size ->',
    }))
    .pipe(gulp.dest(`${config.paths.docs}/js`));

  return stream;
});

gulp.task('docs.concat.js', () => {
  const options = {
    preserveComments: 'license',
  };
  const stream = gulp.src(
    [`${config.paths.dist}/acte.min.js`,
    `${config.paths.docs}/js/jquery.min.js`,
    `${config.paths.docs}/js/jquery-ui.min.js`,
    `${config.paths.docs}/js/bootstrap.min.js`,
    `${config.paths.docs}/js/demo-script.js`,
    `${config.paths.docs}/js/run_prettify.js`,
    `${config.paths.docs}/js/ie10-viewport-bug-workaround.js`,
    ])
    .pipe(concat('script.js'))
    .pipe(uglify(options))
    .pipe(gulp.dest(`${config.paths.docs}/js/`));

  return stream;
});

gulp.task('docs.concat.css', () => {
  const stream = gulp.src(
    [`${config.paths.docs}/css/bootstrap.min.css`,
    `${config.paths.docs}/css/jquery-ui-bootstrap.css`,
    `${config.paths.docs}/css/demo-theme.css`,
    ])
    .pipe(concat('style.css'))
    .pipe(uncss({
      html: [
        `${config.paths.docs}/index.html`,
      ],
      ignore: [
        /\.table/,
        /\.ui-(menu|widget|autocomplete|front|helper-hidden)/,
      ],
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(`${config.paths.docs}/css/`));

  return stream;
});
