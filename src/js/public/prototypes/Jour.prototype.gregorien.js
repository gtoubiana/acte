/**
 * Pour formater une date grégorienne.
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
 */
acte.Jour.prototype.gregorien = function gregorien(format, erreur, rappel) {
  const frmt = format || '%J/%M/%A';
  const err = erreur || 'Pas de correspondances.';
  const tvg = this.variables.gregorien;
  let resultat;

  if (tvg.od) {
    const obj = {
      A: tvg.a,
      AN: tvg.a,
      J: tvg.jm,
      JM: tvg.jm,
      JD: tvg.od.getDay(),
      JS: tvg.od.getDay(),
      M: tvg.m,
      MA: tvg.m,
      D: semaineComplete(tvg.jm, tvg.m, tvg.a, 1),
      DA: semaineComplete(tvg.jm, tvg.m, tvg.a, 0),
      DM: semaineComplete(tvg.jm, tvg.m, tvg.a, 1),
      JA: periodeEnJours(1, 1, tvg.a, tvg.jm, tvg.m, tvg.a),
      S: semaineComplete(tvg.jm, tvg.m, tvg.a, 0),
      SA: semaineComplete(tvg.jm, tvg.m, tvg.a, 0),
      SM: semaineComplete(tvg.jm, tvg.m, tvg.a, 1),
    };

    resultat = `${tvg.jm}/${tvg.m}/${tvg.a}`;
    if (typeof rappel === 'function') {
      resultat = rappel(resultat, obj);
    }
  } else {
    resultat = erreur;
  }

  return resultat;
};
