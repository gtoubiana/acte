var gulp = require('gulp');
var Server = require('karma').Server;

// Effectuer les tests dans SauceLabs avec Karma
gulp.task('saucelabs', function (done) {
  new Server({
    configFile: __dirname + '/../../test/karma/karma.conf.js',
    singleRun: true
  }, done).start();
});
