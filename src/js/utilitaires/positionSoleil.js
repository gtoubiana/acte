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
var positionSoleil = function positionSoleil(jj) {
  var T = (jj - jjAn2000Gregorien) / siecleJulien;
  var t2 = T * T;
  var l0 = normaliserDegres(280.46646 + (36000.76983 * T) +
    (0.0003032 * t2));
  var M = normaliserDegres(357.52911 + (35999.05029 * T) +
    (-0.0001537 * t2));
  var e = 0.016708634 + (-0.000042037 * T) + (-0.0000001267 * t2);
  var C = ((1.914602 + (-0.004817 * T) + (-0.000014 * t2)) * sinus(M)) +
    ((0.019993 - (0.000101 * T)) * sinus(2 * M)) +
    (0.000289 * sinus(3 * M));
  var sunLong = l0 + C;
  var sunAnomaly = M + C;
  var sunR = (1.000001018 * (1 - (e * e))) / (1 + (e * cosinus(sunAnomaly)));
  var Omega = 125.04 - (1934.136 * T);
  var Lambda = sunLong + (-0.00569) + (-0.00478 * sinus(Omega));
  var epsilon0 = obliquiteEcliptique(jj);
  var epsilon = epsilon0 + (0.00256 * cosinus(Omega));
  var Alpha = normaliserDegres(radiansVersDegres(Math.atan2(cosinus(
    epsilon0) * sinus(sunLong), cosinus(sunLong))));
  var Delta = radiansVersDegres(Math.asin(sinus(epsilon0) * sinus(
    sunLong)));
  var AlphaApp = normaliserDegres(radiansVersDegres(Math.atan2(cosinus(
    epsilon) * sinus(Lambda), cosinus(Lambda))));
  var DeltaApp = radiansVersDegres(Math.asin(sinus(epsilon) * sinus(
    Lambda)));

  return [l0, M, e, C, sunLong, sunAnomaly, sunR, Lambda, Alpha, Delta,
    AlphaApp, DeltaApp
  ];
};
