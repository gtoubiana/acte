/**
 * Pour calculer le sinus d'un angle en degrés.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|dsin}
 * @param  {Number} d - Angle en degrés
 * @return {Number} Sinus de l'angle en degrés
 * @example
 * sinus(90); // 1
 */
const sinus = d => {
  const result = Math.sin(degresVersRadians(d));

  return result;
};
