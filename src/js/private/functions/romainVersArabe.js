/**
 * Pour convertir des chiffres romains en chiffres arabes.
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
const romainVersArabe = (romain) => {
  const lookup = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let arabe = 0;
  let i = romain.length - 1;
  const tempRomain = romain.toUpperCase();

  for (i; i >= 0; i -= 1) {
    if (lookup[tempRomain[i]] < lookup[tempRomain[i + 1]]) {
      arabe -= lookup[tempRomain[i]];
    } else {
      arabe += lookup[tempRomain[i]];
    }
  }

  return arabe;
};
