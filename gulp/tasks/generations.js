var concat = require('gulp-concat');
var config = require('../config');
var fs = require('fs');
var gulp = require('gulp');
var header = require('gulp-header');
var jsdoc2md = require('gulp-jsdoc-to-markdown');
var lazypipe = require('lazypipe');
var pkg = require('../../package.json');
var rename = require('gulp-rename');
var rep = require('gulp-replace');
var sequence = require('gulp-sequence');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');
var zip = require('gulp-zip');

// Lazypipes
var lazyJsdocFr = lazypipe()
  .pipe(rep, /## Constants/g, '## Constantes')
  .pipe(rep, /## Functions/g, '## Utilitaires')
  .pipe(rep, /\*\*Kind\*\*:/g, '**Type** :')
  .pipe(rep, /\*\*Access:\*\*/g, '**Accès** :')
  .pipe(rep, /\*\*Chainable\*\*/g, '**Fonction chainable**')
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

gulp.task('generations', sequence(

  // Générer le script acte
  'generations.script',

  // Générer le script minifié de acte
  'generations.script.min',

  // Générer la doc des constantes
  'generations.doc.constantes',

  // Générer la doc des utilitaires
  'generations.doc.utilitaires',

  // Générer la doc du script acte
  'generations.doc.dist',

  // Générer le zip de la release
  'generations.zip'

));

// TASK Pour générer le script ./dist/acte.js
gulp.task('generations.script', function () {
  'use strict';
  return gulp.src(config.acteScripts, config.acteBase)
    .pipe(concat('acte.js'))
    .pipe(wrap(config.umd))
    .pipe(header(config.banner, {
      pkg: pkg
    }))
    .pipe(size({
      title: 'Original  acte.js Size ->'
    }))
    .pipe(gulp.dest(config.paths.dist));
});

// TASK Pour générer le script ./dist/acte.min.js
gulp.task('generations.script.min', function () {
  'use strict';
  return gulp.src(config.paths.dist + '/acte.js')
    .pipe(sourcemaps.init())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(header(config.banner, {
      pkg: pkg
    }))
    .pipe(size({
      title: 'Minified  acte.min.js Size ->'
    }))
    .pipe(sourcemaps.write(config.paths.root))
    .pipe(gulp.dest(config.paths.dist));
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('generations.doc.dist', function () {
  'use strict';
  return gulp.src(config.paths.dist + '/acte.js')
    .pipe(rename('README.md'))
    .pipe(jsdoc2md({ template: fs.readFileSync(config.paths.src +
      '/tmpl/docDist.hbs', 'utf8') }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.dist));
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('generations.doc.constantes', function () {
  'use strict';
  return gulp.src(config.paths.constantes + '/*.js')
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true,
      template: fs.readFileSync(config.paths.src +
        '/tmpl/docConstantes.hbs', 'utf8')
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.constantes));
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('generations.doc.utilitaires', function () {
  'use strict';
  return gulp.src(config.paths.utilitaires + '/*.js')
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true,
      template: fs.readFileSync(config.paths.src +
        '/tmpl/docUtilitaires.hbs', 'utf8')
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.utilitaires));
});

// TASK Pour créer une archive.zip de la release
gulp.task('generations.zip', function () {
  'use strict';

  return gulp.src([config.paths.dist + '/*.{min.js,map,md}'])
    .pipe(zip('acte-' + pkg.version + '-dist.zip'))
    .pipe(gulp.dest(config.paths.dist));
});
