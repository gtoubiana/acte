var depcheck = require('gulp-depcheck');
var gulp = require('gulp');

// dépendances
// require('babel-plugin-transform-es2015-ie8-classes');
require('babel-plugin-transform-es2015-classes');

// require('babel-plugin-transform-es5-property-mutators');
// require('babel-plugin-transform-jscript');
// require('babel-preset-es2015-loose-ie8');
require('babel-preset-es2015-without-strict');
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
require('babel-plugin-transform-es3-member-expression-literals');
require('babel-plugin-transform-es3-property-literals');


// Vérifier les dépendances
gulp.task('depcheck', depcheck({
  ignoreDirs: ['docs', 'build'],
  ignoreMatches: ['glob']
}));
