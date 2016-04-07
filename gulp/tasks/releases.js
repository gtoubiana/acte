// https://github.com/gulpjs/gulp/blob/master/docs/recipes/automate-release-workflow.md
var gulp = require('gulp');
var bump = require('gulp-bump');

gulp.task('version.prerelease', function () {
  return gulp.src('./package.json')
  .pipe(bump({ type: 'prerelease' }))
  .pipe(gulp.dest('./'));
});

gulp.task('version.patch', function () {
  return gulp.src('./package.json')
  .pipe(bump({ type: 'patch' }))
  .pipe(gulp.dest('./'));
});

gulp.task('version.minor', function () {
  return gulp.src('./package.json')
  .pipe(bump({ type: 'minor' }))
  .pipe(gulp.dest('./'));
});

gulp.task('version.major', function () {
  return gulp.src('./package.json')
  .pipe(bump({ type: 'major' }))
  .pipe(gulp.dest('./'));
});
