/**
 * Pour calculer les restes avec des nombres décimaux
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|mod}
 * @param  {Number} a - Nombre à diviser
 * @param  {Number} b - Diviseur
 * @return {Number} Reste de a par b
 * @example
 * reste(3,2); // 1
 */
var reste = function reste(a, b) {
  return a - (b * Math.floor(a / b));
};
