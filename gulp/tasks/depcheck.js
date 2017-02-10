/** DEPCHECK (npm run update)
 * depcheck
 */

/* eslint-disable */

const depcheck = require('gulp-depcheck');
const gulp = require('gulp');

// Dépendances BABEL
require('babel-helper-transform-fixture-test-runner');
require('babel-plugin-check-es2015-constants');
require('babel-plugin-transform-es2015-arrow-functions');
require('babel-plugin-transform-es2015-block-scoped-functions');
require('babel-plugin-transform-es2015-block-scoping');
require('babel-plugin-transform-es2015-classes');
require('babel-plugin-transform-es2015-computed-properties');
require('babel-plugin-transform-es2015-destructuring');
require('babel-plugin-transform-es2015-duplicate-keys');
require('babel-plugin-transform-es2015-for-of');
require('babel-plugin-transform-es2015-function-name');
require('babel-plugin-transform-es2015-literals');
require('babel-plugin-transform-es2015-modules-commonjs');
require('babel-plugin-transform-es2015-object-super');
require('babel-plugin-transform-es2015-parameters');
require('babel-plugin-transform-es2015-shorthand-properties');
require('babel-plugin-transform-es2015-spread');
require('babel-plugin-transform-es2015-sticky-regex');
require('babel-plugin-transform-es2015-template-literals');
require('babel-plugin-transform-es2015-typeof-symbol');
require('babel-plugin-transform-es2015-unicode-regex');
require('babel-plugin-transform-es3-member-expression-literals');
require('babel-plugin-transform-es3-property-literals');
require('babel-plugin-transform-jscript');
require('babel-plugin-transform-object-assign');
require('babel-plugin-transform-regenerator');
require('babel-plugin-transform-undefined-to-void');
require('babel-plugin-transform-exponentiation-operator');
require('babel-plugin-syntax-trailing-function-commas');

// Dépendances ESLINT
require('eslint-config-airbnb');
require('eslint-plugin-import');
require('eslint-plugin-jsx-a11y');
require('eslint-plugin-react');

// Dépendances GULP
require('gulp-util');

// Dépendances KARMA
require('karma-chrome-launcher');
require('karma-firefox-launcher');
require('karma-jasmine');
require('karma-opera-launcher');
require('karma-safari-launcher');
require('karma-ie-launcher');
require('karma-sauce-launcher');

// Dépendances TESTS
require('jasmine');

/* eslint-enable */

// Vérifier les dépendances
gulp.task('depcheck', depcheck({
  ignoreDirs: ['docs', 'dist'],
  ignoreMatches: ['glob'],
}));
