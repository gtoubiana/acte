var gulp = require('gulp');
var Server = require('karma').Server;

// Effectuer les tests dans SauceLabs avec Karma
gulp.task('saucelabs', function (done) {
  new Server({
    configFile: __dirname + '/../karma.conf-ci.js',
    singleRun: true
  }, done).start();
});
