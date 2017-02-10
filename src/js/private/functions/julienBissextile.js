/**
 * Pour déterminer si une année julienne est bissextile.
 * @access private
 * @author John Walker
 * @since 0.0.17
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|leap_julian}
 * @param {Number} an - Année julienne
 * @return {Boolean} Est-ce une année bissextile ?
 * @example
 * julienBissextile(2017); // true
 */
const julienBissextile = (an) => {
  const result = reste(an, 4) === ((an > 0) ? 0 : 3);

  return result;
};
