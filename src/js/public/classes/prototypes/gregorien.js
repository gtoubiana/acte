/**
 * Pour formater une date grégorienne
 * @memberof acte
 * @access public
 * @since 0.0.7
 * @author Gilles Toubiana
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @license MIT
 * @param {String} [format='%d/%m/%Y'] - Le modèle de formatage
 * @param {String} [erreur='Pas de correspondances'] - Le message d'erreur
 * @param {Function} [rappel] - Une fonction de rappel
 * @return {String} La date grégorienne formatée
 * @example
 * new acte.Jour('8 mai 1972').gregorien(); // "8/5/1972"
acte.Jour.prototype.gregorien = function gregorien(format, erreur, rappel) {
  rappel();
  return this.variables.gregorien.ac;
};
*/
