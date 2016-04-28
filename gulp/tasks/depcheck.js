var depcheck = require('gulp-depcheck');
var gulp = require('gulp');

// dépendances
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
require('babel-plugin-transform-regenerator');
require('eslint-config-airbnb');
require('eslint-plugin-import');
require('eslint-plugin-jsx-a11y');
require('eslint-plugin-react');
require('gulp-stats')(gulp);
require('gulp-util');
require('karma-chrome-launcher');
require('karma-firefox-launcher');
require('karma-jasmine');
require('karma-opera-launcher');
require('karma-safari-launcher');
require('karma-sauce-launcher');

// Vérifier les dépendances
gulp.task('depcheck', depcheck({
  ignoreDirs: ['docs', 'build'],
  ignoreMatches: ['glob']
}));
