/** LINT
 * lint.constants
 * lint.constructors
 * lint.dist
 * lint.docs.css
 * lint.docs.html
 * lint.docs.js
 * lint.gulp
 * lint.private.functions
 * lint.prototypes
 * lint.public.functions
 * lint.specs
 * lint.src
 * lint.test
 */

const concat = require('gulp-concat');
const config = require('../config');
const gulpStylelint = require('gulp-stylelint');
const eslint = require('gulp-eslint');
const validator = require('html-validator');
const fse = require('fs-extra');
const gulp = require('gulp');
const jscs = require('gulp-jscs');
const lazypipe = require('lazypipe');
const prettify = require('gulp-jsbeautifier');
const sequence = require('gulp-sequence');
const stylish = require('gulp-jscs-stylish');
const remarklint = require('gulp-remark-lint-dko');

const lazyLint = lazypipe()
  .pipe(eslint)
  .pipe(eslint.format)
  .pipe(eslint.failAfterError);
const lazyPrettyLint = lazypipe()
  .pipe(prettify, {
    config: `${config.paths.src}/.jsbeautifyrc`,
  })
  .pipe(lazyLint);

/* eslint-disable comma-dangle */
gulp.task('lint.src', sequence(
  'lint.constants',
  'lint.functions',
  'lint.constructors',
  'lint.prototypes'
));

gulp.task('lint.test', sequence(
  'lint.specs'
));

/* eslint-enable comma-dangle */

// Valider les scripts Gulp
gulp.task('lint.gulp', () => {
  const stream = gulp.src([`${config.paths.gulpTask}/*.js`])
    .pipe(lazyLint())
    .pipe(gulp.dest(config.paths.gulpTask));

  return stream;
});

// Valider les scripts ./test
gulp.task('lint.specs', () => {
  const stream = gulp.src([`${config.paths.test}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(gulp.dest(config.paths.test));

  return stream;
});

// Valider les scripts ./src/js/constants/
gulp.task('lint.constants', () => {
  const stream = gulp.src([`${config.paths.privConst}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(config.paths.privConst));

  return stream;
});

// Valider les scripts ./src/js/private-functions/
gulp.task('lint.private.functions', () => {
  const stream = gulp.src([`${config.paths.privFunc}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(config.paths.privFunc));

  return stream;
});

// Valider les scripts ./src/js/public-functions/
gulp.task('lint.public.functions', () => {
  const stream = gulp.src([`${config.paths.pubFunc}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(config.paths.pubFunc));

  return stream;
});

// Valider les scripts ./src/js/classes/
gulp.task('lint.constructors', () => {
  const stream = gulp.src([`${config.paths.pubConstr}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(config.paths.pubConstr));

  return stream;
});

// Valider les scripts ./src/js/prototypes/
gulp.task('lint.prototypes', () => {
  const stream = gulp.src([`${config.paths.pubProto}/*.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(config.paths.pubProto));

  return stream;
});

gulp.task('lint.dist', () => {
  const stream = gulp.src(config.acteScripts)
    .pipe(concat('acte.TEMP.ES2015.js'))
    .pipe(prettify({
      config: `${config.paths.src}/.jsbeautifyrc`,
    }))
    .pipe(eslint({
      rules: {
        'no-unused-vars': 1,
        'no-use-before-define': 1,
        'no-shadow': 1,
      },
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish());

  return stream;
});

// Valider les scripts ./src/docs/js/
gulp.task('lint.docs.js', () => {
  const stream = gulp.src([`${config.paths.src}/docs/js/demo-script.js`])
    .pipe(lazyPrettyLint())
    .pipe(jscs({ configPath: './src/js/.jscsrc' }))
    .pipe(stylish())
    .pipe(gulp.dest(`${config.paths.src}/docs/js/`));

  return stream;
});

// Valider les css ./src/docs/css/
gulp.task('lint.docs.css', () => {
  const stream = gulp.src([`${config.paths.src}/docs/css/demo-theme.css`])
    .pipe(prettify({
      config: `${config.paths.src}/.jsbeautifyrc`,
    }))
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true },
      ],
    }))
    .pipe(stylish())
    .pipe(gulp.dest(`${config.paths.src}/docs/css/`));

  return stream;
});

// Valider les html ./docs/*.html
gulp.task('lint.docs.html', () => {
  const options = {
    format: 'text',

    validator: 'http://html5.validator.nu',

    // validator: 'http://validator.w3.org/nu/',
  };

  fse.readFile(`${config.paths.docs}/index.html`, 'utf8', (err, html) => {
    if (err) {
      throw err;
    }

    options.data = html;

    /* eslint-disable no-console */
    validator(options)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    /* eslint-enable no-console */
  });
});

gulp.task('lint.md', () => {
  const stream = gulp.src([
    'docs/*.md', 'src/docs/*.md', 'src/*.md', 'test/*.md', './*.md',
  ])
    .pipe(remarklint({
      rules: {
        blockquoteIndentation: 'consistent',
        checkboxCharacterStyle: 'consistent',
        codeBlockStyle: 'consistent',
        emphasisMarker: 'consistent',
        fencedCodeMarker: 'consistent',
        finalNewline: true,
        hardBreakSpaces: true,
        headingStyle: 'consistent',
        linkTitleStyle: 'consistent',
        listItemBulletIndent: true,
        listItemContentIndent: true,
        listItemIndent: 'tab-size',
        noAutoLinkWithoutProtocol: true,
        noBlockquoteWithoutCaret: true,
        noDuplicateDefinitions: true,
        noHeadingContentIndent: true,
        noInlinePadding: true,
        noLiteralUrls: true,
        noShortcutReferenceImage: true,
        noShortcutReferenceLink: true,
        noUndefinedReferences: true,
        noUnusedDefinitions: true,
        orderedListMarkerStyle: '.',
        ruleStyle: 'consistent',
        strongMarker: 'consistent',
        tableCellPadding: 'consistent',
      },
    }))
    .pipe(remarklint.report());

  return stream;
});
