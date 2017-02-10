/** TESTS (npm run test)
 * tests.coverage
 * tests.coveralls
 * tests.jasmine
 * tests.karma
 * tests.saucelabs
 * tests.specs
 */

const babel = require('gulp-babel');
const config = require('../config');
const coveralls = require('gulp-coveralls');
const gulp = require('gulp');
const gutil = require('gulp-util');
const istanbul = require('gulp-istanbul');
const jasmineNode = require('gulp-jasmine');
const Server = require('karma').Server;
const concat = require('gulp-concat');

// const eslint = require('gulp-eslint');
const wrap = require('gulp-wrap');

// Générer les Specs utilisés par jasmine dans le browser
gulp.task('tests.specs', () => {
  const stream = gulp.src([`${config.paths.test}/*.js`])
    .pipe(concat('acteSpec.js'))
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
        'transform-es2015-typeof-symbol',
        ['transform-regenerator', { async: false, asyncGenerators: false }],

        // no strict
        ['transform-es2015-modules-commonjs', { strict: true }],
      ],
    }))

    // .pipe(eslint())
    // .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
    .pipe(gulp.dest(`${config.paths.testJasmine}/lib/`))
    .on('end', () => {
      // Copier les librairies jasmine dans ./dist/test/lib
      const sstream = gulp.src(`${config.paths.npmJasmine}/*.{css,js}`)
        .pipe(gulp.dest(`${config.paths.testJasmine}/lib/`))
        .on('end', () => {
          // Générer les Specs utilisés par jasmine dans node

          /* eslint-disable comma-dangle */
          const ssstream = gulp.src(
            [`${config.paths.testJasmine}/lib/acteSpec.js`])
            .pipe(wrap(
`var acte = require('${config.paths.reqActe}');
<%= contents %>\n`
            ))
            .pipe(gulp.dest(config.paths.testJasmine));

          return ssstream;

          /* eslint-enable comma-dangle */
        });

      return sstream;
    });

  return stream;
});

// Effectuer les tests dans Node avec Jasmine
gulp.task('tests.jasmine', () => {
  const stream = gulp.src([`${config.paths.testJasmine}/acteSpec.js`])
        .pipe(jasmineNode());

  return stream;
});

// Effectuer les tests avec Karma
gulp.task('tests.karma', (done) => {
  new Server({
    configFile: `${__dirname}/../../test/karma/karma.conf.js`,
    singleRun: true,
  }, done).start();
});

// Effectuer les tests dans SauceLabs avec Karma
gulp.task('tests.saucelabs', (done) => {
  if (process.env.SAUCELABS) {
    new Server({
      configFile: `${__dirname}/../../test/karma/karma.conf-ci.js`,
      singleRun: true,
    }, done).start();
  } else {
    gutil.log(gutil.colors
      .red('process.env.SAUCELABS is not set'));
  }
});

gulp.task('tests.coverage', () => {
  // generation de la couverture
  const stream = gulp.src([`${config.paths.testJasmine}/lib/acte.js`])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())

    // https://nodejs.org/api/stream.html
    .on('finish', () => {
      // generation du rapport de couverture
      gulp.src([`${config.paths.testJasmine}/acteSpec.js`])
        .pipe(jasmineNode())
        .pipe(istanbul.writeReports({
          dir: config.paths.testCov,

          // 'reporters': ['lcov', 'json', 'text-summary', 'text'],
          reporters: ['lcov', 'json', 'text-summary'],
        }));
    });

  return stream;
});

// Envoi du coverage à Coveralls
gulp.task('tests.coveralls', () => {
  if (process.env.COVERALLS) {
    gulp.src(`${config.paths.testCov}/lcov.info`).pipe(coveralls());
  } else {
    gutil.log(gutil.colors
      .red('process.env.COVERALLS is not set'));
  }
});
