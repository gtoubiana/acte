/** TACHES PRINCIPALES DU FICHIER :
 * gulp pre
 * gulp patch
 * gulp minor
 * gulp major
 */
var gulp = require('gulp');
var sequence = require('gulp-sequence');
var conventionalChangelog = require('gulp-conventional-changelog');
var conventionalGHReleaser = require('conventional-github-releaser');
var bump = require('gulp-bump');
var gutil = require('gulp-util');
var git = require('gulp-git');
var fs = require('fs');

gulp.task('releases.version.patch', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'patch' }).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('releases.version.minor', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'minor' }).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('releases.version.major', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'major' }).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('releases.version.prerelease', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'prerelease' }).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('releases.conventional.changelog', function () {
  return gulp.src('CHANGELOG.md', {
    buffer: false
  })
    .pipe(conventionalChangelog({
      preset: 'angular',
      releaseCount: 0
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('releases.commit', function () {
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('chore: release v' +
      JSON.parse(fs.readFileSync('./package.json', 'utf8')).version));
});

gulp.task('releases.push', function (cb) {
  git.push('origin', 'gh-pages', cb);
});

gulp.task('releases.tag', function (cb) {
  /* eslint-disable consistent-return */
  var version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;

  git.tag(version, 'chore: tag v' + version, function (error) {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'gh-pages', { args: '--tags && npm publish' }, cb);
  });

  /* eslint-enable consistent-return */
});

gulp.task('releases.github.releaser', function (done) {
  conventionalGHReleaser({
    type: 'oauth',
    token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
  }, {
    preset: 'angular'
  }, done);
});

gulp.task('releases.github.publish', sequence(
    'releases.conventional.changelog',
    'releases.commit',
    'releases.push',
    'releases.tag',
    'releases.github.releaser'
));

gulp.task('releases.pre', sequence(

    // Augmente le numéro de version en prerelease
    // exemple : 1.2.3 => 1.2.4-0 ou 1.2.4-0 => 1.2.4-1
    'releases.version.prerelease',
    'releases.github.publish'
));

gulp.task('releases.patch', sequence(

    // Augmente le numéro de version en patch
    // exemple : 1.2.3 => 1.2.4 ou 1.2.4-1 => 1.2.4
    'releases.version.patch',
    'releases.github.publish'
));

gulp.task('releases.minor', sequence(

    // Augmente le numéro de version en mineur
    // exemple : 1.2.3 => 1.3.0
    'releases.version.minor',
    'releases.github.publish'
));

gulp.task('releases.major', sequence(

    // Augmente le numéro de version en majeur
    // exemple : 1.2.3 => 2.0.0
    'releases.version.major',
    'releases.github.publish'
));

gulp.task('pre', sequence(
    'nettoyages',
    'releases.version.prerelease',
    'default',
    'releases.github.publish'
));

gulp.task('patch', sequence(
    'nettoyages',
    'releases.version.patch',
    'default',
    'releases.github.publish'
));

gulp.task('minor', sequence(
    'nettoyages',
    'releases.version.minor',
    'default',
    'releases.github.publish'
));

gulp.task('major', sequence(
    'nettoyages',
    'releases.version.major',
    'default',
    'releases.github.publish'
));
