/** TACHES PRINCIPALES DU FICHIER :
 * gulp docs.dist
 * gulp docs.constants
 * gulp docs.functions
 * gulp docs.readme
 */
const concat = require('gulp-concat');
const config = require('../config');
const fse = require('fs-extra');
const gulp = require('gulp');
const hb = require('gulp-hb');
const jsdoc2md = require('gulp-jsdoc-to-markdown');
const lazypipe = require('lazypipe');
const rename = require('gulp-rename');
const rep = require('gulp-replace');
const sequence = require('gulp-sequence');

// Lazypipes
const lazyJsdocFr = lazypipe()
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
  .pipe(rep, ': static method of', ': Méthode statique de')
  .pipe(rep, ': instance method of', ': Méthode d\'instance de')
  .pipe(rep, ': instance property of', ': Propriété d\'instance de');

// .pipe(rep, ' ↩︎', '')

gulp.task('docs', sequence(
  'docs.dist',
  'docs.constants',
  'docs.functions'
));

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('docs.dist', () => {
  const stream = gulp.src(`${config.paths.testJasmine}/lib/acte.js`)
    .pipe(rename('README.md'))
    .pipe(jsdoc2md({
      template: fse.readFileSync(
        `${config.paths.src}/docs/docDist.hbs`, 'utf8'),
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.dist));

  return stream;
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('docs.constants', () => {
  const stream = gulp.src(`${config.paths.privConst}/*.js`)
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true,
      'sort-by': 'name',
      template: fse.readFileSync(
        `${config.paths.src}/docs/docConstants.hbs`,
        'utf8'),
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.privConst));

  return stream;
});

// TASK Pour générer une doc .md à partir du jsdoc
gulp.task('docs.functions', () => {
  const stream = gulp.src(`${config.paths.privFunc}/*.js`)
    .pipe(concat('README.md'))
    .pipe(jsdoc2md({
      private: true,
      'sort-by': 'name',
      template: fse.readFileSync(
        `${config.paths.src}/docs/docFunctions.hbs`,
        'utf8'),
    }))
    .pipe(lazyJsdocFr())
    .pipe(gulp.dest(config.paths.privFunc));

  return stream;
});

// TASK Pour générer un README.md à partir d'un template .hbs'
gulp.task('docs.readme', () => {
  const stream = gulp.src(`${config.paths.src}/docs/README.hbs`)
    .pipe(rename({ extname: '.md' }))
    .pipe(hb({
      data: JSON.parse(fse.readFileSync('./package.json',
        'utf8')),
    }))
    .pipe(gulp.dest(config.paths.root));

  return stream;
});
