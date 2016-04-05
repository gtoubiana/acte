var gulp = require('gulp');
var sequence = require('gulp-sequence');

require('eslint-config-airbnb');
require('eslint-plugin-react');
require('karma-jasmine');
require('karma-sauce-launcher');

// Tâche CI par défaut
gulp.task('ci', sequence(

  // Validations de fichiers
  'validations',

  // Générations de fichiers
  'generations',

  // Spécifications des tests
  'specifications',

  // Couvertures des tests avec istanbul et COVERALLS
  'couvertures',

  // Certification eslint airbnb/legacy du fichier acte.js
  'validations.script'

));

// Tâche CI pour node 5
gulp.task('services', sequence(

  // Tests karma avec SAUCELABS
  'specifications.karma'
));
