/**
 * Pour normaliser un angle entre 0 et 360 degrés.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|fixangle}
 * @param  {Number} a - Angle en degrés
 * @return {Number} Angle entre 0 et 360 degrés
 * @example
 * normaliserDegres(375); // 15
 */
const normaliserDegres = a => {
  const result = a - 360.0 * (Math.floor(a / 360.0));

  return result;
};
