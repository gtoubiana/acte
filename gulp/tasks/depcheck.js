var depcheck = require('gulp-depcheck');
var gulp = require('gulp');

// Vérifier les dépendances
gulp.task('depcheck', depcheck({
  ignoreDirs: ['docs', 'build'],
  ignoreMatches: ['glob']
}));
