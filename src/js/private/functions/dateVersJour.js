/**
 * Pour créer une date valide utilisable par le constructeur Jour.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.17
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Date|String} date - une chaîne ou un objet Date
 * @return {String} La date utilisable
 * @example
 * dateVersJour(new Date(2016, 5, 2)); // 2/6/2016
 */

const dateVersJour = (date) => {
  let result;

  if (date instanceof Date && Number.isInteger(date.getMonth())) {
    const jour = date.getDate();
    const mois = parseInt(date.getMonth() + 1, 10);
    const an = date.getFullYear();

    result = `${jour}/${mois}/${an}`;
  } else {
    result = String(date);
  }
  return result;
};
