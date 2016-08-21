/**
 * Pour mettre en capitale le premier caractère d'une chaîne.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.15
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {String} str - la chaîne à modifier
 * @return {String} la chaîne avec le premier caractère en capitale
 * @example
 * initialeEnCapitale("vingt"); // "Vingt"
 */
const initialeEnCapitale = (str) => {
  const result = str.charAt(0).toUpperCase() + str.slice(1);

  return result;
};
