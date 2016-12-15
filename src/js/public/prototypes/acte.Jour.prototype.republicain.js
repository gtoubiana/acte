/**
 * Pour formater une date républicaine.
 * @memberof acte
 * @access public
 * @since 0.0.15
 * @author Gilles Toubiana
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @license MIT
 * @param {String} [format='%Jp %Mlb %A'] - Le modèle de formatage.<br>
 * Voir [.gregorien](#acte.Jour+gregorien) pour la syntaxe.
 * @param {String} [erreur='Pas de correspondances.'] - Le message d'erreur
 * @param {Function} [rappel] - Une fonction de rappel
 * @return {String} La date républicaine formatée
 * @example
 * new acte.Jour('1/1/1800').republicain() // '11 nivôse an VIII'
 * new acte.Jour('').republicain(0, 'Erreur.') // 'Erreur.'
 * new acte.Jour('3 avril 1805').republicain('%Jz/%Dz/%Mz', 0, ((r, o) => {
 *   const an = (o.A % 100) < 10 ? `0${o.A % 100}` : o.A % 100;
 *   return `${r}/${an}`;
 * }))) // '13/02/07/13'
 */
acte.Jour.prototype.republicain = function republicain(format, erreur,
  rappel) {
  const resultat = formatageDeJour(format, erreur, rappel,
    '%Jp %Mlb an %Ar',
    this.variables.republicain,
    'a',
    objRepublicain);

  return resultat;
};
