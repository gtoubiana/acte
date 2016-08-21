/**
 * Pour convertir des radians en degrés.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|rtd}
 * @param  {Number} r - Angle en radians
 * @return {Number} Angle en degrés
 * @example
 * radiansVersDegres(1.5707963267948966); // 90
 */
const radiansVersDegres = r => {
  const result = (r * 180.0) / Math.PI;

  return result;
};
