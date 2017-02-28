/** DIST
 * dist.acte.es3
 * dist.acte.es5
 * dist.min
 * dist.zip
 */

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const config = require('../config');
const fse = require('fs-extra');
const gulp = require('gulp');
const header = require('gulp-header');
const lazypipe = require('lazypipe');
const pkg = require('../../package.json');
const prettify = require('gulp-jsbeautifier');
const rename = require('gulp-rename');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const wrap = require('gulp-wrap');
const zip = require('gulp-zip');

// Lazypipes
const babelES3 = lazypipe()
  .pipe(babel, {
    plugins: [

      // ES3 compatibility preset
      'transform-object-assign',
      'transform-es3-member-expression-literals',
      'transform-es3-property-literals',
      'transform-undefined-to-void',
      'transform-jscript',
    ],
  });

// var rep = require('gulp-replace');

// TASK Pour générer le script ./dist/acte.js
gulp.task('dist.acte.es5', () => {
  const stream = gulp.src(config.acteScripts)
    .pipe(concat('acte.js'))

  // .pipe(babel({
  //   presets: ['es2015'],
  // }))

  .pipe(babel({
    plugins: [

      // es2017 preset
      'syntax-trailing-function-commas',

      // es2016 preset
      'transform-exponentiation-operator',

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
      'transform-es2015-typeof-symbol', [
        'transform-regenerator', {
          async: false,
          asyncGenerators: false,
        },
      ],

        // no strict
      [
        'transform-es2015-modules-commonjs', {
          strict: false,
        },
      ],
    ],
  }))
    .pipe(wrap(config.umd))

  .pipe(header(config.bannerTop + JSON.parse(fse.readFileSync(
      './package.json', 'utf8')).version + config.bannerBottom, {
        pkg,
      }))
    .pipe(prettify({
      config: `${config.paths.testJasmine}/.jsbeautifyrc`,
    }))
    .pipe(size({
      title: 'ES5 acte.js Size ->',
    }))
    .pipe(gulp.dest(`${config.paths.testJasmine}/lib`));

  return stream;
});

gulp.task('dist.acte.es3', () => {
  const stream = gulp.src([

    // POLYFILLS
    `${config.paths.privPoly}/Array.prototype.reduce.js`,

    // SCRIPT ES5
    `${config.paths.testJasmine}/lib/acte.js`,
  ])
    .pipe(concat('acte.js'))
    .pipe(babelES3())

    // .pipe(babel({
    //   plugins: [

    //     // ES3 compatibility preset
    //     'transform-object-assign',
    //     'transform-es3-member-expression-literals',
    //     'transform-es3-property-literals',
    //     'transform-jscript',
    //     'transform-undefined-to-void',
    //   ],
    // }))

  // .pipe(header(config.bannerTop + JSON.parse(gfs.readFileSync(
  //   './package.json', 'utf8')).version + config.bannerBottom, {
  //     pkg: pkg
  //   }))
    .pipe(prettify({
      config: `${config.paths.testJasmine}/.jsbeautifyrc`,
    }))
    .pipe(size({
      title: 'ES3 acte.js Size ->',
    }))
    .pipe(gulp.dest(`${config.paths.testJasmine}/lib`));

  return stream;
});

// TASK Pour générer le script ./dist/acte.min.js
gulp.task('dist.min', () => {
  const stream = gulp.src(`${config.paths.testJasmine}/lib/acte.js`)
    .pipe(sourcemaps.init())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(uglify())
    .pipe(header(config.bannerTop + JSON.parse(fse.readFileSync(
      './package.json', 'utf8')).version + config.bannerBottom, {
        pkg,
      }))
    .pipe(size({
      title: 'MIN acte.min.js Size ->',
    }))
    .pipe(sourcemaps.write(config.paths.root))
    .pipe(gulp.dest(config.paths.dist));

  return stream;
});

// TASK Pour créer une archive.zip de la release
gulp.task('dist.zip', () => {
  const version = JSON.parse(fse.readFileSync('./package.json',
    'utf8')).version;
  const stream = gulp.src([`${config.paths.dist}/*.{min.js,map,md}`])
    .pipe(zip(`acte-${version}-dist.zip`))
    .pipe(gulp.dest(config.paths.dist));

  return stream;
});
