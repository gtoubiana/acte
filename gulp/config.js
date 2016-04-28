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
  class: './src/js/public/classes/constructors',
  const: './src/js/private/constants',
  func: './src/js/private/functions',
  proto: './src/js/public/classes/prototypes',
  jasmine: './test/jasmine',
  jasmineCore: './node_modules/jasmine-core/lib/jasmine-core',
  coverage: './test/coverage'
};

// Ordre des scripts pour générer acte.js
var acteScripts = [

  // Constantes
  paths.const + '/*.js',

  // Fonctions pré-requises
  paths.func + '/degresVersRadians.js',
  paths.func + '/normaliserDegres.js',
  paths.func + '/radiansVersDegres.js',
  paths.func + '/reste.js',
  paths.func + '/sinus.js',
  paths.func + '/cosinus.js',
  paths.func + '/equinoxe.js',
  paths.func + '/deltaT.js',
  paths.func + '/obliquiteEcliptique.js',
  paths.func + '/positionSoleil.js',
  paths.func + '/nutation.js',
  paths.func + '/equationDuTemps.js',
  paths.func + '/fractionEquinoxe.js',
  paths.func + '/equinoxeAParis.js',
  paths.func + '/gregorienBissextile.js',
  paths.func + '/gregorienVersJj.js',
  paths.func + '/jjVersGregorien.js',

  // Fonctions restantes
  paths.func + '/*.js',

  // Fonctions exclues
  '!' + paths.func + '/arabeVersRomain.js',
  '!' + paths.func + '/julienVersJj.js',

  // Classes
  // paths.class + '/*.js',
  paths.class + '/jour-ie8.js',

  // Prototypes
  '!' + paths.proto + '/gregorien.js'
];

// Template Jsdoc du module UMD
var bannerTop = '/**\n' +
  ' * <%= pkg.name %> - <%= pkg.description %>\n' +
  ' * @copyright 2015-Present, <%= pkg.author %>\n' +
  ' * @namespace acte\n' +
  ' * @version ';
var bannerBottom = '\n' +
  ' * @see {@link <%= pkg.homepage %>|Projet sur GitHub}\n' +
  ' * @license <%= pkg.license %>\n' +
  ' */\n';

  // Template du module UMD
var umd = '\'use strict\';\n' +
    '(function universalModuleDefinition(root, factory) {\n' +
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

    // '  \'use strict\';\n\n' +
    '  /** @namespace */\n' +
    '  /* eslint-disable no-use-before-define */\n' +
    '  var acte = acte || {};\n\n' +
    '  /* eslint-enable no-use-before-define */\n' +
    '  /* istanbul ignore next */\n' +
    '<%= contents %>\n' +
    '  return acte;\n' +
    '}));\n\n';


// Export de la configuration
module.exports = {
  paths: paths,
  acteScripts: acteScripts,
  umd: umd,
  bannerTop: bannerTop,
  bannerBottom: bannerBottom
};
