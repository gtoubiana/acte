/**
 * Pour convertir les nombres en nombres ordinaux.
 * @memberof acte
 * @access public
 * @author Gilles Toubiana
 * @since 0.0.17
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Number} n - le nombre en chiffres
 * @param {String} prem - le suffixe pour le chiffre 1
 * @param {String} exp - le suffixe pour les chiffres différents de 1
 * @return {String} le nombre ordinal
 * @example
 * acte.nombreOrdinal(1,'er','e'); // '1er'
 * acte.nombreOrdinal(1,'re','e'); // '1re'
 * acte.nombreOrdinal(2,'er','e'); // '2e'
 */
acte.nombreOrdinal = (n, prem, exp) => {
  const result = n === 1 || n === '1er' || n === '1re' ? `1${prem}` : n +
    exp;

  return result;
};
