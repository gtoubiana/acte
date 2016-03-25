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
var jjVersGregorien = function jjVersGregorien(jj) {
  var wjd = Math.floor(jj - 0.5) + 0.5;
  var depoch = wjd - JJ_AN1_GREGORIEN;
  var quadricent = Math.floor(depoch / 146097);
  var dqc = reste(depoch, 146097);
  var cent = Math.floor(dqc / 36524);
  var dcent = reste(dqc, 36524);
  var quad = Math.floor(dcent / 1461);
  var dquad = reste(dcent, 1461);
  var yindex = Math.floor(dquad / 365);
  var an = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
  var anneeBissextile = (gregorienBissextile(an) ? 1 : 2);
  var yearday;
  var leapadj;
  var mois;
  var jour;

  if (!((cent === 4) || (yindex === 4))) {
    an++;
  }
  yearday = wjd - gregorienVersJj(an, 1, 1);
  leapadj = ((wjd < gregorienVersJj(an, 3, 1)) ? 0 : anneeBissextile);
  mois = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
  jour = (wjd - gregorienVersJj(an, mois, 1)) + 1;

  return [an, mois, jour];
};
