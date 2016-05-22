/** TACHES PRINCIPALES DU FICHIER :
 * gulp pre
 * gulp patch
 * gulp minor
 * gulp major
 */
const bump = require('gulp-bump');
const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGHReleaser = require('conventional-github-releaser');
const gfs = require('graceful-fs');
const git = require('gulp-git');
const gulp = require('gulp');
const gutil = require('gulp-util');
const sequence = require('gulp-sequence');

gulp.task('releases.version.patch', () => {
  const stream = gulp.src(['./package.json'])
    .pipe(bump({ type: 'patch' }).on('error', gutil.log))
    .pipe(gulp.dest('./'));

  return stream;
});

gulp.task('releases.version.minor', () => {
  const stream = gulp.src(['./package.json'])
    .pipe(bump({ type: 'minor' }).on('error', gutil.log))
    .pipe(gulp.dest('./'));

  return stream;
});

gulp.task('releases.version.major', () => {
  const stream = gulp.src(['./package.json'])
    .pipe(bump({ type: 'major' }).on('error', gutil.log))
    .pipe(gulp.dest('./'));

  return stream;
});

gulp.task('releases.version.prerelease', () => {
  const stream = gulp.src(['./package.json'])
    .pipe(bump({ type: 'prerelease' }).on('error', gutil.log))
    .pipe(gulp.dest('./'));

  return stream;
});

gulp.task('releases.conventional.changelog', () => {
  const stream = gulp.src('CHANGELOG.md', {
    buffer: false,
  })
    .pipe(conventionalChangelog({
      preset: 'acte',
      releaseCount: 0,
    }))
    .pipe(gulp.dest('./'));

  return stream;
});

gulp.task('releases.commit', () => {
  const version = JSON.parse(
    gfs.readFileSync('./package.json', 'utf8')).version;
  const stream = gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit(`chore: release v${version}`));

  return stream;
});

gulp.task('releases.push', (cb) => {
  git.push('origin', 'master', cb);
});

gulp.task('releases.tag', (cb) => {
  /* eslint-disable consistent-return */
  const version = JSON.parse(
    gfs.readFileSync('./package.json', 'utf8')).version;

  git.tag(version, `chore: tag v${version}`, (error) => {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', { args: '--tags && npm publish' }, cb);
  });

  /* eslint-enable consistent-return */
});

gulp.task('releases.github.releaser', (done) => {
  conventionalGHReleaser({
    type: 'oauth',
    token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN,
  }, {
    preset: 'acte',
  }, (error, response) => {
    /* eslint-disable no-console */
    console.log(error, response);

    /* eslint-enable no-console */
    done();
  });
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
    'clean',
    'releases.version.prerelease',
    'default',
    'releases.github.publish'
));

gulp.task('patch', sequence(
    'clean',
    'releases.version.patch',
    'default',
    'releases.github.publish'
));

gulp.task('minor', sequence(
    'clean',
    'releases.version.minor',
    'default',
    'releases.github.publish'
));

gulp.task('major', sequence(
    'clean',
    'releases.version.major',
    'default',
    'releases.github.publish'
));
