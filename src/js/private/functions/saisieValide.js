/**
 * Pour obtenir une saisie valide.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {String} saisie - La saisie d'une date
 * @param {Object} regexp - Un objet regexpRepublicain ou regexpGregorien
 * pour convertir les mois
 * @return {Array} La saisie valide
 * @example
 * saisieValide(saisie, regexpRepublicain);
 * saisieValide(saisie, regexpGregorien);
 */
const saisieValide = (saisie, regexp) => {
  let tempSaisie = saisie;
  let u;

  // On remplace le texte restant par des chiffres arabes
  tempSaisie = remplacements(tempSaisie, regexp, 'gi')
    .split(/[/.]+/gi);

  // Si il n'y a que l'année [1,1,ac]
  if (!tempSaisie[1] && !tempSaisie[2]) {
    if ((tempSaisie[0].match(/\d-/gi)) || (tempSaisie[0] === '')) {
      tempSaisie[0] = u;
    } else {
      tempSaisie = [1, 1, tempSaisie[0]];
    }
  }

  // Si il n'y a que l'année et le mois [1,mc,ac]
  if (!tempSaisie[0] && tempSaisie[1] && tempSaisie[2]) {
    tempSaisie = [1, tempSaisie[1], tempSaisie[2]];
  }
  if (tempSaisie[1] && !tempSaisie[2]) {
    tempSaisie = [1, tempSaisie[0], tempSaisie[1]];
  }

  return tempSaisie;
};
