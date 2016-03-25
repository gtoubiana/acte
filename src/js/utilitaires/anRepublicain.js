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
var anRepublicain = function anRepublicain(jj) {
  var adr;
  var guess;
  var lasteq;
  var nexteq;

  guess = jjVersGregorien(jj)[0] - 2;
  lasteq = equinoxeAParis(guess);
  while (lasteq > jj) {
    guess--;
    lasteq = equinoxeAParis(guess);
  }

  nexteq = lasteq - 1;
  while (!((lasteq <= jj) && (jj < nexteq))) {
    lasteq = nexteq;
    guess++;
    nexteq = equinoxeAParis(guess);
  }
  adr = Math.round((lasteq - JJ_DEBUT_REPUBLICAIN) /
    ANNEE_TROPIQUE) + 1;
  return [adr, lasteq];
};
