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
const republicainVersJj = (an, mois, decade, jour) => {
  let guess = jjDebutRepublicain + (anneeTropique * ((an - 1) - 1));
  let adr = [an - 1, 0];

  while (adr[0] < an) {
    adr = anRepublicain(guess);
    guess = adr[1] + (anneeTropique + 2);
  }

  return adr[1] + (30 * (mois - 1)) + (10 * (decade - 1)) + (jour - 1);
};
