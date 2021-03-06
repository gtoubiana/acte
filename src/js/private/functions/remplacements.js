/**
 * Pour remplacer en série avec un objet contenant des regex.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {String} texte - Le texte à modifier
 * @param {Object} regex - Les expressions régulières de remplacements
 * @param {String} options - Les options des expressions régulières
 * @return {String} Le texte modifié
 * @example
 * remplacements('Bonjour', {'jour': 'soir'}, 'gi');
 * // 'Bonsoir'
 */
const remplacements = (texte, regex, options) => {
  const resultat = regex.reduce(

    // jscs:disable
    (data, item) => {
      const result = data.replace(new RegExp(item.e, options),
        item.r);

      return result;
    }, texte);

  // jscs:enable
  return resultat;
};
