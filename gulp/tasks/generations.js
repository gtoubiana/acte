var concat = require('gulp-concat');
var config = require('../config');
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

// TEMPLATES Pour générer le jsdoc du module UMD
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentYearDisplay = (currentYear === 2015) ? 2015 : '2015-' +
  currentYear;

gulp.task('generations', sequence(

  // Générer le script acte
  'generation.script',

  // Générer le script minifié de acte
  'generation.script.min',

  // Générer la doc des constantes
  'generation.doc.constantes',

  // Générer la doc des utilitaires
  'generation.doc.utilitaires',

  // Générer la doc du script acte
  'generation.doc.dist',

  // Générer le fichier de licence
  'generation.licence',

  // Générer le zip de la release
  'generation.zip'
));

// TASK Pour générer le script ./dist/acte.js
gulp.task('generation.script', function () {
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
gulp.task('generation.script.min', function () {
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
gulp.task('generation.doc.dist', function () {
  'use strict';
  return gulp.src(config.paths.dist + '/acte.js')
    .pipe(rename('README.md'))
    .pipe(jsdoc2md())
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.dist));
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('generation.doc.constantes', function () {
  'use strict';
  return gulp.src(config.paths.constantes + '/*.js')
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.constantes));
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('generation.doc.utilitaires', function () {
  'use strict';
  return gulp.src(config.paths.utilitaires + '/*.js')
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.utilitaires));
});

// TASK Pour générer la licence
gulp.task('generation.licence', function () {
  'use strict';
  return gulp.src(config.paths.src + '/tmpl/licence.txt')
    .pipe(rename('LICENSE'))
    .pipe(rep('{DATE_LICENCE}', currentYearDisplay))
    .pipe(gulp.dest(config.paths.root));
});

// TASK Pour créer une archive.zip de la release
gulp.task('generation.zip', function () {
  'use strict';
  return gulp.src([config.paths.dist + '/*.{min.js,map,md}'])
    .pipe(zip('acte-dist.zip'))
    .pipe(gulp.dest(config.paths.dist));
});
