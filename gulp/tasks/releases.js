// https://github.com/gulpjs/gulp/blob/master/docs/recipes/automate-release-workflow.md
var bump = require('gulp-bump');
var conventionalChangelog = require('gulp-conventional-changelog');
var gulp = require('gulp');

gulp.task('releases.prerelease', function () {
  gulp.src('./package.json')
  .pipe(bump({ type: 'prerelease' }))
  .pipe(gulp.dest('./'));
});

gulp.task('releases.patch', function () {
  gulp.src('./package.json')
  .pipe(bump({ type: 'patch' }))
  .pipe(gulp.dest('./'));
});

gulp.task('releases.minor', function () {
  gulp.src('./package.json')
  .pipe(bump({ type: 'minor' }))
  .pipe(gulp.dest('./'));
});

gulp.task('releases.major', function () {
  gulp.src('./package.json')
  .pipe(bump({ type: 'major' }))
  .pipe(gulp.dest('./'));
});

gulp.task('releases.changelog', function () {
  return gulp.src('CHANGELOG.md', {
    buffer: false
  })
    .pipe(conventionalChangelog({

      // Or to any other commit message convention you use.
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});
