/**
 * Pour convertir en nombre entier positif.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Number} num - le nombre à convertir
 * @return {Number} Le nombre entier positif
 * @example
 * absInt(-23.45); // 23
 */
const absInt = num => {
  const result = Math.abs(parseInt(num, 10));

  return result;
};
