/** RELEASES
 * releases.commit
 * releases.github.publish
 * releases.github.releaser
 * releases.major
 * releases.minor
 * releases.patch
 * releases.pre
 * releases.push
 * releases.tag
 * releases.version.major
 * releases.version.minor
 * releases.version.patch
 * releases.version.prerelease
 * major
 * minor
 * patch
 * pre
 */

const bump = require('gulp-bump');
const compareFunc = require('compare-func');
const config = require('../config');
const conventionalGHReleaser = require('conventional-github-releaser');
const fse = require('fs-extra');
const git = require('gulp-git');
const Github = require('github');
const gufg = require('github-url-from-git');
const gulp = require('gulp');
const gutil = require('gulp-util');
const pkg = require('../../package.json');
const sequence = require('gulp-sequence');

const issueUrl = () => {
  /* eslint-disable strict */

  'use strict';

  const url = null;
  let gitUrl;
  let newUrl;

  if (pkg.repository && pkg.repository.url &&
   -(parseInt(pkg.repository.url.indexOf('github.com'), 10) + 1)) {
    gitUrl = gufg(pkg.repository.url);

    if (gitUrl) {
      newUrl = `${gitUrl}/issues/`;
    } else {
      newUrl = url;
    }
  }

  /* eslint-enable strict */
  return newUrl;
};

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

gulp.task('releases.commit', () => {
  const version = JSON.parse(
    fse.readFileSync('./package.json', 'utf8')).version;
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
    fse.readFileSync('./package.json', 'utf8')).version;

  git.tag(version, `chore: tag v${version}`, (error) => {
    if (error) {
      return cb(error);
    }

    git.push('origin', 'master', { args: '--tags && npm publish' }, cb);
  });

  /* eslint-enable consistent-return */
});

gulp.task('releases.github.releaser', (done) => {
  const auth = {
    type: 'oauth',
    token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN,
  };
  const github = new Github({
    version: '3.0.0',
  });
  const version = JSON.parse(
    fse.readFileSync('./package.json', 'utf8')).version;

  conventionalGHReleaser(auth, {
    preset: 'angular',
  }, {
    commit: 'commit',
  }, {}, {}, {
    mainTemplate: fse.readFileSync(
      `${config.paths.partials}/changelogMain.hbs`, 'utf8'),
    commitPartial: fse.readFileSync(
      `${config.paths.partials}/changelogCommit.hbs`, 'utf8'),
    footerPartial: fse.readFileSync(
      `${config.paths.partials}/changelogFooter.hbs`, 'utf8'),
    transform: function transform(commit) {
      /* eslint-disable no-param-reassign,strict */

      'use strict';

      let discard = true;

      commit.notes.forEach((note) => {
        note.title = 'RÉTROCOMPATIBILITÉ';
        discard = false;
      });

      if (commit.type === 'feat') {
        commit.type = '<span><span><span>Nouveautés</span></span></span>';
      } else if (commit.type === 'fix' || commit.type === 'debug') {
        commit.type = '<span><span>Correctifs</span></span>';
      } else if (commit.type === 'perf' || commit.type === 'perfs') {
        commit.type = '<span>Performances</span>';
      } else if (discard) {
        return false;
      } else if (commit.type === 'revert') {
        commit.type = 'Annulations';
      } else if (commit.type === 'doc' || commit.type === 'docs') {
        commit.type = 'Documentation';
      } else if (commit.type === 'style' || commit.type === 'styles') {
        commit.type = 'Mise en forme';
      } else if (commit.type === 'refactor' || commit.type === 'revision' ||
        commit.type === 'revisions') {
        commit.type = 'Réécriture du code';
      } else if (commit.type === 'test' || commit.type === 'tests') {
        commit.type = 'Ajout de tests unitaires';
      } else if (commit.type === 'chore' || commit.type === 'chores' ||
        commit.type === 'admin' || commit.type === 'shore') {
        commit.type = 'Administration du projet';
      }

      if (commit.scope === '*') {
        commit.scope = '';
      }

      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7);
      }

      if (typeof commit.subject === 'string') {
        const url = issueUrl();

        if (url) {
          // GitHub issue URLs
          commit.subject = commit.subject.replace(/( ?)#([0-9]+)(\b|^)/g,
          `$1[#$2](${url}$2)$3`);
        }

        // GitHub user URLs
        commit.subject = commit.subject.replace(
         /( ?)@([a-zA-Z0-9_]+)(\b|^)/g,
         '$1[@$2](https://github.com/$2)$3');
        commit.subject = commit.subject;
      }

      /* eslint-enable no-param-reassign,strict */
      return commit;
    },

    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'subject',
    notesSort: compareFunc,
  }, (error, response) => {
    // jscs:disable
    /* eslint-disable no-console */
    console.log(error, response);

    /* eslint-enable no-console */
    // jscs:enable

    github.authenticate(auth);
    github.repos.uploadAsset({
      owner: 'gtoubiana',
      repo: 'acte',
      id: response[0].value.id,
      name: `acte-${version}-dist.zip`,
      filePath: `./dist/acte-${version}-dist.zip`,
    }, done);
  });
});

/* eslint-disable comma-dangle */
gulp.task('releases.github.publish', sequence(
    'releases.commit',
    'releases.push',
    'releases.tag',
    'releases.github.releaser'
));

gulp.task('releases.pre', sequence(

    // Augmente le numéro de version en prerelease
    // exemple : 1.2.3 => 1.2.4-0 et 1.2.4-0 => 1.2.4-1
    'releases.version.prerelease',
    'releases.github.publish'
));

gulp.task('releases.patch', sequence(

    // Augmente le numéro de version en patch
    // exemple : 1.2.3 => 1.2.4 et 1.2.4-1 => 1.2.4
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

/* eslint-enable comma-dangle */
