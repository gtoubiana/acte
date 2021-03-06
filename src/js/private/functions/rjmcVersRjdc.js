/**
 * Pour convertir le jour du mois républicain en jour de la décade.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Number} rjmc - le jour du mois républicain
 * @return {Number} Le jour de la décade républicaine
 * @example
 * rjmcVersRjdc(28); // 8
 */
const rjmcVersRjdc = (rjmc) => {
  const resultat = Math.abs(parseInt(rjmc, 10) % 10) === 0 ? 10 : Math.abs(
    parseInt(rjmc, 10) % 10);

  return resultat;
};
