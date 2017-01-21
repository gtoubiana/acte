// http://makina-corpus.com/blog/metier/2015/make-your-gulp-modular
const gulp = require('gulp');
const requireDir = require('require-dir');
const taskListing = require('gulp-task-listing');

// Add a task to render the output
gulp.task('tasks', taskListing);

requireDir('./gulp/tasks', {
  recurse: true,
});
