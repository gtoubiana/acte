/**
 * Pour formater une date julienne.
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
 * @return {String} La date julienne formatée
 * @example
 * new acte.Jour('1/1/1600').julien() // '22 décembre 1599'
 * new acte.Jour('').julien(0, 'Erreur.') // 'Erreur.'
 * new acte.Jour('3 avril 1605').julien('%Jz/%Mz', 0, ((res, obj) => {
 *   const an = (obj.A % 100) < 10 ? `0${obj.A % 100}` : obj.A % 100;
 *   return `${res}/${an}`;
 * }))) // '24/03/05'
 */
acte.Jour.prototype.julien = function julien(format, erreur, rappel) {
  const jsjulien = this.variables.julien.jj < 2299160.5 &&
    this.variables.limites === true ? 'julAv1582' : 'julAp1582';
  const resultat = formatageDeJour(format, erreur, rappel,
    '%Jp %Mlb %A',
    this.variables.julien,
    'a',
    objGregorien,
    jsjulien);

  return resultat;
};
