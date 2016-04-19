/**
 * Pour convertir le jour du mois républicain en décade
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Number} rjmc - le jour du mois républicain
 * @return {Number} La décade républicaine
 * @example
 * rjmcVersRdc(28); // 3
 */
const rjmcVersRdc = rjmc => {
  const resultat = (Math.abs(parseInt(rjmc, 10) % 10) === 0) ? Math.abs(
    parseInt(rjmc / 10, 10)) : Math.abs(parseInt(rjmc / 10, 10) + 1);
  return resultat;
};
