/**
 * Pour formater une date grégorienne.
 * @memberof acte
 * @access public
 * @since 0.0.15
 * @author Gilles Toubiana
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @license MIT
 * @param {String} [format='%Jp %Mlb %A'] - Le modèle de formatage :<br><br>
 * <strong>BALISES</strong><br>
 * `%A` ou `%AN` - Année<br>
 * `%D`, `%DM` ou `%SM` - Décade/Semaine dans le mois<br>
 * `%J` ou `%JM` - Jour dans le mois<br>
 * `%JA` - Jour dans l'année<br>
 * `%JS` ou `%JD` - Jour de la Décade/Semaine<br>
 * `%M` ou `%MA` - Mois dans l'année<br>
 * `%S`, `%SA` ou `%DA` - Semaine/Décade dans l'année<br><br>
 * <strong>FILTRES</strong><br>
 * `1` - mois ou jour sur 1 caractère<br>
 * `2` - mois ou jour sur 2 caractères<br>
 * `3` - mois ou jour sur 3 caractères<br>
 * `a` - mois ou jour en Abrégé<br>
 * `b` - en Bas de casse (minuscules)<br>
 * `c` ou `m` - en Capitales (Majuscules)<br>
 * `f` - Féminin de p (première ou 1re)<br>
 * `l` - chiffres en Lettres<br>
 * `o` - lettres ou chiffres en Ordinaux<br>
 * `p` - Premier ou 1er<br>
 * `r` - chiffres en Romains<br>
 * `v` - chiffres en lettres (Vieille notation)<br>
 * `z` - Zéro devant le chiffre<br>
 * @param {String} [erreur='Pas de correspondances.'] - Le message d'erreur
 * @param {Function} [rappel] - Une fonction de rappel
 * @return {String} La date grégorienne formatée
 * @example
 * new acte.Jour('1/1/1600').gregorien('%Jp %Mlb %A'); // '1er janvier 1600'
 */
acte.Jour.prototype.gregorien = function gregorien(format, erreur, rappel) {
  const resultat = formatageDeJour(format, erreur, rappel,
    '%Jp %Mlb %A',
    'Pas de correspondances.',
    this.variables.gregorien,
    objGregorien);

  return resultat;
};
