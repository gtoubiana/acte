/**
 * Pour convertir des chiffres arabes en chiffres romains.
 * @memberof acte
 * @access public
 * @author Iván Montes
 * @since 0.0.17
 * @license unknown
 * @see {@link http://blog.stevenlevithan.com/?p=65#comment-16107|Blog}
 * @param {Number} arabe - Chiffre arabe
 * @return {String} Chiffre romain
 * @example
 * acte.arabeVersRomain(2012); // 'MMXII'
 */
acte.arabeVersRomain = (arabe) => {
  const lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let tempArabe = Math.abs(arabe);
  const sign = arabe < 0 ? '-' : '';
  let romain = '';
  let i;

  for (i in lookup) {
    /* istanbul ignore else  */
    if (Object.prototype.hasOwnProperty.call(lookup, i)) {
      while (tempArabe >= lookup[i]) {
        romain += i;
        tempArabe -= lookup[i];
      }
    }
  }

  return sign + romain;
};
