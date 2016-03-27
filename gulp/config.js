/**
 * Fichier de configuration des tâches Gulp
 * - Chemins
 * - Scripts pour générer acte.js
 * - Template du module UMD
 * - Template du jsdoc UMD
 */

// Chemins
var paths = {
  root: './',
  test: './test',
  scriptRequire: '../../dist/acte.js',
  dist: './dist',
  src: './src',
  tasks: './gulp/tasks',
  methodes: './src/js/methodes',
  constantes: './src/js/constantes',
  utilitaires: './src/js/utilitaires',
  jasmine: './test/jasmine',
  jasmineCore: './node_modules/jasmine-core/lib/jasmine-core',
  coverage: './test/coverage'
};

// Ordre des scripts pour générer acte.js
var acteScripts = [

  // Constantes
  paths.constantes + '/*.js',

  // Utilitaires pré-requis
  paths.utilitaires + '/degresVersRadians.js',
  paths.utilitaires + '/normaliserDegres.js',
  paths.utilitaires + '/radiansVersDegres.js',
  paths.utilitaires + '/reste.js',
  paths.utilitaires + '/sinus.js',
  paths.utilitaires + '/cosinus.js',
  paths.utilitaires + '/equinoxe.js',
  paths.utilitaires + '/deltaT.js',
  paths.utilitaires + '/obliquiteEcliptique.js',
  paths.utilitaires + '/positionSoleil.js',
  paths.utilitaires + '/nutation.js',
  paths.utilitaires + '/equationDuTemps.js',
  paths.utilitaires + '/fractionEquinoxe.js',
  paths.utilitaires + '/equinoxeAParis.js',
  paths.utilitaires + '/gregorienBissextile.js',
  paths.utilitaires + '/gregorienVersJj.js',
  paths.utilitaires + '/jjVersGregorien.js',

  // Utilitaires restants
  paths.utilitaires + '/*.js',

  // Utilitaires exclus
  '!' + paths.utilitaires + '/arabeVersRomain.js',
  '!' + paths.utilitaires + '/julienVersJj.js',

  // Methodes
  paths.methodes + '/*.js'
];
var acteBase = {
  base: 'src'
};

// Template du module UMD
var umd = '(function universalModuleDefinition(root, factory) {\n' +
  '  \'use strict\';\n' +
  '  var tempRoot = root;\n\n' +
  '  /* istanbul ignore next */\n' +
  '  if (typeof exports === \'object\' && typeof module === \'object\') {\n' +
  '    module.exports = factory();\n' +
  '  } else if (typeof define === \'function\' && define.amd) {\n' +
  '    define([], factory);\n' +
  '  } else if (typeof exports === \'object\') {\n' +
  '    exports.acte = factory();\n' +
  '  } else {\n' +
  '    tempRoot.acte = factory();\n' +
  '  }\n' +
  '}(this, function umdCallback() {\n' +
  '  \'use strict\';\n\n' +
  '  /** @namespace */\n' +
  '  /* eslint-disable no-use-before-define */\n' +
  '  var acte = acte || {};\n\n' +
  '  /* eslint-enable no-use-before-define */\n' +
  '<%= contents %>\n' +
  '  return acte;\n' +
  '}));\n\n';

// Template du jsdoc UMD
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentYearDisplay = (currentYear === 2015) ? 2015 : '2015-' +
  currentYear;

var banner = '/**\n' +
  ' * <%= pkg.name %> - <%= pkg.description %>\n' +
  ' * @copyright ' + currentYearDisplay + ', <%= pkg.author %>\n' +
  ' * @namespace acte\n' +
  ' * @version <%= pkg.version %>\n' +
  ' * @see {@link <%= pkg.homepage %>|Projet sur GitHub}\n' +
  ' * @license <%= pkg.license %>\n' +
  ' */\n';

// Export de la configuration
module.exports = {
  paths: paths,
  acteScripts: acteScripts,
  acteBase: acteBase,
  umd: umd,
  banner: banner
};
