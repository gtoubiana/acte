/**
 * Pour convertir des chiffres romains en chiffres arabes
 * @access private
 * @author Iván Montes
 * @since 0.0.1
 * @license unknown
 * @see {@link http://blog.stevenlevithan.com/?p=65#comment-16129|Blog}
 * @param {String} romain - Chiffre romain
 * @return {Number} Chiffre arabe
 * @example
 * romainVersArabe('MMXII'); // 2012
 */
var romainVersArabe = function romainVersArabe(romain) {
  var lookup = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
  var arabe = 0;
  var i = romain.length - 1;
  var tempRomain = romain.toUpperCase();

  for (i; i >= 0; i--) {
    if (lookup[tempRomain[i]] < lookup[tempRomain[i + 1]]) {
      arabe -= lookup[tempRomain[i]];
    } else {
      arabe += lookup[tempRomain[i]];
    }
  }

  return arabe;
};
