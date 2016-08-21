/**
 * Pour convertir des degrés en radians.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|dtr}
 * @param  {Number} d - Angle en degrés
 * @return {Number} Angle en radians
 * @example
 * degresVersRadians(90); // 1.5707963267948966
 */
const degresVersRadians = d => {
  const result = (d * Math.PI) / 180.0;

  return result;
};
