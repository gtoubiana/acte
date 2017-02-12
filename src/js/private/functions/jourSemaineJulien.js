/**
 * Pour calculer le jour de la semaine à partir du nombre de jours juliens.
 * @access private
 * @author John Walker
 * @since 0.0.15
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|jwday}
 * @param  {Number} jj - Nombre de jours juliens
 * @return {Number} Le jour de la semaine (0-6)
 * @example
 * jourSemaineJulien(2378625.5); // 6
 */
const jourSemaineJulien = (jj) => {
  const result = reste(Math.floor(jj + 1.5), 7);

  return result;
};
