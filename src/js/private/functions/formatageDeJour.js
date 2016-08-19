/**
 * Pour générer les prototypes de formatage de Jour.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.15
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {String} format - Un format personnalisé
 * @param {String} erreur - Un message d'erreur personnalisé
 * @param {Function} rappel - Une fonction de rappel
 * @param {String} df - Le format par défaut
 * @param {Object} dt - La référence aux variables dans Jour
 * @param {Object} dd - La référence exlicite à une variable dans dt
 * @param {Object} dobj - Une fonction ou un objet utilisable
 * @param {Object} [pro] - La référence du prototype si nécessaire
 * @return {String} La date formatée
 * @example
 * formatageDeJour(format, erreur, rappel, '%Jp %Mlb %A',
 * 'Pas de correspondances.', this.variables.gregorien, objGregorien);
 */
const formatageDeJour = (format, erreur, rappel, df, dt, dd, dobj, pro) => {
  const frmt = format || df;
  const err = erreur || 'Pas de correspondances.';
  const tvg = dt;
  let resultat;

  if (tvg[dd]) {
    resultat = frmt.replace(/%[ADJMNSabcflmoprvz123]+/g,

      // jscs:disable
      (x) => {
        // jscs:enable
        const res = balisesEtFiltres(x, dobj(tvg, pro));

        return res;
      }
    );
    if (typeof rappel === 'function') {
      resultat = rappel(resultat, dobj(tvg, pro));
    }
  } else {
    resultat = err;
  }
  return resultat;
};
