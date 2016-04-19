/**
 * acte - Librairie Javascript pour manipuler des données généalogiques
 * @copyright 2015-Present, Gilles Toubiana
 * @namespace acte
 * @version 0.0.6-10
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @license MIT
 */
(function universalModuleDefinition(root, factory) {
  const tempRoot = root;

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
}(this, () => {
  /** @namespace */
  /* eslint-disable no-use-before-define */
  const acte = acte || {};

  /* eslint-enable no-use-before-define */
  /**
   * Tableau des Delta T (différence entre Temps universel et temps terrestre)
   * tous les 2 ans de 1620 à 2014
   * @access private
   * @author John Walker & Gilles Toubiana
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|deltaTtab} |
   * {@link http://maia.usno.navy.mil/ser7/deltat.data|Valeurs} |
   * {@link http://maia.usno.navy.mil/ser7/deltat.preds|Predictions} |
   * {@link http://eclipse.gsfc.nasa.gov/SEcat5/deltatpoly.html|Expressions}
   * @constant {Array}
   */
  const delta = [
    121, 112, 103, 95, 88,
    82, 77, 72, 68, 63,
    60, 56, 53, 51, 48,
    46, 44, 42, 40, 38,
    35, 33, 31, 29, 26,
    24, 22, 20, 18, 16,
    14, 12, 11, 10, 9,
    8, 7, 7, 7, 7,
    7, 7, 8, 8, 9,
    9, 9, 9, 9, 10,
    10, 10, 10, 10, 10,
    10, 10, 11, 11, 11,
    11, 11, 12, 12, 12,
    12, 13, 13, 13, 14,
    14, 14, 14, 15, 15,
    15, 15, 15, 16, 16,
    16, 16, 16, 16, 16,
    16, 15, 15, 14, 13,
    13.1, 12.5, 12.2, 12, 12,
    12, 12, 12, 12, 11.9,
    11.6, 11, 10.2, 9.2, 8.2,
    7.1, 6.2, 5.6, 5.4, 5.3,
    5.4, 5.6, 5.9, 6.2, 6.5,
    6.8, 7.1, 7.3, 7.5, 7.6,
    7.7, 7.3, 6.2, 5.2, 2.7,
    1.4, (-1.2), (-2.8), (-3.8), (-4.8),
    (-5.5), (-5.3), (-5.6), (-5.7), (-5.9),
    (-6), (-6.3), (-6.5), (-6.2), (-4.7),
    (-2.8), (-0.1), 2.6, 5.3, 7.7,
    10.4, 13.3, 16, 18.2, 20.2,
    21.1, 22.4, 23.5, 23.8, 24.3,
    24, 23.9, 23.9, 23.7, 24,
    24.3, 25.3, 26.2, 27.3, 28.2,
    29.1, 30, 30.7, 31.4, 32.2,
    33.1, 34, 35, 36.5, 38.3,
    40.2, 42.2, 44.9, 46.9, 49,
    50.9, 52.5, 54, 55.1, 56.1,
    57.2, 58.7, 60.4, 61.9, 63.2,
    64, 64.4, 64.6, 65, 65.6,
    66.2, 66.7, 67.5,
  ];

  /**
   * Jours juliens des équinoxes avant l'an 1000
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|JDE0tab1000}
   * @constant {Array}
   */
  const jde0Tab1000 = [
    [1721139.29189, 365242.13740, 0.06134, 0.00111, -0.00071],
    [1721233.25401, 365241.72562, -0.05323, 0.00907, 0.00025],
    [1721325.70455, 365242.49558, -0.11677, -0.00297, 0.00074],
    [1721414.39987, 365242.88257, -0.00769, -0.00933, -0.00006],
  ];

  /**
   * Jours juliens des équinoxes de l'an 1000 à l'an 2000
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|JDE0tab2000}
   * @constant {Array}
   */
  const jde0Tab2000 = [
    [2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057],
    [2451716.56767, 365241.62603, 0.00325, 0.00888, -0.00030],
    [2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078],
    [2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032],
  ];

  /**
   * Nombre de jours, sur Terre, pour que le Soleil retourne à la même
   * position
   * dans le cycle des saisons
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|TropicalYear}
   * @constant {Number}
   */
  const anneeTropique = 365.24219878;

  /**
   * Coefficient des sinus et cosinus de l'argument pour la nutation
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|nutArgCoeff}
   * @constant {Array}
   */
  const argNutCoeff = [(-171996), (-1742), 92095, 89, (-13187), (-16), 5736,
    (-31), (-2274), (-2), 977, (-5), 2062, 2, (-895), 5, 1426, (-34), 54,
    (-1), 712, 1, (-7), 0, (-517), 12, 224, (-6), (-386), (-4), 200, 0,
    (-301), 0, 129, (-1), 217, (-5), (-95), 3, (-158), 0, 0, 0, 129, 1,
    (-70), 0, 123, 0, (-53), 0, 63, 0, 0, 0, 63, 1, (-33), 0, (-59), 0,
    26, 0, (-58), (-1), 32, 0, (-51), 0, 27, 0, 48, 0, 0, 0, 46, 0, (-24),
    0, (-38), 0, 16, 0, (-31), 0, 13, 0, 29, 0, 0, 0, 29, 0, (-12), 0, 26,
    0, 0, 0, (-22), 0, 0, 0, 21, 0, (-10), 0, 17, (-1), 0, 0, 16, 0, (-8),
    0, (-16), 1, 7, 0, (-15), 0, 9, 0, (-13), 0, 7, 0, (-12), 0, 6, 0, 11,
    0, 0, 0, (-10), 0, 5, 0, (-8), 0, 3, 0, 7, 0, (-3), 0, (-7), 0, 0, 0,
    (-7), 0, 3, 0, (-7), 0, 3, 0, 6, 0, 0, 0, 6, 0, (-3), 0, 6, 0, (-3),
    0, (-6), 0, 3, 0, (-6), 0, 3, 0, 5, 0, 0, 0, (-5), 0, 3, 0, (-5), 0,
    3, 0, (-5), 0, 3, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, (-4), 0, 0,
    0, (-4), 0, 0, 0, (-4), 0, 0, 0, 3, 0, 0, 0, (-3), 0, 0, 0, (-3), 0,
    0, 0, (-3), 0, 0, 0, (-3), 0, 0, 0, (-3), 0, 0, 0, (-3), 0, 0, 0,
    (-3), 0, 0, 0,
  ];

  /**
   * Termes périodiques pour la nutation en longitude et obliquité
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|nutArgMult}
   * @constant {Array}
   */
  const argNutMult = [
    0, 0, 0, 0, 1, (-2), 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 1,
    0, 0, 0, 0, 0, 1, 0, 0, (-2), 1, 0, 2, 2, 0, 0, 0, 2, 1, 0, 0, 1, 2,
    2, (-2), (-1), 0, 2, 2, (-2), 0, 1, 0, 0, (-2), 0, 0, 2, 1, 0, 0, (-1),
    2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 0, (-1), 2, 2, 0, 0, (-1), 0, 1,
    0, 0, 1, 2, 1, (-2), 0, 2, 0, 0, 0, 0, (-2), 2, 1, 2, 0, 0, 2, 2, 0,
    0, 2, 2, 2, 0, 0, 2, 0, 0, (-2), 0, 1, 2, 2, 0, 0, 0, 2, 0, (-2), 0,
    0, 2, 0, 0, 0, (-1), 2, 1, 0, 2, 0, 0, 0, 2, 0, (-1), 0, 1, (-2), 2, 0,
    2, 2, 0, 1, 0, 0, 1, (-2), 0, 1, 0, 1, 0, (-1), 0, 0, 1, 0, 0, 2, (-2),
    0, 2, 0, (-1), 2, 1, 2, 0, 1, 2, 2, 0, 1, 0, 2, 2, (-2), 1, 1, 0, 0, 0,
    (-1), 0, 2, 2, 2, 0, 0, 2, 1, 2, 0, 1, 0, 0, (-2), 0, 2, 2, 2, (-2), 0,
    1, 2, 1, 2, 0, (-2), 0, 1, 2, 0, 0, 0, 1, 0, (-1), 1, 0, 0, (-2), (-1),
    0, 2, 1, (-2), 0, 0, 0, 1, 0, 0, 2, 2, 1, (-2), 0, 2, 0, 1, (-2), 1, 0,
    2, 1, 0, 0, 1, (-2), 0, (-1), 0, 1, 0, 0, (-2), 1, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 2, 0, (-1), (-1), 1, 0, 0, 0, 1, 1, 0, 0, 0, (-1), 1, 2, 2,
    2, (-1), (-1), 2, 2, 0, 0, (-2), 2, 2, 0, 0, 3, 2, 2, 2, (-1), 0, 2, 2,
  ];

  /**
   * Nombre de jours juliens correspondants à l'an 1 gregorien
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|GREGORIAN_EPOCH}
   * @constant {Number}
   * @example
   * jjVersGregorien(1721425.5); // [1, 1, 1]
   */
  const jjAn1Gregorien = 1721425.5;

  /**
   * Nombre de jours juliens correspondants à l'an 2000 grégorien
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|J2000}
   * @constant {Number}
   * @example
   * jjVersGregorien(2451545.0); // [2000, 1, 1]
   */
  const jjAn2000Gregorien = 2451545.0;

  /**
   * Nombre de jours juliens correspondants à l'adoption du calendrier
   * républicain dans le journal officiel lors de la Commune de Paris
   * en 1871
   * @access private
   * @author Gilles Toubiana
   * @since 0.0.1
   * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
   * @constant {Number}
   * @example
   * jjVersGregorien(2404504.5); // [1871, 3, 18]
   * jjVersRepublicain(2404504.5); // [79, 6, 3, 7]
   */
  const jjDebutCommuneDeParis = 2404504.5;

  /**
   * Nombre de jours juliens correspondants à l'adoption du calendrier
   * grégorien
   * @access private
   * @author Gilles Toubiana
   * @since 0.0.1
   * @see {@link https://github.com/gtoubiana/acte.js|Projet sur GitHub}
   * @constant {Number}
   * @example
   * jjVersGregorien(2299160.5); // [1582, 10, 15]
   * jjVersJulien(2299160.5); // [1582, 10, 5]
   */
  const jjDebutGregorien = 2299160.5;

  /**
   * Nombre de jours juliens correspondants à l'an 1 républicain
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link fourmilab.ch/documents/calendar/|FRENCH_REVOLUTIONARY_EPOCH}
   * @constant {Number}
   * @example
   * jjVersGregorien(2375839.5); // [1792, 9, 22]
   * jjVersRepublicain(2375839.5); // [1, 1, 1, 1]
   */
  const jjDebutRepublicain = 2375839.5;

  /**
   * Nombre de jours juliens correspondants à l'abrogation du calendrier
   * républicain dans le journal officiel lors de la Commune de Paris
   * en 1871
   * @access private
   * @author Gilles Toubiana
   * @since 0.0.1
   * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
   * @constant {Number}
   * @example
   * jjVersGregorien(2404575.5); // [1871, 5, 28]
   * jjVersRepublicain(2404575.5); // [79, 9, 1, 8]
   */
  const jjFinCommuneDeParis = 2404575.5;

  /**
   * Nombre de jours juliens correspondants à l'abrogation du calendrier
   * républicain
   * @access private
   * @author Gilles Toubiana
   * @since 0.0.1
   * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
   * @constant {Number}
   * @example
   * jjVersGregorien(2380686.5); // [1805, 12, 31]
   * jjVersRepublicain(2380686.5); // [14, 4, 1, 10]
   */
  const jjFinRepublicain = 2380686.5;

  /**
   * Expressions régulières pour convertir les mois gregoriens
   * @access private
   * @author Gilles Toubiana
   * @since 0.0.1
   * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
   * @constant {Object}
   */
  const regexpGregorien = {
    'jan(v)?(\\.)?(ier)?': '/1/',
    'f(é|e)v(r)?(\\.)?(ier)?': '/2/',
    'mar(s|\\.)?': '/3/',
    'avr(il|\\.)?': '/4/',
    mai: '/5/',
    'ju(i)?n': '/6/',
    'ju(i)?l(\\.|l)?(\\.)?(et)?': '/7/',
    'ao(u|û)(t|\\.)?': '/8/',
    'sep(t)?(\\.)?(embre)?': '/9/',
    '7bre': '/9/',
    'oct(obre|\\.)?': '/10/',
    '8bre': '/10/',
    'nov(embre|\\.)?': '/11/',
    '9bre': '/11/',
    'd(é|e)c(embre|\\.)?': '/12/',
    Xbre: '/12/',
    '[^-()\\d/*+.]': '',
  };

  /**
   * Expressions régulières pour convertir les mois républicains
   * @access private
   * @author Gilles Toubiana
   * @since 0.0.1
   * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
   * @constant {Object}
   */
  const regexpRepublicain = {
    'vend(é|e)miaire': '/1/',
    brumaire: '/2/',
    frimaire: '/3/',
    'niv(ô|o)se': '/4/',
    'pluvi(ô|o)se': '/5/',
    'vent(ô|o)se': '/6/',
    germinal: '/7/',
    'flor(é|e)al': '/8/',
    prairial: '/9/',
    messidor: '/10/',
    thermidor: '/11/',
    fructidor: '/12/',
    'san(s-)?culottide(s)?': '/13/',
    'jour(s)?\\scompl(é|e)mentaire(s)?': '/13/',
    'd(é|e)cade\\s(\\d){1,2}': '',
    '[^-()\\d/*+.]': '',
  };

  /**
   * Nombre de jours dans un siècle julien
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|JulianCentury}
   * @constant {Number}
   */
  const siecleJulien = 36525.0;

  /**
   * Termes périodiques pour obtenir des temps réels
   * @access private
   * @author John Walker
   * @since 0.0.1
   * @see {@link http://fourmilab.ch/documents/calendar/|EquinoxpTerms}
   * @constant {Array}
   */
  const termesPerEquinoxes = [
    485, 324.96, 1934.136, 203, 337.23, 32964.467,
    199, 342.08, 20.186, 182, 27.85, 445267.112,
    156, 73.14, 45036.886, 136, 171.52, 22518.443,
    77, 222.54, 65928.934, 74, 296.72, 3034.906,
    70, 243.58, 9037.513, 58, 119.81, 33718.147,
    52, 297.17, 150.678, 50, 21.02, 2281.226,
    45, 247.54, 29929.562, 44, 325.15, 31555.956,
    29, 60.93, 4443.417, 18, 155.12, 67555.328,
    17, 288.79, 4562.452, 16, 198.04, 62894.029,
    14, 199.76, 31436.921, 12, 95.39, 14577.848,
    12, 287.11, 31931.756, 12, 320.81, 34777.259,
    9, 227.73, 1222.114, 8, 15.45, 16859.074,
  ];

  /**
   * Pour convertir des degrés en radians
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
  const degresVersRadians = d => (d * Math.PI) / 180.0;

  /**
   * Pour normaliser un angle entre 0 et 360 degrés
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
  const normaliserDegres = a => a - 360.0 * (Math.floor(a / 360.0));

  /**
   * Pour convertir des radians en degrés
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
  const radiansVersDegres = r => (r * 180.0) / Math.PI;

  /**
   * Pour calculer les restes avec des nombres décimaux
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
  const reste = (a, b) => a - (b * Math.floor(a / b));

  /**
   * Pour calculer le sinus d'un angle en degrés
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
  const sinus = d => Math.sin(degresVersRadians(d));

  /**
   * Pour calculer le cosinus d'un angle en degrés
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
  const cosinus = d => Math.cos(degresVersRadians(d));

  /**
   * Pour calculer le nombre de jours juliens d'une equinoxe ou d'un solstice
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
const equinoxe = (an, item) => {
  let i;
  let j;
  let Jde0tab;
  let S;
  let Y;

  if (an < 1000) {
    Jde0tab = jde0Tab1000;
    Y = an / 1000;
  } else {
    Jde0tab = jde0Tab2000;
    Y = (an - 2000) / 1000;
  }
  const Jde0 = Jde0tab[item][0] + (Jde0tab[item][1] * Y) +
    (Jde0tab[item][2] * Math.pow(Y, 2)) + (Jde0tab[item][3] *
      Math.pow(Y, 3)) + (Jde0tab[item][4] * Math.pow(Y, 4));
  const T = (Jde0 - 2451545.0) / 36525;
  const W = (35999.373 * T) - 2.47;
  const deltaL = 1 + (0.0334 * cosinus(W)) + (0.0007 * cosinus(2 * W));
  S = 0;

  for (i = j = 0; i < 24; i++) {
    S += termesPerEquinoxes[j] *
      cosinus(termesPerEquinoxes[j + 1] +
        (termesPerEquinoxes[j + 2] * T));
    j += 3;
  }

  return Jde0 + ((S * 0.00001) / deltaL);
};

/**
 * Pour calculer la différence entre temps terrestre et temps universel,
 * en secondes
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|deltat}
 * @param {Number} an - Année
 * @return {Number} Différence entre temps terrestre et temps universel,
 * en secondes
 * @example
 * deltaT(2015); // 86.41924999999999
 */
const deltaT = an => {
  let dt;

  if ((an >= 1620) && (an <= 2012)) {
    const i = Math.floor((an - 1620) / 2);
    const f = ((an - 1620) / 2) - i;
    dt = delta[i] + ((delta[i + 1] - delta[i]) * f);
  } else {
    const t = (an - 2000) / 100;
    if (an < 948) {
      dt = 2177 + (497 * t) + (44.1 * t * t);
    } else {
      dt = 102 + (102 * t) + (25.3 * t * t);
      if ((an > 2000) && (an < 2100)) {
        dt += 0.37 * (an - 2100);
      }
    }
  }

  return dt;
};

/**
 * Pour calculer l'obliquité de l'écliptique pour un nombre de jours juliens
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
const obliquiteEcliptique = jj => {
  const oTerms = [(-4680.93), (-1.55), 1999.25, (-51.38), (-249.67),
    (-39.05), 7.12, 27.87, 5.79, 2.45,
  ];
  const u = (jj - jjAn2000Gregorien) / (siecleJulien * 100);
  let v = u;
  let eps = 23 + (26 / 60.0) + (21.448 / 3600.0);
  let i;

  if (Math.abs(u) < 1.0) {
    for (i = 0; i < 10; i++) {
      eps += (oTerms[i] / 3600.0) * v;
      v *= u;
    }
  }

  return eps;
};

/**
 * Pour calculer la position du soleil
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
const positionSoleil = jj => {
  const T = (jj - jjAn2000Gregorien) / siecleJulien;
  const t2 = T * T;
  const l0 = normaliserDegres(280.46646 + (36000.76983 * T) +
    (0.0003032 * t2));
  const M = normaliserDegres(357.52911 + (35999.05029 * T) +
    (-0.0001537 * t2));
  const e = 0.016708634 + (-0.000042037 * T) + (-0.0000001267 * t2);
  const C = ((1.914602 + (-0.004817 * T) + (-0.000014 * t2)) * sinus(M)) +
    ((0.019993 - (0.000101 * T)) * sinus(2 * M)) +
    (0.000289 * sinus(3 * M));
  const sunLong = l0 + C;
  const sunAnomaly = M + C;
  const sunR = (1.000001018 * (1 - (e * e))) /
    (1 + (e * cosinus(sunAnomaly)));
  const Omega = 125.04 - (1934.136 * T);
  const Lambda = sunLong + (-0.00569) + (-0.00478 * sinus(Omega));
  const epsilon0 = obliquiteEcliptique(jj);
  const epsilon = epsilon0 + (0.00256 * cosinus(Omega));
  const Alpha = normaliserDegres(radiansVersDegres(Math.atan2(cosinus(
    epsilon0) * sinus(sunLong), cosinus(sunLong))));
  const Delta = radiansVersDegres(Math.asin(sinus(epsilon0) * sinus(
    sunLong)));
  const AlphaApp = normaliserDegres(radiansVersDegres(Math.atan2(cosinus(
    epsilon) * sinus(Lambda), cosinus(Lambda))));
  const DeltaApp = radiansVersDegres(Math.asin(sinus(epsilon) * sinus(
    Lambda)));

  return [l0, M, e, C, sunLong, sunAnomaly, sunR, Lambda, Alpha, Delta,
    AlphaApp, DeltaApp,
  ];
};

/**
 * Pour calculer la nutation en longitude (deltaPsi),
 * et obliquité (deltaEpsilon) pour un nombre de jours juliens
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
const nutation = jj => {
  const ta = [];
  const t = (jj - 2451545.0) / 36525.0;
  const t2 = t * t;
  const t3 = t * t2;
  let dp = 0;
  let de = 0;

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
  for (let i = 0; i < 5; i++) {
    ta[i] -= (2 * Math.PI) * (Math.floor(ta[i] / (2 * Math.PI)));
  }
  const to10 = t / 10.0;

  for (let i = 0; i < 63; i++) {
    let ang = 0;

    for (let j = 0; j < 5; j++) {
      if (argNutMult[(i * 5) + j] !== 0) {
        ang += argNutMult[(i * 5) + j] * ta[j];
      }
    }
    dp += (argNutCoeff[(i * 4) + 0] +
      argNutCoeff[(i * 4) + 1] * to10) * Math.sin(ang);
    de += (argNutCoeff[(i * 4) + 2] +
      argNutCoeff[(i * 4) + 3] * to10) * Math.cos(ang);
  }

  return [dp / (3600.0 * 10000.0), de / (3600.0 * 10000.0)];
};

/**
 * Pour calculer l'équation du temps pour un moment précis
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
const equationDuTemps = jj => {
  const tau = (jj - jjAn2000Gregorien) / (siecleJulien * 10);
  const l0 = normaliserDegres(280.4664567 + (360007.6982779 * tau) +
    (0.03032028 * Math.pow(tau, 2)) + ((Math.pow(tau, 3)) / 49931) +
    (-((Math.pow(tau, 4)) / 15300)) + (-((Math.pow(tau, 5)) / 2000000))
  );
  const alpha = positionSoleil(jj)[10];
  const deltaPsi = nutation(jj)[0];
  const epsilon = obliquiteEcliptique(jj) + nutation(jj)[1];
  let E = l0 + (-0.0057183) + (-alpha) + (deltaPsi * cosinus(epsilon));

  E -= 20.0 * (Math.floor(E / 20.0));

  return E / (24 * 60);
};

/**
 * Pour calculer le nombre de jours juliens et la fraction de l'équinoxe
 * de septembre au méridien de Paris pour une année grégorienne
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
const fractionEquinoxe = an => {
  const equJED = equinoxe(an, 2);
  const equJD = equJED - (deltaT(an) / (24 * 60 * 60));
  const equAPP = equJD + equationDuTemps(equJED);
  const dtParis = (2 + (20 / 60.0) + (15 / (60 * 60.0))) / 360;

  return equAPP + dtParis;
};

/**
 * Pour calculer le nombre de jours juliens correspondant à l'équinoxe
 * de septembre au méridien de Paris, pour une année grégorienne
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
const equinoxeAParis = an => {
  const ep = fractionEquinoxe(an);

  return Math.floor(ep - 0.5) + 0.5;
};

/**
 * Pour déterminer si une année grégorienne est bissextile
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
const gregorienBissextile = an => ((an % 4) === 0) &&
    (!(((an % 100) === 0) && ((an % 400) !== 0)));

/**
 * Pour calculer le nombre de jours juliens (jj) à partir d'une date
 * grégorienne
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
const gregorienVersJj = (an, mois, jour) => {
  const anneeBissextile = gregorienBissextile(an) ? -1 : -2;

  return (jjAn1Gregorien - 1) + (365 * (an - 1)) +
    Math.floor((an - 1) / 4) + (-Math.floor((an - 1) / 100)) +
    Math.floor((an - 1) / 400) + Math.floor((((367 * mois) - 362) / 12) +
      ((mois <= 2) ? 0 : anneeBissextile) + jour);
};

/**
 * Pour calculer une date grégorienne à partir du nombre de jours juliens
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
const jjVersGregorien = jj => {
  const wjd = Math.floor(jj - 0.5) + 0.5;
  const depoch = wjd - jjAn1Gregorien;
  const quadricent = Math.floor(depoch / 146097);
  const dqc = reste(depoch, 146097);
  const cent = Math.floor(dqc / 36524);
  const dcent = reste(dqc, 36524);
  const quad = Math.floor(dcent / 1461);
  const dquad = reste(dcent, 1461);
  const yindex = Math.floor(dquad / 365);
  let an = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
  const anneeBissextile = (gregorienBissextile(an) ? 1 : 2);
  if (!((cent === 4) || (yindex === 4))) an++;
  const yearday = wjd - gregorienVersJj(an, 1, 1);
  const leapadj = ((wjd < gregorienVersJj(an, 3, 1)) ? 0 : anneeBissextile);
  const mois = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
  const jour = (wjd - gregorienVersJj(an, mois, 1)) + 1;

  return [an, mois, jour];
};

/**
 * Pour convertir en nombre entier positif
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
const absInt = num => Math.abs(parseInt(num, 10));

/**
 * Pour calculer l'année républicaine correspondant à un nombre de jours
 * juliens
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
const anRepublicain = jj => {
  let guess = jjVersGregorien(jj)[0] - 2;
  let lasteq = equinoxeAParis(guess);

  while (lasteq > jj) {
    guess--;
    lasteq = equinoxeAParis(guess);
  }

  let nexteq = lasteq - 1;
  while (!((lasteq <= jj) && (jj < nexteq))) {
    lasteq = nexteq;
    guess++;
    nexteq = equinoxeAParis(guess);
  }
  const adr = Math.round((lasteq - jjDebutRepublicain) / anneeTropique) + 1;

  return [adr, lasteq];
};

/**
 * Pour créer un objet date grégorien valide
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
const dateValide = (jour, mois, an) => {
  const resultat = new Date(an, mois - 1, jour);

  resultat.setFullYear(an);

  return resultat;
};

/**
 * Pour calculer une date julienne à partir du nombre de jours juliens
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
const jjVersJulien = jj => {
  const b = Math.floor(jj + 0.5) + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const mois = Math.floor((e < 14) ? (e - 1) : (e - 13));
  const jour = b - d - Math.floor(30.6001 * e);
  let an = Math.floor((mois > 2) ? (c - 4716) : (c - 4715));

  if (an < 1) {
    an--;
  }

  return [an, mois, jour];
};

/**
 * Pour calculer la date républicaine à partir du nombre de jours juliens,
 * les 4 ou 5 'sansculottides' sont considérés comme un 13e mois
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
const jjVersRepublicain = jj => {
  const tempJj = Math.floor(jj) + 0.5;
  const adr = anRepublicain(tempJj);
  const an = adr[0];
  const equinox = adr[1];
  const mois = Math.floor((tempJj - equinox) / 30) + 1;
  let jour = (tempJj - equinox) % 30;
  const decade = Math.floor(jour / 10) + 1;

  jour = (jour % 10) + 1;

  return [an, mois, decade, jour];
};

/**
 * Pour remplacer en série avec un objet contenant des regex
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
const remplacements = (texte, regex, options) => {
  let tempTexte = texte;

  for (const val in regex) {
    // istanbul ignore else
    if (regex.hasOwnProperty(val)) {
      tempTexte = tempTexte.replace(new RegExp(val, options), regex[val]);
    }
  }

  return tempTexte;
};

/**
 * Pour calculer le nombre de jours juliens à partir d'une date républicaine
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
const republicainVersJj = (an, mois, decade, jour) => {
  let guess = jjDebutRepublicain + (anneeTropique * ((an - 1) - 1));
  let adr = [an - 1, 0];

  while (adr[0] < an) {
    adr = anRepublicain(guess);
    guess = adr[1] + (anneeTropique + 2);
  }

  return adr[1] + (30 * (mois - 1)) + (10 * (decade - 1)) + (jour - 1);
};

/**
 * Pour convertir le jour du mois républicain en décade
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
const rjmcVersRdc = rjmc => (Math.abs(parseInt(rjmc, 10) % 10) === 0)
    ? Math.abs(parseInt(rjmc / 10, 10))
    : Math.abs(parseInt(rjmc / 10, 10) + 1);

/**
 * Pour convertir le jour du mois républicain en jour de la décade
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
const rjmcVersRjdc = rjmc => (Math.abs(parseInt(rjmc, 10) % 10) === 0)
    ? 10 : Math.abs(parseInt(rjmc, 10) % 10);

/**
 * Pour convertir des chiffres romains en chiffres arabes
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
const romainVersArabe = romain => {
  const lookup = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let arabe = 0;
  let i = romain.length - 1;
  const tempRomain = romain.toUpperCase();

  for (i; i >= 0; i--) {
    if (lookup[tempRomain[i]] < lookup[tempRomain[i + 1]]) {
      arabe -= lookup[tempRomain[i]];
    } else {
      arabe += lookup[tempRomain[i]];
    }
  }

  return arabe;
};

/**
 * Pour obtenir une saisie valide
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
const saisieValide = (saisie, regexp) => {
  let tempSaisie = saisie;
  let u;

  // On remplace le texte restant par des chiffres arabes
  tempSaisie = remplacements(tempSaisie, regexp, 'gi')
    .split(/[\/\.]+/gi);

  // Si il n'y a que l'année [1,1,ac]
  if (!tempSaisie[1] && !tempSaisie[2]) {
    if ((tempSaisie[0].match(/\d-/gi)) || (tempSaisie[0] === '')) {
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
};

/**
 * Pour convertir la saisie grégorienne ou julienne en Objet Jour
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
const tabGregorien = (saisie, limites) => {
  // Uniformisation de la saisie
  const iesaisie = (saisie[0] === '/') ? `1${saisie}` : saisie;
  const saisieGregorien = saisieValide(iesaisie, regexpGregorien);
  let tab = [];

  // Lorsque la date est valide [gjmc,gmc,gac]
  if (saisieGregorien[2] && saisieGregorien[0] < 32 &&
    absInt(saisieGregorien[0]) !== 0 &&
    saisieGregorien[1] < 13 && saisieGregorien[1] !== '' &&
    absInt(saisieGregorien[1]) !== 0) {
    tab[4] = gregorienVersJj(parseInt(saisieGregorien[2], 10), absInt(
      saisieGregorien[1]), absInt(saisieGregorien[0]));

    // Limitations gregorien/julien
    if ((limites === true) && (tab[4] < jjDebutGregorien)) {
      tab[5] = absInt(saisieGregorien[0]);
      tab[6] = absInt(saisieGregorien[1]);
      tab[7] = parseInt(saisieGregorien[2], 10);
      tab[8] = dateValide(tab[5], tab[6], tab[7]);
    } else {
      tab[0] = absInt(saisieGregorien[0]);
      tab[1] = absInt(saisieGregorien[1]);
      tab[2] = parseInt(saisieGregorien[2], 10);
      tab[3] = dateValide(tab[0], tab[1], tab[2]);
      const dateJulienne = jjVersJulien(tab[4]);
      tab[5] = dateJulienne[2];
      tab[6] = dateJulienne[1];
      tab[7] = dateJulienne[0];
      tab[8] = dateValide(tab[5], tab[6], tab[7]);
    }

    // Limitations republicain
    if (((tab[4] >= jjDebutRepublicain) &&
        (tab[4] <= jjFinRepublicain)) ||
      ((tab[4] >= jjDebutCommuneDeParis) &&
        (tab[4] <= jjFinCommuneDeParis)) ||
      limites === false) {
      const dateRepublicaine = jjVersRepublicain(tab[4]);
      tab = tab.concat([dateRepublicaine[3], dateRepublicaine[2], (
          dateRepublicaine[2] - 1) * 10 + dateRepublicaine[3],
        dateRepublicaine[1], dateRepublicaine[0],
      ]);
    }
  }

  return tab;
};

/**
 * Pour convertir la saisie républicaine en Objet Jour
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
const tabRepublicain = (saisie, limites) => {
  // On remplace les chiffres romains en chiffres arabes
  let saisieRepublicain = saisie.replace(/\W?an\s-?([-MDCLXVI]+)\W?/gi,
    (x, p1) => {
      const rva = romainVersArabe(p1);
      return (x.match(/-/)) ? ` -${rva}` : ` ${rva}`;
    });
  const tab = [];

  // Uniformisation de la saisie
  saisieRepublicain = saisieValide(saisieRepublicain, regexpRepublicain);

  // Lorsque la date est valide [rjmc,rmc,rac]
  if (saisieRepublicain[2] && saisieRepublicain[0] < 30 &&
    absInt(saisieRepublicain[0]) !== 0 && saisieRepublicain[1] < 14 &&
    absInt(saisieRepublicain[1]) !== 0) {
    tab[4] = republicainVersJj(parseInt(saisieRepublicain[2], 10),
      parseInt(saisieRepublicain[1], 10), rjmcVersRdc(saisieRepublicain[0]),
      rjmcVersRjdc(saisieRepublicain[0]));

    // Si jj (tab[4]) est dans les limites ou en illimité
    if (((tab[4] >= jjDebutRepublicain) &&
        (tab[4] <= jjFinRepublicain)) ||
      ((tab[4] >= jjDebutCommuneDeParis) &&
        (tab[4] <= jjFinCommuneDeParis)) ||
      limites === false) {
      const dateGregorienne = jjVersGregorien(tab[4]);
      const dateJulienne = jjVersJulien(tab[4]);
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
};

/**
 * Pour convertir une saisie en objet JavaScript
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
 * @version 0.0.1
 * @since 0.0.1
 * @license MIT
 */
acte.Jour = class Jour {
  constructor(saisie, limites) {
    let tab = [];

    this.variables = this.variables || {};
    this.limites = limites !== false;

    // On detecte si c'est une date républicaine
    if (saisie.match(/\W?an\s-?([-MDCLXVI]+|\d+)\W?/gi)) {
      tab = tabRepublicain(saisie, this.limites);

    // Si ce n'est pas du républicain (donc gregorien ou julien)
    } else {
      tab = tabGregorien(saisie, this.limites);
    }

    // Ecriture de toutes les valeurs
    this.variables = {
      gregorien: {
        jmc: tab[0],
        mc: tab[1],
        ac: tab[2],
        od: tab[3],
      },
      julien: {
        jj: tab[4],
        jmc: tab[5],
        mc: tab[6],
        ac: tab[7],
        od: tab[8],
      },
      republicain: {
        jdc: tab[9],
        dc: tab[10],
        jmc: tab[11],
        mc: tab[12],
        ac: tab[13],
      },
      limites: this.limites,
    };
  }
};

  return acte;
}));

/**
 * Pour formater une date grégorienne
 * @memberof acte
 * @access public
 * @since 0.0.1
 * @author Gilles Toubiana
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @version 0.0.1
 * @license MIT
 * @param {String} [format='%d/%m/%Y'] - Le modèle de formatage
 * @param {String} [erreur='Pas de correspondances'] - Le message d'erreur
 * @param {Function} [rappel] - Une fonction de rappel
 * @return {String} La date grégorienne formatée
 * @example
 * new acte.Jour('8 mai 1972').gregorien(); // "8/5/1972"

acte.Jour.prototype.gregorien = function gregorien(format, erreur, rappel) {
  rappel();
  return this.variables.gregorien.ac;
};
*/
