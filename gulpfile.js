// http://makina-corpus.com/blog/metier/2015/make-your-gulp-modular
const gulp = require('gulp');
const requireDir = require('require-dir');
const taskListing = require('gulp-task-listing');

// TASK pour lister les taches
gulp.task('tasks', taskListing);

// INCLUSION des taches
requireDir('./gulp/tasks', {
  recurse: true,
});
