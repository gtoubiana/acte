var gulp = require('gulp');
var sequence = require('gulp-sequence');

require('eslint-config-airbnb');
require('eslint-plugin-react');

// Tâche par défaut
gulp.task('default', sequence(

  // Validations de fichiers
  'validations',

  // Générations de fichiers
  'generations',

  // Spécifications des tests
  'specifications',

  // Couvertures des tests
  'couvertures',

  // Certification eslint airbnb/legacy du fichier acte.js
  'validation.script'
));
