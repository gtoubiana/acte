/**
 * Pour convertir la saisie grégorienne ou julienne en Objet Jour
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte.js|Projet sur GitHub}
 * @param {String} saisie - Saisie d'une date
 * @param {Boolean} limites - Par défaut, les résultats sont limités
 * aux périodes d'utilisation des calendriers. Seule la valeur `false`
 * permet de désactiver ces limites.
 * @return {Array} Les dates républicaines, grégoriennes et juliennes
 * @example
 * tabGregorien(saisie, this.limites);
 */
var tabGregorien = function tabGregorien(saisie, limites) {
  var tab = [];
  var dateJulienne;
  var dateRepublicaine;
  // Uniformisation de la saisie
  var saisieGregorien = saisieValide(saisie, REGEXP_GREGORIEN);

  // Lorsque la date est valide [gjmc,gmc,gac]
  if (saisieGregorien[2] && saisieGregorien[0] < 32 &&
    absInt(saisieGregorien[0]) !== 0 &&
    saisieGregorien[1] < 13 && saisieGregorien[1] !== '' &&
    absInt(saisieGregorien[1]) !== 0) {
    tab[4] = gregorienVersJj(parseInt(saisieGregorien[2], 10), absInt(
      saisieGregorien[1]), absInt(saisieGregorien[0]));

    // Limitations gregorien/julien
    if ((limites === true) && (tab[4] < JJ_DEBUT_GREGORIEN)) {
      tab[5] = absInt(saisieGregorien[0]);
      tab[6] = absInt(saisieGregorien[1]);
      tab[7] = parseInt(saisieGregorien[2], 10);
      tab[8] = dateValide(tab[5], tab[6], tab[7]);
    } else {
      tab[0] = absInt(saisieGregorien[0]);
      tab[1] = absInt(saisieGregorien[1]);
      tab[2] = parseInt(saisieGregorien[2], 10);
      tab[3] = dateValide(tab[0], tab[1], tab[2]);
      dateJulienne = jjVersJulien(tab[4]);
      tab[5] = dateJulienne[2];
      tab[6] = dateJulienne[1];
      tab[7] = dateJulienne[0];
      tab[8] = dateValide(tab[5], tab[6], tab[7]);
    }

    // Limitations republicain
    if (((tab[4] >= JJ_DEBUT_REPUBLICAIN) &&
        (tab[4] <= JJ_FIN_REPUBLICAIN)) ||
      ((tab[4] >= JJ_DEBUT_COMMUNE_DE_PARIS) &&
        (tab[4] <= JJ_FIN_COMMUNE_DE_PARIS)) ||
      limites === false) {
      dateRepublicaine = jjVersRepublicain(tab[4]);
      tab = tab.concat([dateRepublicaine[3], dateRepublicaine[2], (
          dateRepublicaine[2] - 1) * 10 + dateRepublicaine[3],
        dateRepublicaine[1], dateRepublicaine[0]
      ]);
    }
  }
  return tab;
};
