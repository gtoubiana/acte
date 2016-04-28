/** TACHES PRINCIPALES DU FICHIER :
 * gulp generations
 */
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var config = require('../config');
var fs = require('graceful-fs');
var gulp = require('gulp');
var header = require('gulp-header');
var pkg = require('../../package.json');
var prettify = require('gulp-jsbeautifier');
var rename = require('gulp-rename');
var sequence = require('gulp-sequence');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');
var zip = require('gulp-zip');

// var rep = require('gulp-replace');

gulp.task('dist', sequence(

  // Générer le script acte
  'dist.acte',

  // Générer le script minifié de acte
  'dist.min',

  // Générer le zip de la release
  'dist.zip'

));

// TASK Pour générer le script ./dist/acte.js
gulp.task('dist.acte', function () {
  'use strict';
  return gulp.src(config.acteScripts)
    .pipe(concat('acte.js'))

    // .pipe(babel({
    //   presets: ['es2015'],
    // }))

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
        ['transform-es2015-modules-commonjs', { strict: false }]
      ]
    }))
    .pipe(wrap(config.umd))
    .pipe(header(config.bannerTop + JSON.parse(fs.readFileSync('./package.json',
      'utf8')).version + config.bannerBottom, {
        pkg: pkg
      }))
    .pipe(prettify({
      config: config.paths.dist + '/.jsbeautifyrc'
    }))
    .pipe(size({
      title: 'Original  acte.js Size ->'
    }))
    .pipe(gulp.dest(config.paths.dist));
});

// TASK Pour générer le script ./dist/acte.min.js
gulp.task('dist.min', function () {
  'use strict';
  return gulp.src(config.paths.dist + '/acte.js')
    .pipe(sourcemaps.init())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(header(config.bannerTop + JSON.parse(fs.readFileSync('./package.json',
      'utf8')).version + config.bannerBottom, {
        pkg: pkg
      }))
    .pipe(size({
      title: 'Minified  acte.min.js Size ->'
    }))
    .pipe(sourcemaps.write(config.paths.root))
    .pipe(gulp.dest(config.paths.dist));
});

// TASK Pour créer une archive.zip de la release
gulp.task('dist.zip', function () {
  'use strict';
  return gulp.src([config.paths.dist + '/*.{min.js,map,md}'])
    .pipe(zip('acte-' + JSON.parse(fs.readFileSync('./package.json',
      'utf8')).version + '-dist.zip'))
    .pipe(gulp.dest(config.paths.dist));
});
