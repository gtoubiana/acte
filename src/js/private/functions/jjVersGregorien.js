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
  const anneeBissextile = gregorienBissextile(an) ? 1 : 2;

  if (!((cent === 4) || (yindex === 4))) an++;
  const yearday = wjd - gregorienVersJj(an, 1, 1);
  const leapadj = wjd < gregorienVersJj(an, 3, 1) ? 0 : anneeBissextile;
  const mois = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
  const jour = (wjd - gregorienVersJj(an, mois, 1)) + 1;

  return [an, mois, jour];
};
