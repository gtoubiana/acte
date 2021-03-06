/**
 * Pour calculer le cosinus d'un angle en degrés.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|dcos}
 * @param  {Number} d - Angle en degrés
 * @return {Number} Cosinus de l'angle en degrés
 * @example
 * cosinus(0); // 1
 */
const cosinus = (d) => {
  const result = Math.cos(degresVersRadians(d));

  return result;
};
