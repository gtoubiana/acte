/**
 * Pour calculer un nombre de jours juliens à partir d'une date julienne
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|julian_to_jd}
 * @param {Number} an - Année julienne
 * @param {Number} mois - Mois julien
 * @param {Number} jour - Jour julien
 * @return {Number} Nombre de jours juliens
 * @example
 * julienVersJj(2015,11,7); // 2457346.5
 */
var julienVersJj = function julienVersJj(an, mois, jour) {
  var tempAn = an;
  var tempMois = mois;

  if (an < 1) {
    tempAn++;
  }
  if (mois <= 2) {
    tempAn--;
    tempMois += 12;
  }

  return ((Math.floor((365.25 * (tempAn + 4716))) + Math.floor((30.6001 * (
    tempMois + 1))) + jour) - 1524.5);
};
