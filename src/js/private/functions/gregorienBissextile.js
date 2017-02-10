/**
 * Pour déterminer si une année grégorienne est bissextile.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|leap_gregorian}
 * @param {Number} an - Année grégorienne
 * @return {Boolean} Est-ce une année bissextile ?
 * @example
 * gregorienBissextile(2012); // true
 */
const gregorienBissextile = (an) => {
  const result = ((an % 4) === 0) &&
    (!(((an % 100) === 0) && ((an % 400) !== 0)));

  return result;
};
