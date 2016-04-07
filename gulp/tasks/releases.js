// https://github.com/gulpjs/gulp/blob/master/docs/recipes/automate-release-workflow.md
var gulp = require('gulp');
var sequence = require('gulp-sequence');
var cChangelog = require('gulp-conventional-changelog');
var cGithubReleaser = require('conventional-github-releaser');
var bump = require('gulp-bump');
var git = require('gulp-git');
var fs = require('fs');

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
    .pipe(cChangelog({

      // Or to any other commit message convention you use.
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('releases.github', function (done) {
  cGithubReleaser({
    type: 'oauth',

    /* CONVENTIONAL_GITHUB_RELEASER_TOKEN
     * le fichier karma/sauce.json NE DOIT JAMAIS ÊTRE DIVULGUÉ ! */
    token: require(__dirname + '/../../test/karma/sauce').cGithubReleaserToken
  }, {

    // Or to any other commit message convention you use.
    preset: 'angular'
  }, done);
});

gulp.task('releases.commit', function () {
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('releases.push', function (cb) {
  git.push('origin', 'gh-pages', cb);
});

gulp.task('releases.tag', function () {
  var version = function getPackageJsonVersion() {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  };

  git.tag(version, 'Created Tag for version: ' + version, function (err) {
    if (err) throw err;
  });
});

// Push with Tag
gulp.task('releases.pushtag', function (cb) {
  git.push('origin', 'gh-pages', { args: '--tags' }, cb);
});


// Tâche de la release
gulp.task('prerelease', sequence(

  // nettoyage des fichiers inutiles
  'nettoyages',

  // version patch
  'releases.prerelease',

  // nouveau build
  'default',

  // Génération du changelog
  'releases.changelog',

  // git commit
  'releases.commit',

  // git push
  'releases.push',

  // tag de la version
  'releases.tag',

  // git push du tag de la version
  'releases.pushtag',

  // github release
  'releases.github'

));
