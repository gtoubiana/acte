/**
 * Fichier de configuration des tâches Gulp
 * - Chemins
 * - Scripts pour générer acte.js
 * - Template du module UMD
 * - Template du jsdoc UMD
 */

// Chemins
const paths = {
  bower: './bower_components',
  bowerBootstrap: './bower_components/bootstrap/dist',
  bowerJquery: './bower_components/jquery/dist',
  bowerJqueryUI: './bower_components/jquery-ui',
  bowerRespond: './bower_components/respond/dest',
  bowerShiv: './bower_components/html5shiv/dist',
  docs: './docs',
  dist: './dist',
  gulp: './gulp',
  gulpTask: './gulp/tasks',
  npm: './node_modules',
  npmJasmine: './node_modules/jasmine-core/lib/jasmine-core',
  partials: './src/docs/partials',
  priv: './src/js/private',
  privConst: './src/js/private/constants',
  privFunc: './src/js/private/functions',
  privPoly: './src/js/private/polyfills',
  pub: './src/js/public',
  pubConstr: './src/js/public/constructors',
  pubFunc: './src/js/public/functions',
  pubProto: './src/js/public/prototypes',
  reqActe: './lib/acte.js',
  root: './',
  src: './src',
  test: './test',
  testCov: './test/coverage',
  testJasmine: './test/jasmine',
};

// Ordre des scripts pour générer acte.js
const acteScripts = [

  // Constantes
  `${paths.privConst}/*.js`,

  // Fonctions pré-requises
  `${paths.privFunc}/degresVersRadians.js`,
  `${paths.privFunc}/normaliserDegres.js`,
  `${paths.privFunc}/radiansVersDegres.js`,
  `${paths.privFunc}/reste.js`,
  `${paths.privFunc}/sinus.js`,
  `${paths.privFunc}/cosinus.js`,
  `${paths.privFunc}/equinoxe.js`,
  `${paths.privFunc}/deltaT.js`,
  `${paths.privFunc}/obliquiteEcliptique.js`,
  `${paths.privFunc}/positionSoleil.js`,
  `${paths.privFunc}/nutation.js`,
  `${paths.privFunc}/equationDuTemps.js`,
  `${paths.privFunc}/fractionEquinoxe.js`,
  `${paths.privFunc}/equinoxeAParis.js`,
  `${paths.privFunc}/gregorienBissextile.js`,
  `${paths.privFunc}/gregorienVersJj.js`,
  `${paths.privFunc}/jjVersGregorien.js`,
  `${paths.privFunc}/initialeEnCapitale.js`,
  `${paths.privFunc}/premierOrdinalEnLettres.js`,
  `${paths.privFunc}/prefixeZero.js`,
  `${paths.privFunc}/nombreEnLettres.js`,
  `${paths.privFunc}/ordinauxEnLettres.js`,
  `${paths.privFunc}/nombreOrdinal.js`,
  `${paths.privFunc}/dateValide.js`,
  `${paths.privFunc}/periodeEnJours.js`,
  `${paths.privFunc}/semaineComplete.js`,

  // Fonctions restantes
  `${paths.privFunc}/*.js`,

  // Fonctions exclues (!)
  `!${paths.privFunc}/julienVersJj.js`,

  // Fonctions publiques
  `${paths.pubFunc}/*.js`,

  // Constructeurs publiques
  `${paths.pubConstr}/acte.Jour.js`,

  // Prototypes publiques
  `${paths.pubProto}/acte.Jour.prototype.gregorien.js`,
  `${paths.pubProto}/acte.Jour.prototype.julien.js`,
  `${paths.pubProto}/acte.Jour.prototype.republicain.js`,
];

// Template Jsdoc du module UMD
const bannerTop = `/*!
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
