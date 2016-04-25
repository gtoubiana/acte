/**
 * Pour créer un objet date grégorien valide
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Number} jour - le jour du mois gregorien en chiffres
 * @param {Number} mois - le mois gregorien en chiffres
 * @param {Number} an - l'année gregorienne en chiffres
 * @return {Object} L'objet date valide
 * @example
 * dateValide(10,12,34); // Sun Dec 10 34 00:00:00 GMT+0100 (CET)
 */
const dateValide = (jour, mois, an) => {
  const resultat = new Date(an, mois - 1, jour);

  resultat.setFullYear(an);

  return resultat;
};
