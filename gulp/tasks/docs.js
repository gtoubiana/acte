/** TACHES PRINCIPALES DU FICHIER :
 * gulp docs.dist
 * gulp docs.constants
 * gulp docs.functions
 */
var concat = require('gulp-concat');
var config = require('../config');
var fs = require('fs');
var gulp = require('gulp');
var jsdoc2md = require('gulp-jsdoc-to-markdown');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var rep = require('gulp-replace');
var sequence = require('gulp-sequence');

// Lazypipes
var lazyJsdocFr = lazypipe()
  .pipe(rep, /## Constants/g, '## Constantes')
  .pipe(rep, /## Functions/g, '## Utilitaires')
  .pipe(rep, /\*\*Kind\*\*:/g, '**Type** :')
  .pipe(rep, /\*\*Access:\*\*/g, '**Accès** :')
  .pipe(rep, /\*\*Chainable\*\*/g, '**Méthode chainable**')
  .pipe(rep, /\*\*See\*\*:/g, '**Voir** :')
  .pipe(rep, /\*\*Since\*\*:/g, '**Depuis** :')
  .pipe(rep, /\*\*Version\*\*:/g, '**Version** :')
  .pipe(rep, /\*\*Author:\*\*/g, '**Auteur** :')
  .pipe(rep, /\*\*License\*\*:/g, '**Licence** :')
  .pipe(rep, /\*\*Copyright\*\*:/g, '**Copyright** :')
  .pipe(rep, /\*\*Returns\*\*:/g, '**Résultat** :')
  .pipe(rep, /\*\*Example\*\*/g, '**Exemple** :')
  .pipe(rep, /<code>object<\/code>/gi, '<code>Objet</code>')
  .pipe(rep, /<code>function<\/code>/gi, '<code>Fonction</code>')
  .pipe(rep, /<code>String<\/code>/gi, '<code>Chaîne</code>')
  .pipe(rep, /<code>Boolean<\/code>/gi, '<code>Booléen</code>')
  .pipe(rep, /<code>Number<\/code>/gi, '<code>Nombre</code>')
  .pipe(rep, /<code>Array<\/code>/gi, '<code>Tableau</code>')
  .pipe(rep, '| Param |', '| Paramètres |')
  .pipe(rep, '| Default |', '| Par défaut |')
  .pipe(rep, ': global namespace', ': Espace de noms global')
  .pipe(rep, ': private', ': privé')
  .pipe(rep, ': global constant', ': Constante')
  .pipe(rep, ': global function', ': Fonction')
  .pipe(rep, ': static class of', ': Classe statique de')
  .pipe(rep, ': instance method of', ': Méthode d\'instance de');

  // .pipe(rep, ' ↩︎', '')

gulp.task('docs', sequence(
  'docs.dist',
  'docs.constants',
  'docs.functions'
));

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('docs.dist', function () {
  'use strict';
  return gulp.src(config.paths.dist + '/acte.js')
    .pipe(rename('README.md'))
    .pipe(jsdoc2md({ template: fs.readFileSync(config.paths.src +
      '/tmpl/docDist.hbs', 'utf8') }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.dist));
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('docs.constants', function () {
  'use strict';
  return gulp.src(config.paths.const + '/*.js')
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true,
      'sort-by': 'name',
      template: fs.readFileSync(config.paths.src +
        '/tmpl/docConstants.hbs', 'utf8')
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.const));
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('docs.functions', function () {
  'use strict';
  return gulp.src(config.paths.func + '/*.js')
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true,
      'sort-by': 'name',
      template: fs.readFileSync(config.paths.src +
        '/tmpl/docFunctions.hbs', 'utf8')
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.func));
});
