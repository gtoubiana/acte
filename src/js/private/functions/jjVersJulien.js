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
  const mois = Math.floor(e < 14 ? e - 1 : e - 13);
  const jour = b - d - Math.floor(30.6001 * e);
  let an = Math.floor(mois > 2 ? c - 4716 : c - 4715);

  if (an < 1) {
    an--;
  }

  return [an, mois, jour];
};
