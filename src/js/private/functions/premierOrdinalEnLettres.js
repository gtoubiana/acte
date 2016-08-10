/**
 * Pour convertir uniquement 'un' en nombre ordinal.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.15
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Number} saisie - le nombre en lettres
 * @param {String} [genre] - par défaut, le genre masculin est appliqué.
 * Pour utiliser le genre féminin, il suffit d'ajouter un argument.
 * @return {String} le nombre - ordinal ou non - en lettres
 * @example
 * premierOrdinalEnLettres("Un"); // "Premier"
 * premierOrdinalEnLettres("Un", 1); // "Première"
 * premierOrdinalEnLettres("Deux"); // "Deux"
 * premierOrdinalEnLettres("Vingt-trois"); // "Vingt-trois"
 */
const premierOrdinalEnLettres = (saisie, genre) => {
  const str = saisie.toString();
  let result;

  // Genre
  const prem = (genre) ? 'première' : 'premier';

  if (str === 'Un') {
    result = initialeEnCapitale(prem);
  } else if (str === 'un') {
    result = prem;
  } else {
    result = str;
  }

  return result;
};
