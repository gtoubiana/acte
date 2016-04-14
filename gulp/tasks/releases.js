/** TACHES PRINCIPALES DU FICHIER :
 * gulp releases.pre => supprimer au profit de gulp pre
 * gulp releases.patch => supprimer au profit de gulp patch
 * gulp releases.minor => supprimer au profit de gulp minor
 * gulp releases.major => supprimer au profit de gulp major
 * gulp pre
 */
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/automate-release-workflow.md
var gulp = require('gulp');
var sequence = require('gulp-sequence');
var conventionalChangelog = require('gulp-conventional-changelog');
var conventionalGHReleaser = require('conventional-github-releaser');
var bump = require('gulp-bump');
var gutil = require('gulp-util');
var git = require('gulp-git');
var fs = require('fs');

// Récupère le numéro de version dans le package.json
var getPackageJsonVersion = function getPackageJsonVersion() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
};

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

      // Traduction du 'angular' preset (./.changelogrc)
      preset: 'custom',
      releaseCount: 0
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('releases.commit', function () {
  var version = getPackageJsonVersion();

  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('chore: release v' + version));
});

gulp.task('releases.push', function (cb) {
  git.push('origin', 'gh-pages', cb);
});

gulp.task('releases.tag', function (cb) {
  var version = getPackageJsonVersion();

  /* eslint-disable consistent-return */
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

    // Traduction du 'angular' preset (./.changelogrc)
    preset: 'custom'
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
