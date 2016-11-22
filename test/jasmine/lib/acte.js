/* istanbul ignore if  */
if (!Array.prototype.reduce) {
  // jscs:disable
  /**
   * Prothèse d'émulation (polyfill) de Array.prototype.reduce pour IE8.
   * @access private
   * @since 0.0.15
   * @license Unknown
   * @see {@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce|Mozilla}
   * @see {@link https://github.com/es-shims/es5-shim|es5-shim}
   * @param {Function} callback - La fonction à exécuter sur chaque valeur de la liste
   * @return {Number|Array} La valeur obtenue grâce à la fonction de réduction
   * @example
   * [0, 1, 2, 3].reduce((a, b)=> a + b, 0); // 6
   */
  Array.prototype.reduce = function (callback /*, initialValue*/ ) {
    'use strict';

    if (this == null) {
      throw new TypeError(
        'Array.prototype.reduce appelé sur null ou undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' n\'est pas une fonction');
    }
    var t = Object(this),
      len = t.length >>> 0,
      k = 0,
      value;
    if (arguments.length == 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in t)) {
        k++;
      }
      if (k >= len) {
        throw new TypeError('Réduction de tableau vide sans valeur initiale');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
  // jscs:enable
}

/**
 * acte - Une librairie JavaScript qui simplifie la recherche généalogique..
 * @copyright 2015-Present, Gilles Toubiana
 * @namespace acte
 * @version 0.0.17
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @license MIT
 */

(function () {
  function universalModuleDefinition(root, factory) {
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
  }

  return universalModuleDefinition;
})()(this, function () {
  function umdCallback() {
    'use strict';

    /** @namespace */
    /* eslint-disable no-use-before-define */

    var acte = acte || {};
    /* eslint-enable no-use-before-define */
    /* istanbul ignore next */
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    /**
     * Jours juliens des équinoxes de l'an 1000 à l'an 2000.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link http://fourmilab.ch/documents/calendar/|JDE0tab2000}
     * @constant {Array}
     */
    var jde0Tab2000 = [
      [2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057],
      [2451716.56767, 365241.62603, 0.00325, 0.00888, -0.00030],
      [2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078],
      [2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032]
    ];

    /**
     * Année maximale acceptée pour les calculs grégoriens, juliens
     * ou républicains.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.17
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Number}
     */
    var anneeMax = 8000;

    /**
     * Nombre de jours, sur Terre, pour que le Soleil retourne à la même
     * position
     * dans le cycle des saisons.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link http://fourmilab.ch/documents/calendar/|TropicalYear}
     * @constant {Number}
     */
    var anneeTropique = 365.24219878;

    /**
     * Coefficient des sinus et cosinus de l'argument pour la nutation.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link http://fourmilab.ch/documents/calendar/|nutArgCoeff}
     * @constant {Array}
     */
    var argNutCoeff = [-171996, -1742, 92095, 89, -13187, -16, 5736, -31, -
      2274, -2, 977, -5, 2062, 2, -895, 5, 1426, -34, 54, -1, 712, 1, -7, 0, -
      517, 12, 224, -6, -386, -4, 200, 0, -301, 0, 129, -1, 217, -5, -95, 3, -
      158, 0, 0, 0, 129, 1, -70, 0, 123, 0, -53, 0, 63, 0, 0, 0, 63, 1, -33,
      0, -59, 0, 26, 0, -58, -1, 32, 0, -51, 0, 27, 0, 48, 0, 0, 0, 46, 0, -
      24, 0, -38, 0, 16, 0, -31, 0, 13, 0, 29, 0, 0, 0, 29, 0, -12, 0, 26,
      0, 0, 0, -22, 0, 0, 0, 21, 0, -10, 0, 17, -1, 0, 0, 16, 0, -8, 0, -16,
      1, 7, 0, -15, 0, 9, 0, -13, 0, 7, 0, -12, 0, 6, 0, 11, 0, 0, 0, -10,
      0, 5, 0, -8, 0, 3, 0, 7, 0, -3, 0, -7, 0, 0, 0, -7, 0, 3, 0, -7, 0, 3,
      0, 6, 0, 0, 0, 6, 0, -3, 0, 6, 0, -3, 0, -6, 0, 3, 0, -6, 0, 3, 0, 5,
      0, 0, 0, -5, 0, 3, 0, -5, 0, 3, 0, -5, 0, 3, 0, 4, 0, 0, 0, 4, 0, 0,
      0, 4, 0, 0, 0, -4, 0, 0, 0, -4, 0, 0, 0, -4, 0, 0, 0, 3, 0, 0, 0, -3,
      0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0,
      0, -3, 0, 0, 0
    ];

    /**
     * Termes périodiques pour la nutation en longitude et obliquité.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link http://fourmilab.ch/documents/calendar/|nutArgMult}
     * @constant {Array}
     */
    var argNutMult = [0, 0, 0, 0, 1, -2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0,
      0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, -2, 1, 0, 2, 2, 0, 0, 0, 2, 1, 0,
      0, 1, 2, 2, -2, -1, 0, 2, 2, -2, 0, 1, 0, 0, -2, 0, 0, 2, 1, 0, 0, -1,
      2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 0, -1, 2, 2, 0, 0, -1, 0, 1, 0,
      0, 1, 2, 1, -2, 0, 2, 0, 0, 0, 0, -2, 2, 1, 2, 0, 0, 2, 2, 0, 0, 2, 2,
      2, 0, 0, 2, 0, 0, -2, 0, 1, 2, 2, 0, 0, 0, 2, 0, -2, 0, 0, 2, 0, 0, 0, -
      1, 2, 1, 0, 2, 0, 0, 0, 2, 0, -1, 0, 1, -2, 2, 0, 2, 2, 0, 1, 0, 0, 1, -
      2, 0, 1, 0, 1, 0, -1, 0, 0, 1, 0, 0, 2, -2, 0, 2, 0, -1, 2, 1, 2, 0,
      1, 2, 2, 0, 1, 0, 2, 2, -2, 1, 1, 0, 0, 0, -1, 0, 2, 2, 2, 0, 0, 2, 1,
      2, 0, 1, 0, 0, -2, 0, 2, 2, 2, -2, 0, 1, 2, 1, 2, 0, -2, 0, 1, 2, 0,
      0, 0, 1, 0, -1, 1, 0, 0, -2, -1, 0, 2, 1, -2, 0, 0, 0, 1, 0, 0, 2, 2,
      1, -2, 0, 2, 0, 1, -2, 1, 0, 2, 1, 0, 0, 1, -2, 0, -1, 0, 1, 0, 0, -2,
      1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, -1, -1, 1, 0, 0, 0, 1, 1, 0,
      0, 0, -1, 1, 2, 2, 2, -1, -1, 2, 2, 0, 0, -2, 2, 2, 0, 0, 3, 2, 2, 2, -
      1, 0, 2, 2
    ];

    /**
     * Date de l'adoption du calendrier grégorien.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.17
     * @see {@link https://github.com/gtoubiana/acte.js|Projet sur GitHub}
     * @see https://fr.wikipedia.org/wiki/Passage_du_calendrier_julien_au_calendrier_gr%C3%A9gorien
     * @see dateFinJulien, retardJulien
     * @constant {Array}
     */
    var dateDebutGregorien = [15, 10, 1582];

    /**
     * Date de fin d'utilisation du calendrier julien.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.17
     * @see {@link https://github.com/gtoubiana/acte.js|Projet sur GitHub}
     * @see https://fr.wikipedia.org/wiki/Passage_du_calendrier_julien_au_calendrier_gr%C3%A9gorien
     * @see dateDebutGregorien, retardJulien
     * @constant {Array}
     */
    var dateFinJulien = [4, 10, 1582];

    /**
     * Tableau des Delta T différence entre Temps universel et temps terrestre
     * en secondes, observées pour les années paires de 1620 à 2016.
     * @access private
     * @author F.R. Stephenson & L.V. Morrison & IERS & Gilles Toubiana
     * @since 0.0.15
     * @see {@link https://www.staff.science.uu.nl/~gent0113/deltat/deltat_modern.htm|Valeurs} |
     * {@link http://maia.usno.navy.mil/ser7/deltat.data|IERS} |
     * {@link http://maia.usno.navy.mil/ser7/deltat.preds|Predictions}
     * @constant {Array}
     */
    var delta = [124, 115, 106, 98, 91, 85, 79, 74, 70, 65, 62, 58, 55, 53,
      50, 48, 46, 44, 42, 40, 37, 35, 33, 31, 28, 26, 24, 22, 20, 18, 16,
      14, 13, 12, 11, 10, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11,
      11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14,
      14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17,
      17, 17, 16, 16, 15, 14, 13.7, 13.1, 12.7, 12.5, 12.5, 12.5, 12.5,
      12.5, 12.5, 12.3, 12, 11.4, 10.6, 9.6, 8.6, 7.5, 6.6, 6, 5.7, 5.6,
      5.7, 5.9, 6.2, 6.5, 6.8, 7.1, 7.3, 7.5, 7.7, 7.8, 7.88, 7.54, 6.4,
      5.41, 2.92, 1.61, -1.02, -2.69, -3.64, -4.71, -5.4, -5.2, -5.46, -
      5.63, -5.8, -5.87, -6.19, -6.44, -6.09, -4.66, -2.72, -0.02, 2.64,
      5.37, 7.75, 10.46, 13.36, 16.01, 18.24, 20.25, 21.16, 22.41, 23.49,
      23.86, 24.34, 24.02, 23.87, 23.86, 23.73, 23.96, 24.33, 25.3, 26.24,
      27.28, 28.25, 29.15, 29.97, 30.72, 31.35, 32.18, 33.15, 34, 35.03,
      36.54, 38.29, 40.18, 42.23, 44.94, 46.94, 49.03, 50.93, 52.53, 54.05,
      55.08, 56.05, 57.18, 58.69, 60.35, 61.95, 63.23, 63.95, 64.39, 64.63,
      64.97, 65.6, 66.2, 66.74, 67.45, 68.26
    ];

    /**
     * Dixaines en toutes lettres.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Array}
     */
    var dixainesEnLettres = ['', 'dix', 'vingt', 'trente', 'quarante',
      'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'
    ];

    /**
     * Jours juliens des équinoxes avant l'an 1000.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link http://fourmilab.ch/documents/calendar/|JDE0tab1000}
     * @constant {Array}
     */
    var jde0Tab1000 = [
      [1721139.29189, 365242.13740, 0.06134, 0.00111, -0.00071],
      [1721233.25401, 365241.72562, -0.05323, 0.00907, 0.00025],
      [1721325.70455, 365242.49558, -0.11677, -0.00297, 0.00074],
      [1721414.39987, 365242.88257, -0.00769, -0.00933, -0.00006]
    ];

    /**
     * Nombre de jours juliens correspondants à l'an 1 gregorien.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link http://fourmilab.ch/documents/calendar/|GREGORIAN_EPOCH}
     * @constant {Number}
     * @example
     * jjVersGregorien(1721425.5); // [1, 1, 1]
     * jjVersGregorien(jjAn1Gregorien); // [1, 1, 1]
     */
    var jjAn1Gregorien = 1721425.5;

    /**
     * Nombre de jours juliens correspondants à l'an 2000 grégorien.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link http://fourmilab.ch/documents/calendar/|J2000}
     * @constant {Number}
     * @example
     * jjVersGregorien(2451545.0); // [2000, 1, 1]
     * jjVersGregorien(jjAn2000Gregorien); // [2000, 1, 1]
     */
    var jjAn2000Gregorien = 2451545.0;

    /**
     * Nombre de jours juliens correspondants à l'adoption du calendrier
     * républicain dans le journal officiel lors de la Commune de Paris
     * en 1871.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Number}
     * @example
     * jjVersGregorien(2404504.5); // [1871, 3, 18]
     * jjVersGregorien(jjDebutCommuneDeParis); // [1871, 3, 18]
     * jjVersRepublicain(2404504.5); // [79, 6, 3, 7]
     * jjVersRepublicain(jjDebutCommuneDeParis); // [79, 6, 3, 7]
     */
    var jjDebutCommuneDeParis = 2404504.5;

    /**
     * Nombre de jours juliens correspondants à l'an 1 républicain.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link fourmilab.ch/documents/calendar/|FRENCH_REVOLUTIONARY_EPOCH}
     * @constant {Number}
     * @example
     * jjVersGregorien(2375839.5); // [1792, 9, 22]
     * jjVersGregorien(jjDebutRepublicain); // [1792, 9, 22]
     * jjVersRepublicain(2375839.5); // [1, 1, 1, 1]
     * jjVersRepublicain(jjDebutRepublicain); // [1, 1, 1, 1]
     */
    var jjDebutRepublicain = 2375839.5;

    /**
     * Nombre de jours juliens correspondants à l'abrogation du calendrier
     * républicain dans le journal officiel lors de la Commune de Paris
     * en 1871.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Number}
     * @example
     * jjVersGregorien(2404575.5); // [1871, 5, 28]
     * jjVersGregorien(jjFinCommuneDeParis); // [1871, 5, 28]
     * jjVersRepublicain(2404575.5); // [79, 9, 1, 8]
     * jjVersRepublicain(jjFinCommuneDeParis); // [79, 9, 1, 8]
     */
    var jjFinCommuneDeParis = 2404575.5;

    /**
     * Nombre de jours juliens correspondants à l'abrogation du calendrier
     * républicain.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Number}
     * @example
     * jjVersGregorien(2380686.5); // [1805, 12, 31]
     * jjVersGregorien(jjFinRepublicain); // [1805, 12, 31]
     * jjVersRepublicain(2380686.5); // [14, 4, 1, 10]
     * jjVersRepublicain(jjFinRepublicain); // [14, 4, 1, 10]
     */
    var jjFinRepublicain = 2380686.5;

    /**
     * Nom des Jours Grégoriens et abbréviations courantes,
     * sur 1, 2 et 3 caractères.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Array}
     */
    var jourGregorien = [
      ['Dimanche', 'Dim', 'Dim', 'Di', 'D'],
      ['Lundi', 'Lundi', 'Lun', 'Lu', 'L'],
      ['Mardi', 'Mardi', 'Mar', 'Ma', 'M'],
      ['Mercredi', 'Mercr', 'Mer', 'Me', 'M'],
      ['Jeudi', 'Jeudi', 'Jeu', 'Je', 'J'],
      ['Vendredi', 'Vendr', 'Ven', 'Ve', 'V'],
      ['Samedi', 'Sam', 'Sam', 'Sa', 'S']
    ];

    /**
     * Nom des Jours Republicains et abbréviations courantes,
     * sur 1, 2 et 3 caractères.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Array}
     */
    var jourRepublicain = [
      ['Primidi', 'Prim', 'Pri', 'Pi', 'P'],
      ['Duodi', 'Duo', 'Duo', 'Du', 'D'],
      ['Tridi', 'Tri', 'Tri', 'Ti', 'T'],
      ['Quartidi', 'Quart', 'Qua', 'Qa', 'Q'],
      ['Quintidi', 'Quint', 'Qui', 'Qi', 'Q'],
      ['Sextidi', 'Sext', 'Sex', 'Sx', 'S'],
      ['Septidi', 'Sept', 'Sep', 'Sp', 'S'],
      ['Octidi', 'Oct', 'Oct', 'Oc', 'O'],
      ['Nonidi', 'Non', 'Non', 'No', 'N'],
      ['Décadi', 'Déc', 'Déc', 'Dé', 'D']
    ];

    /**
     * Nombre de jours en fonction des mois Grégoriens.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.17
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Array}
     */
    var joursDansLeMois = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /**
     * Nom des Mois Grégoriens et abbréviations courantes,
     * sur 1, 2 et 3 caractères.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Array}
     */
    var moisGregorien = [
      ['Janvier', 'Janv', 'Jan', 'Jr', 'J'],
      ['Février', 'Févr', 'Fév', 'Fr', 'F'],
      ['Mars', 'Mars', 'Mar', 'Ms', 'M'],
      ['Avril', 'Avr', 'Avr', 'Al', 'A'],
      ['Mai', 'Mai', 'Mai', 'Mi', 'M'],
      ['Juin', 'Juin', 'Jun', 'Jn', 'J'],
      ['Juillet', 'Juill', 'Jul', 'Jt', 'J'],
      ['Août', 'Août', 'Aoû', 'At', 'A'],
      ['Septembre', 'Sept', 'Sep', 'Se', 'S'],
      ['Octobre', 'Oct', 'Oct', 'Oe', 'O'],
      ['Novembre', 'Nov', 'Nov', 'Ne', 'N'],
      ['Décembre', 'Déc', 'Déc', 'De', 'D']
    ];

    /**
     * Nom des Mois Republicains et abbréviations courantes,
     * sur 1, 2 et 3 caractères.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Array}
     */
    var moisRepublicain = [
      ['Vendémiaire', 'Vend', 'Vnd', 'Vd', 'V'],
      ['Brumaire', 'Brum', 'Bru', 'Br', 'B'],
      ['Frimaire', 'Frim', 'Fri', 'Fr', 'F'],
      ['Nivôse', 'Nivô', 'Niv', 'Ni', 'N'],
      ['Pluviôse', 'Pluv', 'Plu', 'Pl', 'P'],
      ['Ventôse', 'Vent', 'Vnt', 'Vt', 'V'],
      ['Germinal', 'Germ', 'Ger', 'Gr', 'G'],
      ['Floréal', 'Flor', 'Flo', 'Fl', 'F'],
      ['Prairial', 'Prai', 'Pra', 'Pr', 'P'],
      ['Messidor', 'Mess', 'Mes', 'Ms', 'M'],
      ['Thermidor', 'Ther', 'The', 'Tr', 'T'],
      ['Fructidor', 'Fruc', 'Fru', 'Ft', 'F'],
      ['Jour complémentaire', 'Comp', 'Cmp', 'Cp', 'C']
    ];

    /**
     * Expressions régulières pour convertir les mois gregoriens.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Array}
     */
    var regexpGregorien = [{
      regexp: 'jan(v)?(\\.)?(ier)?',
      replace: '/1/'
    }, {
      regexp: 'Jer',
      replace: '/1/'
    }, {
      regexp: 'f(é|e)v(r)?(\\.)?(ier)?',
      replace: '/2/'
    }, {
      regexp: 'Fer',
      replace: '/2/'
    }, {
      regexp: 'mardi',
      replace: ''
    }, {
      regexp: 'mar(s|\\.)?',
      replace: '/3/'
    }, {
      regexp: 'avr(il|\\.)?',
      replace: '/4/'
    }, {
      regexp: 'mai',
      replace: '/5/'
    }, {
      regexp: 'ju(i)?n',
      replace: '/6/'
    }, {
      regexp: 'ju(i)?l(\\.|l)?(\\.)?(et)?',
      replace: '/7/'
    }, {
      regexp: 'Jet',
      replace: '/7/'
    }, {
      regexp: 'ao(u|û)(t|\\.)?',
      replace: '/8/'
    }, {
      regexp: 'sep(t)?(\\.)?(embre)?',
      replace: '/9/'
    }, {
      regexp: '7bre',
      replace: '/9/'
    }, {
      regexp: 'oct(obre|\\.)?',
      replace: '/10/'
    }, {
      regexp: '8bre',
      replace: '/10/'
    }, {
      regexp: 'nov(embre|\\.)?',
      replace: '/11/'
    }, {
      regexp: '9bre',
      replace: '/11/'
    }, {
      regexp: 'd(é|e)c(embre|\\.)?',
      replace: '/12/'
    }, {
      regexp: 'Xbre',
      replace: '/12/'
    }, {
      regexp: '10bre',
      replace: '/12/'
    }, {
      regexp: '[^-()\\d/*+.]',
      replace: ''
    }];

    /**
     * Expressions régulières pour convertir les mois républicains.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Array}
     */
    var regexpRepublicain = [{
      regexp: 'vend(é|e)miaire',
      replace: '/1/'
    }, {
      regexp: 'brumaire',
      replace: '/2/'
    }, {
      regexp: 'frimaire',
      replace: '/3/'
    }, {
      regexp: 'niv(ô|o)se',
      replace: '/4/'
    }, {
      regexp: 'pluvi(ô|o)se',
      replace: '/5/'
    }, {
      regexp: 'vent(ô|o)se',
      replace: '/6/'
    }, {
      regexp: 'germinal',
      replace: '/7/'
    }, {
      regexp: 'flor(é|e)al',
      replace: '/8/'
    }, {
      regexp: 'prairial',
      replace: '/9/'
    }, {
      regexp: 'messidor',
      replace: '/10/'
    }, {
      regexp: 'thermidor',
      replace: '/11/'
    }, {
      regexp: 'fructidor',
      replace: '/12/'
    }, {
      regexp: 'san(s-)?culottide(s)?',
      replace: '/13/'
    }, {
      regexp: 'jour(s)?\\scompl(é|e)mentaire(s)?',
      replace: '/13/'
    }, {
      regexp: 'd(é|e)cade\\s(\\d){1,2}',
      replace: ''
    }, {
      regexp: '[^-()\\d/*+.]',
      replace: ''
    }];

    /**
     * Nombre de jours de retard du calendrier Julien
     * lors du passage au calendrier Grégorien.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.17
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @see https://fr.wikipedia.org/wiki/Passage_du_calendrier_julien_au_calendrier_gr%C3%A9gorien
     * @see dateDebutGregorien, dateFinJulien
     * @constant {Number}
     */
    var retardJulien = 10;

    /**
     * Nombre de jours dans un siècle julien.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link http://fourmilab.ch/documents/calendar/|JulianCentury}
     * @constant {Number}
     */
    var siecleJulien = 36525.0;

    /**
     * Termes périodiques pour obtenir des temps réels.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @see {@link http://fourmilab.ch/documents/calendar/|EquinoxpTerms}
     * @constant {Array}
     */
    var termesPerEquinoxes = [485, 324.96, 1934.136, 203, 337.23, 32964.467,
      199, 342.08, 20.186, 182, 27.85, 445267.112, 156, 73.14, 45036.886,
      136, 171.52, 22518.443, 77, 222.54, 65928.934, 74, 296.72, 3034.906,
      70, 243.58, 9037.513, 58, 119.81, 33718.147, 52, 297.17, 150.678, 50,
      21.02, 2281.226, 45, 247.54, 29929.562, 44, 325.15, 31555.956, 29,
      60.93, 4443.417, 18, 155.12, 67555.328, 17, 288.79, 4562.452, 16,
      198.04, 62894.029, 14, 199.76, 31436.921, 12, 95.39, 14577.848, 12,
      287.11, 31931.756, 12, 320.81, 34777.259, 9, 227.73, 1222.114, 8,
      15.45, 16859.074
    ];

    /**
     * Unités en toutes lettres.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @constant {Array}
     */
    var unitesEnLettres = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six',
      'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze',
      'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
    ];

    /**
     * Pour convertir des degrés en radians.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|dtr}
     * @param  {Number} d - Angle en degrés
     * @return {Number} Angle en radians
     * @example
     * degresVersRadians(90); // 1.5707963267948966
     */
    var degresVersRadians = function () {
      function degresVersRadians(d) {
        var result = d * Math.PI / 180.0;

        return result;
      }

      return degresVersRadians;
    }();

    /**
     * Pour normaliser un angle entre 0 et 360 degrés.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|fixangle}
     * @param  {Number} a - Angle en degrés
     * @return {Number} Angle entre 0 et 360 degrés
     * @example
     * normaliserDegres(375); // 15
     */
    var normaliserDegres = function () {
      function normaliserDegres(a) {
        var result = a - 360.0 * Math.floor(a / 360.0);

        return result;
      }

      return normaliserDegres;
    }();

    /**
     * Pour convertir des radians en degrés.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|rtd}
     * @param  {Number} r - Angle en radians
     * @return {Number} Angle en degrés
     * @example
     * radiansVersDegres(1.5707963267948966); // 90
     */
    var radiansVersDegres = function () {
      function radiansVersDegres(r) {
        var result = r * 180.0 / Math.PI;

        return result;
      }

      return radiansVersDegres;
    }();

    /**
     * Pour calculer les restes avec des nombres décimaux.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|mod}
     * @param  {Number} a - Nombre à diviser
     * @param  {Number} b - Diviseur
     * @return {Number} Reste de a par b
     * @example
     * reste(3,2); // 1
     */
    var reste = function () {
      function reste(a, b) {
        var result = a - b * Math.floor(a / b);

        return result;
      }

      return reste;
    }();

    /**
     * Pour calculer le sinus d'un angle en degrés.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|dsin}
     * @param  {Number} d - Angle en degrés
     * @return {Number} Sinus de l'angle en degrés
     * @example
     * sinus(90); // 1
     */
    var sinus = function () {
      function sinus(d) {
        var result = Math.sin(degresVersRadians(d));

        return result;
      }

      return sinus;
    }();

    /**
     * Pour calculer le cosinus d'un angle en degrés.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|dcos}
     * @param  {Number} d - Angle en degrés
     * @return {Number} Cosinus de l'angle en degrés
     * @example
     * cosinus(0); // 1
     */
    var cosinus = function () {
      function cosinus(d) {
        var result = Math.cos(degresVersRadians(d));

        return result;
      }

      return cosinus;
    }();

    /**
     * Pour calculer le nombre de jours juliens d'une equinoxe ou d'un solstice.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|equinox}
     * @param  {Number} an - Année
     * @param  {Number} item - L'item à calculer :
     * 0 = Equinoxe de Mars,
     * 1 = Solstice de Juin,
     * 2 = Equinoxe de Septembre,
     * 3 = Solstice de Décembre
     * @return {Number} Le nombre de jours juliens pour l'equinoxe ou solstice
     * @example
     * equinoxe(2015,0); // 2457102.4488504543
     */
    var equinoxe = function () {
      function equinoxe(an, item) {
        var i = void 0;
        var j = void 0;
        var Jde0tab = void 0;
        var S = void 0;
        var Y = void 0;

        if (an < 1000) {
          Jde0tab = jde0Tab1000;
          Y = an / 1000;
        } else {
          Jde0tab = jde0Tab2000;
          Y = (an - 2000) / 1000;
        }
        var Jde0 = Jde0tab[item][0] + Jde0tab[item][1] * Y + Jde0tab[item][
          2
        ] * Math.pow(Y, 2) + Jde0tab[item][3] * Math.pow(Y, 3) + Jde0tab[
          item][4] * Math.pow(Y, 4);
        var T = (Jde0 - 2451545.0) / 36525;
        var W = 35999.373 * T - 2.47;
        var deltaL = 1 + 0.0334 * cosinus(W) + 0.0007 * cosinus(2 * W);

        S = 0;
        for (i = j = 0; i < 24; i++) {
          S += termesPerEquinoxes[j] * cosinus(termesPerEquinoxes[j + 1] +
            termesPerEquinoxes[j + 2] * T);
          j += 3;
        }

        return Jde0 + S * 0.00001 / deltaL;
      }

      return equinoxe;
    }();

    /**
     * Pour calculer la différence entre temps terrestre et temps universel,
     * en secondes.
     * @access private
     * @author John Walker & Gilles Toubiana
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|deltat} |
     * {@link http://eclipse.gsfc.nasa.gov/SEcat5/deltatpoly.html|Expressions} |
     * {@link http://www.projectpluto.com/dt.htm|Formules}
     * @param {Number} an - Année
     * @return {Number} Différence entre temps terrestre et temps universel,
     * en secondes
     * @example
     * deltaT(2015); // 67.855
     */

    var deltaT = function () {
      function deltaT(an) {
        var dt = void 0;
        var maxindex = 1618 + delta.length * 2;

        if (an >= 1620 && an < maxindex) {
          var i = (an - 1620) / 2;

          dt = (an - 1620) % 2 ? (delta[i - 0.5] + delta[i + 0.5]) / 2 :
            delta[i];
        } else {
          var t = (an - 2000) / 100;

          if (an === maxindex) {
            dt = delta[delta.length - 1];
          } else if (an < 948) {
            dt = 2177 + 497 * t + 44.1 * t * t;
          } else {
            dt = 102 + 102 * t + 25.3 * t * t;
            if (an > 2000 && an < 2100) {
              dt += 0.37 * (an - 2100);
            }
          }
        }

        return dt;
      }

      return deltaT;
    }();

    /**
     * Pour calculer l'obliquité de l'écliptique pour un nombre de jours juliens.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|obliqeq}
     * @param  {Number} jj - Nombre de jours juliens
     * @return {Number} Obliquité de l'écliptique
     * @example
     * obliquiteEcliptique(2457333.5); // 23.437230456425635
     */
    var obliquiteEcliptique = function () {
      function obliquiteEcliptique(jj) {
        var oTerms = [-4680.93, -1.55, 1999.25, -51.38, -249.67, -39.05,
          7.12, 27.87, 5.79, 2.45
        ];
        var u = (jj - jjAn2000Gregorien) / (siecleJulien * 100);
        var v = u;
        var eps = 23 + 26 / 60.0 + 21.448 / 3600.0;
        var i = void 0;

        if (Math.abs(u) < 1.0) {
          for (i = 0; i < 10; i++) {
            eps += oTerms[i] / 3600.0 * v;
            v *= u;
          }
        }

        return eps;
      }

      return obliquiteEcliptique;
    }();

    /**
     * Pour calculer la position du soleil.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|sunpos}
     * @param  {Number} jj - Nombre de jours juliens
     * @return {Array} Position du soleil : Angles en degrés.
     * [0] Longitude moyenne géométrique du Soleil,
     * [1] Anomalie moyenne du Soleil,
     * [2] Excentricité de l'orbite de la Terre,
     * [3] Équation du centre du Soleil,
     * [4] Longitude réelle du Soleil,
     * [5] Anomalie réelle du Soleil,
     * [6] Rayon vecteur du Soleil,
     * [7] Longitude apparente du Soleil pour une equinoxe,
     * [8] Ascension réelle du Soleil,
     * [9] Déclinaison réelle du Soleil,
     * [10] Ascension apparente du Soleil,
     * [11] Déclinaison apparente du Soleil
     * @example
     * positionSoleil(2457333.5); //[225.88621192607388, 302.6763369039327,
     * // 0.016701968773317977, -1.6291396906692837, 224.2570722354046,
     * // 301.0471972132634, 0.9911840619194138, 224.25125854183977,
     * // 221.79690960202632, -16.115660127694625, 221.79168151491098,
     * // -16.112230690435588]
     */
    var positionSoleil = function () {
      function positionSoleil(jj) {
        var T = (jj - jjAn2000Gregorien) / siecleJulien;
        var t2 = T * T;
        var l0 = normaliserDegres(280.46646 + 36000.76983 * T + 0.0003032 *
          t2);
        var M = normaliserDegres(357.52911 + 35999.05029 * T + -0.0001537 *
          t2);
        var e = 0.016708634 + -0.000042037 * T + -0.0000001267 * t2;
        var C = (1.914602 + -0.004817 * T + -0.000014 * t2) * sinus(M) + (
          0.019993 - 0.000101 * T) * sinus(2 * M) + 0.000289 * sinus(3 *
          M);
        var sunLong = l0 + C;
        var sunAnomaly = M + C;
        var sunR = 1.000001018 * (1 - e * e) / (1 + e * cosinus(sunAnomaly));
        var Omega = 125.04 - 1934.136 * T;
        var Lambda = sunLong + -0.00569 + -0.00478 * sinus(Omega);
        var epsilon0 = obliquiteEcliptique(jj);
        var epsilon = epsilon0 + 0.00256 * cosinus(Omega);
        var Alpha = normaliserDegres(radiansVersDegres(Math.atan2(cosinus(
          epsilon0) * sinus(sunLong), cosinus(sunLong))));
        var Delta = radiansVersDegres(Math.asin(sinus(epsilon0) * sinus(
          sunLong)));
        var AlphaApp = normaliserDegres(radiansVersDegres(Math.atan2(
          cosinus(epsilon) * sinus(Lambda), cosinus(Lambda))));
        var DeltaApp = radiansVersDegres(Math.asin(sinus(epsilon) * sinus(
          Lambda)));

        return [l0, M, e, C, sunLong, sunAnomaly, sunR, Lambda, Alpha,
          Delta, AlphaApp, DeltaApp
        ];
      }

      return positionSoleil;
    }();

    /**
     * Pour calculer la nutation en longitude (deltaPsi),
     * et obliquité (deltaEpsilon) pour un nombre de jours juliens.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|nutation}
     * @param  {Number} jj - Nombre de jours juliens
     * @return {Array} Nutation en [0] longitude et [1] obliquité en degrés
     * @example
     * nutation(2457333.5);
     * // [-0.000514859690208824, -0.0025586654864005456]
     */
    var nutation = function () {
      function nutation(jj) {
        var ta = [];
        var t = (jj - 2451545.0) / 36525.0;
        var t2 = t * t;
        var t3 = t * t2;
        var dp = 0;
        var de = 0;

        ta[0] = degresVersRadians(297.850363 + 445267.11148 * t - 0.0019142 *
          t2 + t3 / 189474.0);
        ta[1] = degresVersRadians(357.52772 + 35999.05034 * t - 0.0001603 *
          t2 - t3 / 300000.0);
        ta[2] = degresVersRadians(134.96298 + 477198.867398 * t + 0.0086972 *
          t2 + t3 / 56250.0);
        ta[3] = degresVersRadians(93.27191 + 483202.017538 * t - 0.0036825 *
          t2 + t3 / 327270);
        ta[4] = degresVersRadians(125.04452 - 1934.136261 * t + 0.0020708 *
          t2 + t3 / 450000.0);
        for (var i = 0; i < 5; i++) {
          ta[i] -= 2 * Math.PI * Math.floor(ta[i] / (2 * Math.PI));
        }
        var to10 = t / 10.0;

        for (var _i = 0; _i < 63; _i++) {
          var ang = 0;

          for (var j = 0; j < 5; j++) {
            if (argNutMult[_i * 5 + j] !== 0) {
              ang += argNutMult[_i * 5 + j] * ta[j];
            }
          }
          dp += (argNutCoeff[_i * 4 + 0] + argNutCoeff[_i * 4 + 1] * to10) *
            Math.sin(ang);
          de += (argNutCoeff[_i * 4 + 2] + argNutCoeff[_i * 4 + 3] * to10) *
            Math.cos(ang);
        }

        return [dp / (3600.0 * 10000.0), de / (3600.0 * 10000.0)];
      }

      return nutation;
    }();

    /**
     * Pour calculer l'équation du temps pour un moment précis.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|equationOfTime}
     * @param  {Number} jj - Nombre de jours juliens
     * @return {Number} Équation du temps pour une fraction de jour
     * @example
     * equationDuTemps(2457333.5); // 0.002839122270852552
     */
    var equationDuTemps = function () {
      function equationDuTemps(jj) {
        var tau = (jj - jjAn2000Gregorien) / (siecleJulien * 10);
        var l0 = normaliserDegres(280.4664567 + 360007.6982779 * tau +
          0.03032028 * Math.pow(tau, 2) + Math.pow(tau, 3) / 49931 + -(
            Math.pow(tau, 4) / 15300) + -(Math.pow(tau, 5) / 2000000));
        var alpha = positionSoleil(jj)[10];
        var deltaPsi = nutation(jj)[0];
        var epsilon = obliquiteEcliptique(jj) + nutation(jj)[1];
        var E = l0 + -0.0057183 + -alpha + deltaPsi * cosinus(epsilon);

        E -= 20.0 * Math.floor(E / 20.0);

        return E / (24 * 60);
      }

      return equationDuTemps;
    }();

    /**
     * Pour calculer le nombre de jours juliens et la fraction de l'équinoxe
     * de septembre au méridien de Paris pour une année grégorienne.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|equinoxe_a_paris}
     * @param {Number} an - Année grégorienne
     * @return {Number} Nombre de jours juliens et fraction de l'équinoxe
     * de septembre au méridien de Paris pour une année grégorienne
     * @example
     * fractionEquinoxe(2015); // 2457288.855100263
     */
    var fractionEquinoxe = function () {
      function fractionEquinoxe(an) {
        var equJED = equinoxe(an, 2);
        var equJD = equJED - deltaT(an) / (24 * 60 * 60);
        var equAPP = equJD + equationDuTemps(equJED);
        var dtParis = (2 + 20 / 60.0 + 15 / (60 * 60.0)) / 360;

        return equAPP + dtParis;
      }

      return fractionEquinoxe;
    }();

    /**
     * Pour calculer le nombre de jours juliens correspondant à l'équinoxe
     * de septembre au méridien de Paris, pour une année grégorienne.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|paris_equinoxe_jd}
     * @param {Number} an - Année grégorienne
     * @return {Number} Nombre de jours juliens pour l'équinoxe de septembre
     * @example
     * equinoxeAParis(2015); // 2457288.5
     */
    var equinoxeAParis = function () {
      function equinoxeAParis(an) {
        var ep = fractionEquinoxe(an);

        return Math.floor(ep - 0.5) + 0.5;
      }

      return equinoxeAParis;
    }();

    /**
     * Pour déterminer si une année grégorienne est bissextile.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|leap_gregorian}
     * @param {Number} an - Année grégorienne
     * @return {Boolean} Est-ce une année bissextile ?
     * @example
     * gregorienBissextile(2012); // true
     */
    var gregorienBissextile = function () {
      function gregorienBissextile(an) {
        var result = an % 4 === 0 && !(an % 100 === 0 && an % 400 !== 0);

        return result;
      }

      return gregorienBissextile;
    }();

    /**
     * Pour calculer le nombre de jours juliens (jj) à partir d'une date
     * grégorienne.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|gregorian_to_jd}
     * @param {Number} an - Année grégorienne
     * @param {Number} mois - Mois grégorien
     * @param {Number} jour - Jour grégorien
     * @return {Number} Nombre de jours juliens
     * @example
     * gregorienVersJj(2015,11,7); // 2457333.5
     */
    var gregorienVersJj = function () {
      function gregorienVersJj(an, mois, jour) {
        var anneeBissextile = gregorienBissextile(an) ? -1 : -2;

        return jjAn1Gregorien - 1 + 365 * (an - 1) + Math.floor((an - 1) /
            4) + -Math.floor((an - 1) / 100) + Math.floor((an - 1) / 400) +
          Math.floor((367 * mois - 362) / 12 + (mois <= 2 ? 0 :
            anneeBissextile) + jour);
      }

      return gregorienVersJj;
    }();

    /**
     * Pour calculer une date grégorienne à partir du nombre de jours juliens.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|jd_to_gregorian}
     * @param {Number} jj - Nombre de jours juliens
     * @return {Array} [0] Année, [1] Mois et [2] Jour grégorien
     * @example
     * jjVersGregorien(2457333.5); // [2015, 11, 7]
     */
    var jjVersGregorien = function () {
      function jjVersGregorien(jj) {
        var wjd = Math.floor(jj - 0.5) + 0.5;
        var depoch = wjd - jjAn1Gregorien;
        var quadricent = Math.floor(depoch / 146097);
        var dqc = reste(depoch, 146097);
        var cent = Math.floor(dqc / 36524);
        var dcent = reste(dqc, 36524);
        var quad = Math.floor(dcent / 1461);
        var dquad = reste(dcent, 1461);
        var yindex = Math.floor(dquad / 365);
        var an = quadricent * 400 + cent * 100 + quad * 4 + yindex;
        var anneeBissextile = gregorienBissextile(an) ? 1 : 2;

        if (!(cent === 4 || yindex === 4)) an++;
        var yearday = wjd - gregorienVersJj(an, 1, 1);
        var leapadj = wjd < gregorienVersJj(an, 3, 1) ? 0 : anneeBissextile;
        var mois = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
        var jour = wjd - gregorienVersJj(an, mois, 1) + 1;

        return [an, mois, jour];
      }

      return jjVersGregorien;
    }();

    /**
     * Pour mettre en capitale le premier caractère d'une chaîne.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {String} str - la chaîne à modifier
     * @return {String} la chaîne avec le premier caractère en capitale
     * @example
     * initialeEnCapitale("vingt"); // "Vingt"
     */
    var initialeEnCapitale = function () {
      function initialeEnCapitale(str) {
        var result = str.charAt(0).toUpperCase() + str.slice(1);

        return result;
      }

      return initialeEnCapitale;
    }();

    /**
     * Pour convertir uniquement 'un' en nombre ordinal.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} saisie - le nombre en lettres
     * @param {String} [genre] - par défaut, le genre masculin est appliqué.
     * Pour utiliser le genre féminin, il suffit d'ajouter un argument.
     * @return {String} le nombre - ordinal ou non - en lettres
     * @example
     * premierOrdinalEnLettres("Un"); // "Premier"
     * premierOrdinalEnLettres("Un", 1); // "Première"
     * premierOrdinalEnLettres("Deux"); // "Deux"
     * premierOrdinalEnLettres("Vingt-trois"); // "Vingt-trois"
     */
    var premierOrdinalEnLettres = function () {
      function premierOrdinalEnLettres(saisie, genre) {
        var str = saisie.toString();
        var prem = genre ? 'ère' : 'er';
        var result = str === 'Un' ? 'Premi' + prem : str;

        return result;
      }

      return premierOrdinalEnLettres;
    }();

    /**
     * Pour ajouter un préfixe de 0 à un nombre compris entre 1 et 9.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} n - le nombre à préfixer
     * @return {String} le nombre avec préfixe zéro
     * @example
     * prefixeZero(20); // 20
     * prefixeZero(9); // "09"
     * prefixeZero(0); // 0
     * prefixeZero(-4); // -4
     */
    var prefixeZero = function () {
      function prefixeZero(n) {
        var result = n < 10 && n > 0 ? '0' + n : n;

        return result;
      }

      return prefixeZero;
    }();

    /**
     * Pour convertir les nombres en toutes lettres.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} n - le nombre en chiffres
     * @param {String} [r] - par défaut, la réforme de 1990 est appliquée.
     * Pour utiliser l'ancienne notation, il suffit d'ajouter un argument.
     * @return {String} le nombre en toutes lettres
     * @example
     * nombreEnLettres(2371); // "Deux-mille-trois-cent-soixante-et-onze"
     * nombreEnLettres(1799,1); // "Mille sept cent quatre-vingt-dix-neuf"
     */
    var nombreEnLettres = function () {
      function nombreEnLettres(n, r) {
        var mill = void 0;
        var centl = void 0;
        var dixl = void 0;
        var sepunit = void 0;
        var unitl = void 0;

        // UnitesEnLettres
        var u = unitesEnLettres;

        // DixainesEnLettres
        var v = dixainesEnLettres;

        // Saisie en valeur absolue
        var abs = Math.abs(n);
        var splus = r ? ' ' : '-';

        // Milliers
        var mil = parseInt(abs / 1000, 10);

        // Centaines
        var cent = parseInt(abs % 1000 / 100, 10);

        // Dixaines
        var dix = parseInt(abs % 100 / 10, 10);

        // Unités
        var unit = parseInt(abs % 10, 10);

        // Milliers
        if (mil === 1) {
          // Un seul millier
          mill = 'mille';
        } else if (mil > 1) {
          // Plusieurs milliers
          mill = '' + u[mil] + splus + 'mille';
        } else {
          // Pas de milliers
          mill = '';
        }

        // Centaines
        var sepcen = mil > 0 ? splus : '';

        if (cent === 1) {
          // Une seule centaine
          centl = sepcen + 'cent';
        } else if (cent > 1 && dix === 0 && unit === 0) {
          // Plusieurs centaines
          centl = '' + sepcen + u[cent] + splus + 'cents';
        } else if (cent > 1) {
          // Plusieurs centaines suivies de dizaines
          centl = '' + sepcen + u[cent] + splus + 'cent';
        } else {
          // Pas de centaines
          centl = '';
        }

        // Dizaines et unités
        var sepdix = mil + cent > 0 && dix + unit > 0 ? splus : '';

        if (dix > 0) {
          dixl = v[dix];

          // Splus
          sepunit = '-';
        } else {
          dixl = '';
          sepunit = '';
        }

        // Unités
        unitl = abs > 0 ? sepunit + u[unit] : 'zéro';

        // Multiples de 10
        if ((dix * 10 + unit) % 10 === 0) {
          unitl = '';
        }

        // Dix, soixante-dix, quatre-vingt-dix
        if ((dix === 1 || dix === 7 || dix === 9) && unit === 0) {
          dixl = dix === 1 ? 'dix' : v[dix] + '-dix';
          unitl = dix === 1 ? '' : u[unit];
        }

        // Onze+
        // soixante-et-onze+, quatre-vingt-onze+
        if ((dix === 1 || dix === 7 || dix === 9) && unit >= 1) {
          dixl = dix === 1 ? '' : v[dix];
          if (dix === 1) {
            sepunit = '';
          }
          unitl = dix === 7 && unit === 1 ? splus + 'et' + splus + u[10 +
            unit] : sepunit + u[10 + unit];
        }

        // Vingt-et-un, trente-et-un, quarante-et-un,
        // cinquante-et-un, soixante-et-un
        if (dix >= 2 && dix <= 6 && unit === 1) {
          unitl = splus + 'et' + splus + u[unit];
        }

        // Pluriel sur 80
        if (dix === 8 && unit === 0) {
          dixl = v[dix] + 's';
          unitl = '';
        }

        var dizunit = sepdix + dixl + unitl;

        // Si nombre négatif
        var avjc = n < 0 ? 'Moins ' : '';

        var res = abs > 0 ? initialeEnCapitale(avjc + mill + centl +
          dizunit) : 'Zéro';

        return res;
      }

      return nombreEnLettres;
    }();

    /**
     * Pour convertir les nombres en toutes lettres en nombres ordinaux.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} saisie - le nombre en lettres
     * @param {String} [genre] - par défaut, le genre masculin est appliqué.
     * Pour utiliser le genre féminin, il suffit d'ajouter un argument.
     * @return {String} le nombre ordinal en lettres
     * @example
     * ordinauxEnLettres("Un"); // "Premier"
     * ordinauxEnLettres("Un", 1); // "Première"
     * ordinauxEnLettres("Deux"); // "Deuxième"
     * ordinauxEnLettres("Vingt-trois"); // "Vingt-troisième"
     */
    var ordinauxEnLettres = function () {
      function ordinauxEnLettres(saisie, genre) {
        var str = saisie.toString();
        var result = void 0;

        // Dernier caractère
        /* eslint-disable indent */
        switch (str.slice(-1)) {
        case 't':
        case 'x':
          result = str + 'i\xE8me';
          break;
        case 'q':
          result = str + 'ui\xE8me';
          break;
        case 'f':
          result = str.slice(0, str.length - 1) + 'vi\xE8me';
          break;
        case 'e':
          result = str.slice(0, str.length - 1) + 'i\xE8me';
          break;
        case 's':
          result = str.slice(-2) === 'ts' ? str.slice(0, str.length - 1) +
            'i\xE8me' : str + 'i\xE8me';
          break;
        case 'n':
          if (str.slice(-5) === 'et-un' || str.slice(-5) === 'et un') {
            result = str + 'i\xE8me';
          } else {
            result = premierOrdinalEnLettres(str, genre);
          }
          break;
        default:
          result = str + 'i\xE8me';
        }

        /* eslint-enable indent */
        return result;
      }

      return ordinauxEnLettres;
    }();

    /**
     * Pour convertir les nombres en nombres ordinaux.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} n - le nombre en chiffres
     * @param {String} prem - le suffixe pour le chiffre 1
     * @param {String} exp - le suffixe pour les chiffres différents de 1
     * @return {String} le nombre ordinal
     * @example
     * nombreOrdinal(1,"er","e"); // "1er"
     * nombreOrdinal(1,"re","e"); // "1re"
     * nombreOrdinal(2,"er","e"); // "2e"
     */
    var nombreOrdinal = function () {
      function nombreOrdinal(n, prem, exp) {
        var result = n === 1 || n === '1er' || n === '1re' ? '1' + prem : n +
          exp;

        return result;
      }

      return nombreOrdinal;
    }();

    /**
     * Pour créer un objet date grégorien valide.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} jour - le jour du mois gregorien en chiffres
     * @param {Number} mois - le mois gregorien en chiffres
     * @param {Number} an - l'année gregorienne en chiffres
     * @return {Object} L'objet date valide
     * @example
     * dateValide(10,12,34); // Sun Dec 10 34 00:00:00 GMT+0100 (CET)
     */
    var dateValide = function () {
      function dateValide(jour, mois, an) {
        var resultat = new Date(an, mois - 1, jour);

        resultat.setFullYear(an);

        return resultat;
      }

      return dateValide;
    }();

    /**
     * Pour calculer le nombre de jours entre deux dates.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} j1 - le jour du mois de la première date en chiffres
     * @param {Number} m1 - le mois de la date de la première date en chiffres
     * @param {Number} a1 - l'année de la date de la première date en chiffres
     * @param {Number} j2 - le jour du mois de la deuxième date en chiffres
     * @param {Number} m2 - le mois de la date de la deuxième date en chiffres
     * @param {Number} a2 - l'année de la date de la deuxième date en chiffres
     * @return {Number} le nombre de jours entre les deux dates
     * @example
     * periodeEnJours(1, 1, 2016, 15, 1, 2016]); // 15
     * periodeEnJours(15, 1, 2016, 1, 1, 2016]); // 15
     * periodeEnJours(1, 1, 2016, 1, 1, 2016]); // 1
     */
    var periodeEnJours = function () {
      function periodeEnJours(j1, m1, a1, j2, m2, a2) {
        var date1 = dateValide(j1, m1, a1);
        var date2 = dateValide(j2, m2, a2);
        var debut = date2 > date1 ? date1 : date2;
        var fin = date2 > date1 ? date2 : date1;

        return Math.ceil((fin - debut) / (1000 * 60 * 60 * 24)) + 1;
      }

      return periodeEnJours;
    }();

    /**
     * Pour calculer le nombre de semaines depuis le début de l'année ou du mois.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} j - le jour du mois grégorien
     * @param {Number} m - le mois grégorien
     * @param {Number} a - l'année grégorienne
     * @param {Number} [mois] - par défaut, le calcul correspond à l'année.
     * Pour calculer sur le mois en cours, il suffit d'ajouter un argument.
     * @return {Number} le nombre de semaines
     * @example
     * semaineComplete(14, 7, 2016); // 28
     * semaineComplete(14, 7, 2016, 1); // 2
     */
    var semaineComplete = function () {
      function semaineComplete(j, m, a, mois) {
        // Si l'argument mois existe, calcule depuis le début du mois.
        // sinon depuis le début de l'année
        var x = mois ? m : 1;
        var jourSemaine = dateValide(1, x, a).getDay();

        jourSemaine = jourSemaine === 0 ? 7 : jourSemaine;

        // Si le premier jour < jeudi (4), ajouter une semaine
        var n = jourSemaine <= 4 ? 1 : 0;
        var nombreSemaines = (periodeEnJours(1, x, a, j, m, a) - (8 -
          jourSemaine)) / 7;
        var semainesValides = nombreSemaines > parseInt(nombreSemaines, 10) ?
          parseInt(nombreSemaines, 10) + n + 1 : parseInt(nombreSemaines,
            10) + n;

        return semainesValides;
      }

      return semaineComplete;
    }();

    /**
     * Pour convertir en nombre entier positif.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} num - le nombre à convertir
     * @return {Number} Le nombre entier positif
     * @example
     * absInt(-23.45); // 23
     */
    var absInt = function () {
      function absInt(num) {
        var result = Math.abs(parseInt(num, 10));

        return result;
      }

      return absInt;
    }();

    /**
     * Pour calculer l'année républicaine correspondant à un nombre de jours
     * juliens.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link fourmilab.ch/documents/calendar/|annee_da_la_revolution}
     * @param {Number} jj - Nombre de jours juliens
     * @return {Array} [0] An républicain,
     * [1] Nombre de jours juliens pour l'équinoxe de l'année républicaine
     * @example
     * anRepublicain(2379902.5); // [12, 2379857.5]
     */
    var anRepublicain = function () {
      function anRepublicain(jj) {
        var guess = jjVersGregorien(jj)[0] - 2;
        var lasteq = equinoxeAParis(guess);

        while (lasteq > jj) {
          guess--;
          lasteq = equinoxeAParis(guess);
        }

        var nexteq = lasteq - 1;

        while (!(lasteq <= jj && jj < nexteq)) {
          lasteq = nexteq;
          guess++;
          nexteq = equinoxeAParis(guess);
        }
        var adr = Math.round((lasteq - jjDebutRepublicain) / anneeTropique) +
          1;

        return [adr, lasteq];
      }

      return anRepublicain;
    }();

    /**
     * Pour convertir des chiffres arabes en chiffres romains.
     * @access private
     * @author Iván Montes
     * @since 0.0.1
     * @license unknown
     * @see {@link http://blog.stevenlevithan.com/?p=65#comment-16107|Blog}
     * @param {Number} arabe - Chiffre arabe
     * @return {String} Chiffre romain
     * @example
     * arabeVersRomain(2012); // 'MMXII'
     */
    var arabeVersRomain = function () {
      function arabeVersRomain(arabe) {
        var lookup = {
          M: 1000,
          CM: 900,
          D: 500,
          CD: 400,
          C: 100,
          XC: 90,
          L: 50,
          XL: 40,
          X: 10,
          IX: 9,
          V: 5,
          IV: 4,
          I: 1
        };
        var tempArabe = Math.abs(arabe);
        var sign = arabe < 0 ? '-' : '';
        var romain = '';
        var i = void 0;

        for (i in lookup) {
          /* istanbul ignore else  */
          if (lookup.hasOwnProperty(i)) {
            while (tempArabe >= lookup[i]) {
              romain += i;
              tempArabe -= lookup[i];
            }
          }
        }

        return sign + romain;
      }

      return arabeVersRomain;
    }();

    /**
     * Pour appliquer les balises et filtres aux prototypes gregorien(),
     * julien() et republicain().
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} x - Saisie
     * @param {Object} obj - Objet content les dates
     * @return {String} Saisie filtrée
     * @example
     * balisesEtFiltres(x, dobj(tvg));
     */
    var balisesEtFiltres = function () {
      function balisesEtFiltres(x, obj) {
        var arabe = void 0;
        var ordinaux = void 0;
        var res = x;
        var chiffres = true;

        // BALISES
        if (x.match(/A/)) {
          if (x.match(/AN/)) {
            // AN = Année
            res = obj.A;
          } else {
            // A = Année
            res = obj.A;
          }
        }
        if (x.match(/J/)) {
          if (x.match(/JA/)) {
            // JA = Jour dans l'Année
            res = obj.JA;
          } else {
            // J = Jour dans le mois
            res = obj.J;
          }
        }
        if (x.match(/M/)) {
          if (x.match(/MA/)) {
            // MA = Mois dans l'Année
            res = obj.M;
          } else if (x.match(/JM/)) {
            // JM = Jour dans le Mois
            res = obj.J;
          } else {
            // M = Mois dans l'année
            res = obj.M;
          }
        }
        if (x.match(/D/)) {
          if (x.match(/DA/)) {
            // DA = Décade/Semaine dans l'Année
            res = obj.S;
          } else if (x.match(/DM/)) {
            // DM = Décade/Semaine dans le Mois
            res = obj.D;
          } else if (x.match(/JD/)) {
            // JD = Jour de la Décade/Semaine
            res = obj.JS;
          } else {
            // D = Décade/Semaine dans le mois
            res = obj.D;
          }
        }
        if (x.match(/S/)) {
          if (x.match(/SA/)) {
            // SA = Décade/Semaine dans l'année
            res = obj.S;
          } else if (x.match(/SM/)) {
            // SM = Décade/Semaine dans le mois
            res = obj.D;
          } else if (x.match(/JS/)) {
            // JS = Jour de la décade/semaine
            res = obj.JS;
          } else {
            // S = Décade/Semaine dans l'année
            res = obj.S;
          }
        }

        /* FILTRES */
        if (x.match(/r/)) {
          // - r = chiffres en Romains
          arabe = res;
          res = arabeVersRomain(res);
        }
        if (x.match(/z/)) {
          // - z = Zéro devant le chiffre
          if (!arabe) {
            arabe = res;
          }
          res = prefixeZero(res);
        }
        if (x.match(/l|v/)) {
          if (x.match(/[^JDS](MA|M)/)) {
            // MAl | Ml = Mois en Lettres
            res = obj.Ml[0];
            chiffres = false;
          } else if (x.match(/(JS|JD)/)) {
            // JSl | JDl = Jour de la Décade/Semaine en Lettres
            res = obj.JSl[0];
            chiffres = false;
          } else {
            if (x.match(/v/)) {
              // - v = chiffres en lettres (Vieille notation)
              res = arabe ? nombreEnLettres(arabe, 1) : nombreEnLettres(res,
                1);
            } else {
              // - l = chiffres en Lettres
              res = arabe ? nombreEnLettres(arabe) : nombreEnLettres(res);
            }
            ordinaux = true;
          }
        }
        if (x.match(/a/)) {
          if (x.match(/[^JDS](MA|M)/)) {
            // MAa | Ma = Mois en Abrégé
            res = obj.Ml[1];
          }
          if (x.match(/(JS|JD)/)) {
            // JSa | JDa = Jour de la Décade/Semaine en Abrégé
            res = obj.JSl[1];
          }
        }
        if (x.match(/3/)) {
          if (x.match(/[^JDS](MA|M)/)) {
            // MA3 | M3 = Mois en Abrégé sur 3 caractères
            res = obj.Ml[2];
          }
          if (x.match(/(JS|JD)/)) {
            // JS3 | JD3 = Jour de la Décade/Semaine en Abrégé
            // sur 3 caractères
            res = obj.JSl[2];
          }
        }
        if (x.match(/2/)) {
          if (x.match(/[^JDS](MA|M)/)) {
            // MA2 | M2 = Mois en Abrégé sur 2 caractères
            res = obj.Ml[3];
          }
          if (x.match(/(JS|JD)/)) {
            // JS2 | JD2 = Jour de la Décade/Semaine en Abrégé
            // sur 2 caractères
            res = obj.JSl[3];
          }
        }
        if (x.match(/1/)) {
          if (x.match(/[^JDS](MA|M)/)) {
            // MA1 | M1 = Mois en Abrégé sur 1 caractère
            res = obj.Ml[4];
          }
          if (x.match(/(JS|JD)/)) {
            // JS1 | JD1 = Jour de la Décade/Semaine en Abrégé
            // sur 1 caractère
            res = obj.JSl[4];
          }
        }

        // ENCOURS bugs globaux avec chiffres et lettres
        // cf %Jrzl
        var lettres = res;

        // - o = lettres ou chiffres en Ordinaux
        if (x.match(/o/)) {
          /* istanbul ignore else  */
          if (ordinaux && x.match(/f/)) {
            res = ordinauxEnLettres(lettres, 1);
          } else if (ordinaux) {
            res = ordinauxEnLettres(lettres);
          } else if (x.match(/f/) && chiffres) {
            res = nombreOrdinal(lettres, 're', 'e');
          } else if (chiffres) {
            res = nombreOrdinal(lettres, 'er', 'e');
          }
        }

        // - p = Premier ou 1er
        if (x.match(/p/)) {
          if (ordinaux) {
            res = premierOrdinalEnLettres(lettres);
          } else {
            res = nombreOrdinal(lettres, 'er', '');
          }
        }

        // - f = Féminin de p (première ou 1re)
        if (x.match(/[^o]f/)) {
          if (ordinaux) {
            res = premierOrdinalEnLettres(lettres, 1);
          } else {
            res = nombreOrdinal(lettres, 're', '');
          }
        }
        if (x.match(/b/)) {
          // - b = en Bas de casse (minuscules)
          res = res.toString().toLowerCase();
        }
        if (x.match(/c|m/)) {
          // - c | m = en Capitales (Majuscules)
          res = res.toString().toUpperCase();
        }
        return res;
      }

      return balisesEtFiltres;
    }();

    /**
     * Pour générer les prototypes de formatage de Jour.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {String} format - Un format personnalisé
     * @param {String} erreur - Un message d'erreur personnalisé
     * @param {Function} rappel - Une fonction de rappel
     * @param {String} df - Le format par défaut
     * @param {Object} dt - La référence aux variables dans Jour
     * @param {Object} dd - La référence exlicite à une variable dans dt
     * @param {Object} dobj - Une fonction ou un objet utilisable
     * @param {Object} [pro] - Une référence issue du prototype si nécessaire
     * @return {String} La date formatée
     * @example
     * formatageDeJour(format, erreur, rappel, '%Jp %Mlb %A',
     * 'Pas de correspondances.', this.variables.gregorien, objGregorien);
     */
    var formatageDeJour = function () {
      function formatageDeJour(format, erreur, rappel, df, dt, dd, dobj,
        pro) {
        var frmt = format || df;
        var err = erreur || 'Pas de correspondances.';
        var tvg = dt;
        var resultat = void 0;

        // Correspondances uniquement si inférieur à anneeMax
        if (Math.abs(tvg[dd]) < anneeMax) {
          resultat = frmt.replace(/%[ADJMNSabcflmoprvz123]+/g,

            // jscs:disable
            function (x) {
              // jscs:enable
              var res = balisesEtFiltres(x, dobj(tvg, pro));

              return res;
            });
          if (typeof rappel === 'function') {
            resultat = rappel(resultat, dobj(tvg, pro));
          }
        } else {
          resultat = err;
        }
        return resultat;
      }

      return formatageDeJour;
    }();

    /**
     * Pour calculer une date julienne à partir du nombre de jours juliens.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|jd_to_julian}
     * @param {Number} jj - Nombre de jours juliens
     * @return {Array} [0] An, [1] Mois et [2] Jour julien
     * @example
     * jjVersJulien(2457346.5); // [2015,11,7]
     */
    var jjVersJulien = function () {
      function jjVersJulien(jj) {
        var b = Math.floor(jj + 0.5) + 1524;
        var c = Math.floor((b - 122.1) / 365.25);
        var d = Math.floor(365.25 * c);
        var e = Math.floor((b - d) / 30.6001);
        var mois = Math.floor(e < 14 ? e - 1 : e - 13);
        var jour = b - d - Math.floor(30.6001 * e);
        var an = Math.floor(mois > 2 ? c - 4716 : c - 4715);

        if (an < 1) {
          an--;
        }

        return [an, mois, jour];
      }

      return jjVersJulien;
    }();

    /**
     * Pour calculer la date républicaine à partir du nombre de jours juliens,
     * les 4 ou 5 'sansculottides' sont considérés comme un 13e mois.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link fourmilab.ch/documents/calendar/|jd_to_french_revolutionary}
     * @param {Number} jj - Nombre de jours juliens
     * @return {Array} [0] An, [1] Mois, [2] Décade et [3] Jour républicain
     * @example
     * jjVersRepublicain(2379902.5); // [12, 2, 2, 6]
     */
    var jjVersRepublicain = function () {
      function jjVersRepublicain(jj) {
        var tempJj = Math.floor(jj) + 0.5;
        var adr = anRepublicain(tempJj);
        var an = adr[0];
        var equinox = adr[1];
        var mois = Math.floor((tempJj - equinox) / 30) + 1;
        var jour = (tempJj - equinox) % 30;
        var decade = Math.floor(jour / 10) + 1;

        jour = jour % 10 + 1;

        return [an, mois, decade, jour];
      }

      return jjVersRepublicain;
    }();

    /**
     * Pour calculer le jour de la semaine à partir du nombre de jours juliens.
     * @access private
     * @author John Walker
     * @since 0.0.15
     * @license Domaine public
     * @see {@link http://fourmilab.ch/documents/calendar/|jwday}
     * @param  {Number} jj - Nombre de jours juliens
     * @return {Number} Le jour de la semaine (0-6)
     * @example
     * jourSemaineJulien(2378625.5); // 6
     */
    var jourSemaineJulien = function () {
      function jourSemaineJulien(jj) {
        var result = reste(Math.floor(jj + 1.5), 7);

        return result;
      }

      return jourSemaineJulien;
    }();

    /**
     * Pour retourner un objet utilisable par le prototype .gregorien().
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Object} d - un objet de Jour.variables
     * @param {Object} [pro] - Une référence issue du prototype si nécessaire
     * @return {Object} result - un nouvel objet contenant toutes les valeurs
     * @example
     * objGregorien(tvg);
     */
    var objGregorien = function () {
      function objGregorien(d, pro) {
        var js = void 0;

        if (pro === 'julAp1582') {
          js = jourSemaineJulien(d.jj);
        } else if (pro === 'julAv1582') {
          js = jourSemaineJulien(d.jj);
          js = js - 4 < 0 ? js + 3 : js - 4;
        } else {
          js = d.od.getDay();
        }
        var result = {

          // A = Année
          A: d.a,

          // M = Mois dans l'année
          M: d.m,

          // J = Jour dans le mois
          J: d.jm,

          // D = Décade/Semaine dans le mois
          D: semaineComplete(d.jm, d.m, d.a, 1),

          // S = Décade/Semaine dans l'année
          S: semaineComplete(d.jm, d.m, d.a, 0),

          // JA = Jour dans l'Année
          JA: periodeEnJours(1, 1, d.a, d.jm, d.m, d.a),

          // JS = Jour de la décade/semaine
          JS: js,

          // Ml = Mois dans l'année en lettres
          Ml: moisGregorien[d.m - 1],

          // JSl = Jour de la décade/semaine en lettres
          JSl: jourGregorien[js]
        };

        return result;
      }

      return objGregorien;
    }();

    /**
     * Pour retourner un objet utilisable par le prototype .republicain().
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.15
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Object} d - un objet de Jour.variables
     * @return {Object} result - un nouvel objet contenant toutes les valeurs
     * @example
     * objGregorien(tvg);
     */
    var objRepublicain = function () {
      function objRepublicain(d) {
        var result = {

          // A = Année
          A: d.a,

          // M = Mois dans l'année
          M: d.m,

          // J = Jour dans le mois
          J: d.jm,

          // D = Décade/Semaine dans le mois
          D: d.d,

          // S = Décade/Semaine dans l'année
          S: (d.m - 1) * 3 + d.d,

          // JA = Jour dans l'Année
          JA: (d.m - 1) * 30 + d.jm,

          // JS = Jour de la décade/semaine
          JS: d.jd,

          // Ml = Mois dans l'année en lettres
          Ml: moisRepublicain[d.m - 1],

          // JSl = Jour de la décade/semaine en lettres
          JSl: jourRepublicain[d.jd - 1]
        };

        return result;
      }

      return objRepublicain;
    }();

    /**
     * Pour remplacer en série avec un objet contenant des regex.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {String} texte - Le texte à modifier
     * @param {Object} regex - Les expressions régulières de remplacements
     * @param {String} options - Les options des expressions régulières
     * @return {String} Le texte modifié
     * @example
     * remplacements('Bonjour', {'jour': 'soir'}, 'gi');
     * // 'Bonsoir'
     */
    var remplacements = function () {
      function remplacements(texte, regex, options) {
        var resultat = regex.reduce(

          // jscs:disable
          function (data, item) {
            var result = data.replace(new RegExp(item.regexp, options),
              item.replace);

            return result;
          }, texte);

        // jscs:enable
        return resultat;
      }

      return remplacements;
    }();

    /**
     * Pour calculer le nombre de jours juliens à partir d'une date républicaine.
     * @access private
     * @author John Walker
     * @since 0.0.1
     * @license Domaine public
     * @see {@link fourmilab.ch/documents/calendar/|french_revolutionary_to_jd}
     * @param {Number} an - Année républicaine
     * @param {Number} mois - Mois républicain
     * @param {Number} decade - Décade républicaine
     * @param {Number} jour - Jour de la décade républicaine
     * @return {Number} Nombre de jours juliens
     * @example
     * republicainVersJj(12, 2, 2, 6); // 2379902.5
     */
    var republicainVersJj = function () {
      function republicainVersJj(an, mois, decade, jour) {
        var guess = jjDebutRepublicain + anneeTropique * (an - 1 - 1);
        var adr = [an - 1, 0];

        while (adr[0] < an) {
          adr = anRepublicain(guess);
          guess = adr[1] + (anneeTropique + 2);
        }

        return adr[1] + 30 * (mois - 1) + 10 * (decade - 1) + (jour - 1);
      }

      return republicainVersJj;
    }();

    /**
     * Pour convertir le jour du mois républicain en décade.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} rjmc - le jour du mois républicain
     * @return {Number} La décade républicaine
     * @example
     * rjmcVersRdc(28); // 3
     */
    var rjmcVersRdc = function () {
      function rjmcVersRdc(rjmc) {
        var resultat = Math.abs(parseInt(rjmc, 10) % 10) === 0 ? Math.abs(
          parseInt(rjmc / 10, 10)) : Math.abs(parseInt(rjmc / 10, 10) + 1);

        return resultat;
      }

      return rjmcVersRdc;
    }();

    /**
     * Pour convertir le jour du mois républicain en jour de la décade.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {Number} rjmc - le jour du mois républicain
     * @return {Number} Le jour de la décade républicaine
     * @example
     * rjmcVersRjdc(28); // 8
     */
    var rjmcVersRjdc = function () {
      function rjmcVersRjdc(rjmc) {
        var resultat = Math.abs(parseInt(rjmc, 10) % 10) === 0 ? 10 : Math.abs(
          parseInt(rjmc, 10) % 10);

        return resultat;
      }

      return rjmcVersRjdc;
    }();

    /**
     * Pour convertir des chiffres romains en chiffres arabes.
     * @access private
     * @author Iván Montes
     * @since 0.0.1
     * @license unknown
     * @see {@link http://blog.stevenlevithan.com/?p=65#comment-16129|Blog}
     * @param {String} romain - Chiffre romain
     * @return {Number} Chiffre arabe
     * @example
     * romainVersArabe('MMXII'); // 2012
     */
    var romainVersArabe = function () {
      function romainVersArabe(romain) {
        var lookup = {
          I: 1,
          V: 5,
          X: 10,
          L: 50,
          C: 100,
          D: 500,
          M: 1000
        };
        var arabe = 0;
        var i = romain.length - 1;
        var tempRomain = romain.toUpperCase();

        for (i; i >= 0; i--) {
          if (lookup[tempRomain[i]] < lookup[tempRomain[i + 1]]) {
            arabe -= lookup[tempRomain[i]];
          } else {
            arabe += lookup[tempRomain[i]];
          }
        }

        return arabe;
      }

      return romainVersArabe;
    }();

    /**
     * Pour obtenir une saisie valide.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {String} saisie - La saisie d'une date
     * @param {Object} regexp - Un objet regexpRepublicain ou regexpGregorien
     * pour convertir les mois
     * @return {Array} La saisie valide
     * @example
     * saisieValide(saisie, regexpRepublicain);
     * saisieValide(saisie, regexpGregorien);
     */
    var saisieValide = function () {
      function saisieValide(saisie, regexp) {
        var tempSaisie = saisie;
        var u = void 0;

        // On remplace le texte restant par des chiffres arabes
        tempSaisie = remplacements(tempSaisie, regexp, 'gi').split(
          /[\/\.]+/gi);

        // Si il n'y a que l'année [1,1,ac]
        if (!tempSaisie[1] && !tempSaisie[2]) {
          if (tempSaisie[0].match(/\d-/gi) || tempSaisie[0] === '') {
            tempSaisie[0] = u;
          } else {
            tempSaisie = [1, 1, tempSaisie[0]];
          }
        }

        // Si il n'y a que l'année et le mois [1,mc,ac]
        if (!tempSaisie[0] && tempSaisie[1] && tempSaisie[2]) {
          tempSaisie = [1, tempSaisie[1], tempSaisie[2]];
        }
        if (tempSaisie[1] && !tempSaisie[2]) {
          tempSaisie = [1, tempSaisie[0], tempSaisie[1]];
        }

        return tempSaisie;
      }

      return saisieValide;
    }();

    /**
     * Pour convertir la saisie grégorienne ou julienne en Objet Jour.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {String} saisie - Saisie d'une date
     * @param {Boolean} limites - Par défaut, les résultats sont limités
     * aux périodes d'utilisation des calendriers. Seule la valeur `false`
     * permet de désactiver ces limites.
     * @return {Array} Les dates républicaines, grégoriennes et juliennes
     * @example
     * tabGregorien(saisie, this.limites);
     */
    var tabGregorien = function () {
      function tabGregorien(saisie, limites) {
        // Uniformisation de la saisie
        var iesaisie = saisie[0] === '/' ? '1' + saisie : saisie;
        var saisieGregorien = iesaisie.replace(
          /\W?an\s-?([-MDCLXVI]+)\W?/gi,

          // jscs:disable
          function (x, p1) {
            var rva = romainVersArabe(p1);

            return x.match(/-/) ? ' -' + rva : ' ' + rva;
          });

        // jscs:enable
        var tab = [];

        saisieGregorien = saisieValide(saisieGregorien, regexpGregorien);

        // Lorsque la date est valide [gjmc,gmc,gac]
        if (saisieGregorien[2] && saisieGregorien[0] < 32 && absInt(
            saisieGregorien[0]) !== 0 && saisieGregorien[1] < 13 &&
          saisieGregorien[1] > 0 && saisieGregorien[1] !== '' && absInt(
            saisieGregorien[1]) !== 0 && saisieGregorien[0] <=
          joursDansLeMois[saisieGregorien[1] - 1]) {
          tab[4] = gregorienVersJj(parseInt(saisieGregorien[2], 10), absInt(
            saisieGregorien[1]), absInt(saisieGregorien[0]));

          // Si limitation et avant début du calendrier grégorien
          if (limites === true && tab[4] < gregorienVersJj(
              dateDebutGregorien[2], dateDebutGregorien[1],
              dateDebutGregorien[0])) {
            tab[5] = absInt(saisieGregorien[0]);
            tab[6] = absInt(saisieGregorien[1]);
            tab[7] = parseInt(saisieGregorien[2], 10);
            tab[8] = dateValide(tab[5], tab[6], tab[7]);

            // Si limitation et après la fin du calendrier julien
            if (tab[8] > dateValide(dateFinJulien[0], dateFinJulien[1],
                dateFinJulien[2])) {
              if (tab[5] + retardJulien > joursDansLeMois[tab[6] - 1]) {
                tab[0] = tab[5] + retardJulien - joursDansLeMois[tab[6] - 1];
                tab[1] = tab[6] + 1;
              } else {
                tab[0] = tab[5] + retardJulien;
                tab[1] = tab[6];
              }
              tab[2] = tab[7];
              tab[3] = dateValide(tab[0], tab[1], tab[2]);
            }

            // Résultats gregorien/julien standards et/ou débridés
          } else {
            tab[0] = absInt(saisieGregorien[0]);
            tab[1] = absInt(saisieGregorien[1]);
            tab[2] = parseInt(saisieGregorien[2], 10);
            tab[3] = dateValide(tab[0], tab[1], tab[2]);

            // Si débridé
            if (limites === false) {
              var dateJulienne = jjVersJulien(tab[4]);

              tab[5] = dateJulienne[2];
              tab[6] = dateJulienne[1];
              tab[7] = dateJulienne[0];
              tab[8] = dateValide(tab[5], tab[6], tab[7]);
            }
          }

          // Limitations republicain
          if (tab[4] >= jjDebutRepublicain && tab[4] <= jjFinRepublicain ||
            tab[4] >= jjDebutCommuneDeParis && tab[4] <=
            jjFinCommuneDeParis || limites === false) {
            var dateRepublicaine = jjVersRepublicain(tab[4]);

            tab[9] = dateRepublicaine[3];
            tab[10] = dateRepublicaine[2];
            tab[11] = (dateRepublicaine[2] - 1) * 10 + dateRepublicaine[3];
            tab[12] = dateRepublicaine[1];
            tab[13] = dateRepublicaine[0];
          }
        }

        return tab;
      }

      return tabGregorien;
    }();

    /**
     * Pour convertir la saisie républicaine en Objet Jour.
     * @access private
     * @author Gilles Toubiana
     * @since 0.0.1
     * @license MIT
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {String} saisie - Saisie d'une date
     * @param {Boolean} limites - Par défaut, les résultats sont limités
     * aux périodes d'utilisation des calendriers. Seule la valeur `false`
     * permet de désactiver ces limites.
     * @return {Array} Les dates républicaines, grégoriennes et juliennes
     * @example
     * tabRepublicain(saisie, this.limites);
     */
    var tabRepublicain = function () {
      function tabRepublicain(saisie, limites) {
        // On remplace les chiffres romains en chiffres arabes
        var saisieRepublicain = saisie.replace(
          /\W?an\s-?([-MDCLXVI]+)\W?/gi,

          // jscs:disable
          function (x, p1) {
            var rva = romainVersArabe(p1);

            return x.match(/-/) ? ' -' + rva : ' ' + rva;
          });

        // jscs:enable
        var tab = [];

        // Uniformisation de la saisie
        saisieRepublicain = saisieValide(saisieRepublicain,
          regexpRepublicain);

        // Lorsque la date est valide [rjmc,rmc,rac]
        if (saisieRepublicain[2] < anneeMax && saisieRepublicain[0] < 31 &&
          absInt(saisieRepublicain[0]) !== 0 && saisieRepublicain[1] < 14 &&
          absInt(saisieRepublicain[1]) !== 0) {
          tab[4] = republicainVersJj(parseInt(saisieRepublicain[2], 10),
            parseInt(saisieRepublicain[1], 10), rjmcVersRdc(
              saisieRepublicain[0]), rjmcVersRjdc(saisieRepublicain[0]));

          // Si jj (tab[4]) est dans les limites ou en illimité
          if (tab[4] >= jjDebutRepublicain && tab[4] <= jjFinRepublicain ||
            tab[4] >= jjDebutCommuneDeParis && tab[4] <=
            jjFinCommuneDeParis || limites === false) {
            var dateGregorienne = jjVersGregorien(tab[4]);
            var dateJulienne = jjVersJulien(tab[4]);

            tab[0] = dateGregorienne[2];
            tab[1] = dateGregorienne[1];
            tab[2] = dateGregorienne[0];
            tab[3] = dateValide(tab[0], tab[1], tab[2]);
            tab[5] = dateJulienne[2];
            tab[6] = dateJulienne[1];
            tab[7] = dateJulienne[0];
            tab[8] = dateValide(tab[5], tab[6], tab[7]);
            tab[9] = rjmcVersRjdc(saisieRepublicain[0]);
            tab[10] = rjmcVersRdc(saisieRepublicain[0]);
            tab[11] = absInt(saisieRepublicain[0]);
            tab[12] = parseInt(saisieRepublicain[1], 10);
            tab[13] = parseInt(saisieRepublicain[2], 10);
          }
        }

        return tab;
      }

      return tabRepublicain;
    }();

    /**
     * Pour convertir une saisie en objet JavaScript.
     * @memberof acte
     * @class
     * @chainable
     * @access public
     * @author Gilles Toubiana
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @param {String} saisie - Saisie d'une date grégorienne ou républicaine.
     * @param {Boolean} [limites=true] - Par défaut, les résultats sont limités
     * aux périodes d'utilisation des calendriers :<br>
     * - une saisie de date grégorienne sera considérée comme julienne avant
     * le 15/10/1582<br>
     * - une saisie de date républicaine ne sera valide que du 22/9/1792 au
     * 31/12/1805 (Période républicaine) et du 18/3/1871 au 28/5/1871
     * (Commune de Paris).<br>
     * La valeur `false` permet de désactiver ces limitations.
     * @example
     * new acte.Jour('15/10/1582').gregorien() // 15 octobre 1582
     * new acte.Jour('5 Xbre 1793').gregorien() // 5 décembre 1793
     * new acte.Jour('5 Jet 1793').gregorien() // 5 juillet 1793
     * new acte.Jour('10 nivôse an XIV').gregorien() // 31 décembre 1805
     * new acte.Jour('8 frimaire an XVIII').gregorien() // Pas de correspondances.
     * new acte.Jour('8 frimaire an XVIII', false).gregorien() // 29 novembre 1809
     * new acte.Jour('14/10/1582').gregorien() // Pas de correspondances.
     * new acte.Jour('14/10/1582', false).gregorien() // 14 octobre 1582
     * @since 0.0.1
     * @license MIT
     */
    acte.Jour = function () {
      function Jour(saisie, limites) {
        _classCallCheck(this, Jour);

        var tab = [];

        this.variables = this.variables || {};
        this.limites = limites !== false;

        // On détecte si c'est une date républicaine
        if (saisie.match(
            /(i(d|r)|(ô|o)s|a(d|l)|or).*\Wan\s-?([-MDCLXVI]+|\d+)\W?/gi) ||
          saisie.match(/^an\s-?([-MDCLXVI]+|\d+)/gmi)) {
          tab = tabRepublicain(saisie, this.limites);

          // Si ce n'est pas du républicain (donc grégorien ou julien)
        } else {
          tab = tabGregorien(saisie, this.limites);
        }

        // Ecriture de toutes les valeurs
        this.variables = {
          gregorien: {
            jm: tab[0],
            m: tab[1],
            a: tab[2],
            od: tab[3]
          },
          julien: {
            jj: tab[4],
            jm: tab[5],
            m: tab[6],
            a: tab[7],
            od: tab[8]
          },
          republicain: {
            jd: tab[9],
            d: tab[10],
            jm: tab[11],
            m: tab[12],
            a: tab[13]
          },
          limites: this.limites
        };
      }

      return Jour;
    }();

    /**
     * Pour formater une date grégorienne.
     * @memberof acte
     * @access public
     * @since 0.0.15
     * @author Gilles Toubiana
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @license MIT
     * @param {String} [format='%Jp %Mlb %A'] - Le modèle de formatage :<br><br>
     * <strong>BALISES</strong><br>
     * `%A` ou `%AN` - Année<br>
     * `%D`, `%DM` ou `%SM` - Décade/Semaine dans le mois<br>
     * `%J` ou `%JM` - Jour dans le mois<br>
     * `%JA` - Jour dans l'année<br>
     * `%JS` ou `%JD` - Jour de la Décade/Semaine<br>
     * `%M` ou `%MA` - Mois dans l'année<br>
     * `%S`, `%SA` ou `%DA` - Semaine/Décade dans l'année<br><br>
     * <strong>FILTRES</strong><br>
     * `1` - mois ou jour sur 1 caractère<br>
     * `2` - mois ou jour sur 2 caractères<br>
     * `3` - mois ou jour sur 3 caractères<br>
     * `a` - mois ou jour en Abrégé<br>
     * `b` - en Bas de casse (minuscules)<br>
     * `c` ou `m` - en Capitales (Majuscules)<br>
     * `f` - Féminin de p (première ou 1re)<br>
     * `l` - chiffres en Lettres<br>
     * `o` - lettres ou chiffres en Ordinaux<br>
     * `p` - Premier ou 1er<br>
     * `r` - chiffres en Romains<br>
     * `v` - chiffres en lettres (Vieille notation)<br>
     * `z` - Zéro devant le chiffre<br>
     * @param {String} [erreur='Pas de correspondances.'] - Le message d'erreur
     * @param {Function} [rappel] - Une fonction de rappel
     * @return {String} La date grégorienne formatée
     * @example
     * new acte.Jour('1/1/1600').gregorien() // '1er janvier 1600'
     * new acte.Jour('').gregorien(0, 'Erreur.') // 'Erreur.'
     * new acte.Jour('3 avril 1605').gregorien('%Jz/%Mz', 0, ((res, obj) => {
     *   const an = (obj.A % 100) < 10 ? `0${obj.A % 100}` : obj.A % 100;
     *   return `${res}/${an}`;
     * }))) // '03/04/05'
     */
    acte.Jour.prototype.gregorien = function () {
      function gregorien(format, erreur, rappel) {
        var resultat = formatageDeJour(format, erreur, rappel,
          '%Jp %Mlb %A', this.variables.gregorien, 'a', objGregorien);

        return resultat;
      }

      return gregorien;
    }();

    /**
     * Pour formater une date julienne.
     * @memberof acte
     * @access public
     * @since 0.0.15
     * @author Gilles Toubiana
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @license MIT
     * @param {String} [format='%Jp %Mlb %A'] - Le modèle de formatage.<br>
     * Voir [.gregorien](#acte.Jour+gregorien) pour la syntaxe.
     * @param {String} [erreur='Pas de correspondances.'] - Le message d'erreur
     * @param {Function} [rappel] - Une fonction de rappel
     * @return {String} La date julienne formatée
     * @example
     * new acte.Jour('1/1/1600').julien() // '22 décembre 1599'
     * new acte.Jour('').julien(0, 'Erreur.') // 'Erreur.'
     * new acte.Jour('3 avril 1605').julien('%Jz/%Mz', 0, ((res, obj) => {
     *   const an = (obj.A % 100) < 10 ? `0${obj.A % 100}` : obj.A % 100;
     *   return `${res}/${an}`;
     * }))) // '24/03/05'
     */
    acte.Jour.prototype.julien = function () {
      function julien(format, erreur, rappel) {
        var jsjulien = this.variables.julien.jj < 2299160.5 && this.variables
          .limites === true ? 'julAv1582' : 'julAp1582';
        var resultat = formatageDeJour(format, erreur, rappel,
          '%Jp %Mlb %A', this.variables.julien, 'a', objGregorien,
          jsjulien);

        return resultat;
      }

      return julien;
    }();

    /**
     * Pour formater une date républicaine.
     * @memberof acte
     * @access public
     * @since 0.0.15
     * @author Gilles Toubiana
     * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
     * @license MIT
     * @param {String} [format='%Jp %Mlb %A'] - Le modèle de formatage.<br>
     * Voir [.gregorien](#acte.Jour+gregorien) pour la syntaxe.
     * @param {String} [erreur='Pas de correspondances.'] - Le message d'erreur
     * @param {Function} [rappel] - Une fonction de rappel
     * @return {String} La date républicaine formatée
     * @example
     * new acte.Jour('1/1/1800').republicain() // '11 nivôse an VIII'
     * new acte.Jour('').republicain(0, 'Erreur.') // 'Erreur.'
     * new acte.Jour('3 avril 1805').republicain('%Jz/%Dz/%Mz', 0, ((r, o) => {
     *   const an = (o.A % 100) < 10 ? `0${o.A % 100}` : o.A % 100;
     *   return `${r}/${an}`;
     * }))) // '13/02/07/13'
     */
    acte.Jour.prototype.republicain = function () {
      function republicain(format, erreur, rappel) {
        var resultat = formatageDeJour(format, erreur, rappel,
          '%Jp %Mlb an %Ar', this.variables.republicain, 'a',
          objRepublicain);

        return resultat;
      }

      return republicain;
    }();
    return acte;
  }

  return umdCallback;
}());
