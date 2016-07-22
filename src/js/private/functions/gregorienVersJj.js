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
const gregorienVersJj = (an, mois, jour) => {
  const anneeBissextile = gregorienBissextile(an) ? -1 : -2;

  return (jjAn1Gregorien - 1) + (365 * (an - 1)) +
    Math.floor((an - 1) / 4) + (-Math.floor((an - 1) / 100)) +
    Math.floor((an - 1) / 400) + Math.floor((((367 * mois) - 362) / 12) +
      (mois <= 2 ? 0 : anneeBissextile) + jour);
};
