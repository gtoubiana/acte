/**
 * Fichier de configuration des tâches Gulp
 * - Chemins
 * - Scripts pour générer acte.js
 * - Template du module UMD
 * - Template du jsdoc UMD
 */

// Chemins
const paths = {
  root: './',
  test: './test',
  scriptRequire: './lib/acte.js',
  dist: './dist',
  demo: './demo',
  src: './src',
  tasks: './gulp/tasks',
  class: './src/js/public/constructors',
  const: './src/js/private/constants',
  func: './src/js/private/functions',
  proto: './src/js/public/prototypes',
  poly: './src/js/polyfills',
  jasmine: './test/jasmine',
  jasmineCore: './node_modules/jasmine-core/lib/jasmine-core',
  coverage: './test/coverage',
  bootstrapBower: './bower_components/bootstrap/dist',
  jqueryBower: './bower_components/jquery/dist',
  html5shivBower: './bower_components/html5shiv/dist',
  respondBower: './bower_components/respond/dest',
};

// Ordre des scripts pour générer acte.js
const acteScripts = [

  // Constantes
  `${paths.const}/*.js`,

  // Fonctions pré-requises
  `${paths.func}/degresVersRadians.js`,
  `${paths.func}/normaliserDegres.js`,
  `${paths.func}/radiansVersDegres.js`,
  `${paths.func}/reste.js`,
  `${paths.func}/sinus.js`,
  `${paths.func}/cosinus.js`,
  `${paths.func}/equinoxe.js`,
  `${paths.func}/deltaT.js`,
  `${paths.func}/obliquiteEcliptique.js`,
  `${paths.func}/positionSoleil.js`,
  `${paths.func}/nutation.js`,
  `${paths.func}/equationDuTemps.js`,
  `${paths.func}/fractionEquinoxe.js`,
  `${paths.func}/equinoxeAParis.js`,
  `${paths.func}/gregorienBissextile.js`,
  `${paths.func}/gregorienVersJj.js`,
  `${paths.func}/jjVersGregorien.js`,
  `${paths.func}/initialeEnCapitale.js`,
  `${paths.func}/premierOrdinalEnLettres.js`,
  `${paths.func}/prefixeZero.js`,
  `${paths.func}/nombreEnLettres.js`,
  `${paths.func}/ordinauxEnLettres.js`,
  `${paths.func}/nombreOrdinal.js`,
  `${paths.func}/dateValide.js`,
  `${paths.func}/periodeEnJours.js`,
  `${paths.func}/semaineComplete.js`,

  // Fonctions restantes
  `${paths.func}/*.js`,

  // Fonctions exclues (!)
  `!${paths.func}/julienVersJj.js`,

  // Constructeurs
  `${paths.class}/Jour.js`,

  // Prototypes
  `${paths.proto}/Jour.prototype.gregorien.js`,
  `${paths.proto}/Jour.prototype.julien.js`,
  `${paths.proto}/Jour.prototype.republicain.js`,
];

// Template Jsdoc du module UMD
const bannerTop = `/**
 * <%= pkg.name %> - <%= pkg.description %>.
 * @copyright 2015-Present, <%= pkg.author %>
 * @namespace acte
 * @version `;
const bannerBottom = `
 * @see {@link <%= pkg.homepage %>|Projet sur GitHub}
 * @license <%= pkg.license %>
 */

`;

// Template du module UMD
const umd = `(function universalModuleDefinition(root, factory) {
  var tempRoot = root;

  /* istanbul ignore next */
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    exports.acte = factory();
  } else {
    tempRoot.acte = factory();
  }
}(this, function umdCallback() {
  'use strict';

  /** @namespace */
  /* eslint-disable no-use-before-define */
  var acte = acte || {};
  /* eslint-enable no-use-before-define */
  /* istanbul ignore next */
<%= contents %>
  return acte;
}));

`;

// Export de la configuration
module.exports = {
  paths,
  acteScripts,
  umd,
  bannerTop,
  bannerBottom,
};
