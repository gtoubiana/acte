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
