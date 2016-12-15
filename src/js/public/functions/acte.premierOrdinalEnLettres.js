/**
 * Pour convertir uniquement 'un' en nombre ordinal.
 * @memberof acte
 * @access public
 * @author Gilles Toubiana
 * @since 0.0.17
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Number} saisie - le nombre en lettres
 * @param {String} [genre] - par défaut, le genre masculin est appliqué.
 * Pour utiliser le genre féminin, il suffit d'ajouter un argument.
 * @return {String} le nombre - ordinal ou non - en lettres
 * @example
 * acte.premierOrdinalEnLettres('Un'); // 'Premier'
 * acte.premierOrdinalEnLettres('Un', 1); // 'Première'
 * acte.premierOrdinalEnLettres('Deux'); // 'Deux'
 * acte.premierOrdinalEnLettres('Vingt-trois'); // 'Vingt-trois'
 */
acte.premierOrdinalEnLettres = (saisie, genre) => {
  const str = saisie.toString();
  const prem = genre ? 'ère' : 'er';
  const result = str === 'Un' ? `Premi${prem}` : str;

  return result;
};
