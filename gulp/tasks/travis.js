var gulp = require('gulp');
var sequence = require('gulp-sequence');

// Tâche Travis par défaut
gulp.task('travis', sequence(

  // Validations de fichiers
  'validations',

  // Générations de fichiers
  'generations',

  // Spécifications des tests
  'specifications',

  // Couvertures des tests avec istanbul et COVERALLS
  'couvertures',

  // Certification eslint airbnb/legacy du fichier acte.js
  'certifications'

));
