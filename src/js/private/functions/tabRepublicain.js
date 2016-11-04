/**
 * Pour convertir la saisie républicaine en Objet Jour.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {String} saisie - Saisie d'une date
 * @param {Boolean} limites - Par défaut, les résultats sont limités
 * aux périodes d'utilisation des calendriers. Seule la valeur `false`
 * permet de désactiver ces limites.
 * @return {Array} Les dates républicaines, grégoriennes et juliennes
 * @example
 * tabRepublicain(saisie, this.limites);
 */
const tabRepublicain = (saisie, limites) => {
  // On remplace les chiffres romains en chiffres arabes
  let saisieRepublicain = saisie.replace(/\W?an\s-?([-MDCLXVI]+)\W?/gi,

    // jscs:disable
    (x, p1) => {
      const rva = romainVersArabe(p1);

      return x.match(/-/) ? ` -${rva}` : ` ${rva}`;
    });

  // jscs:enable
  const tab = [];

  // Uniformisation de la saisie
  saisieRepublicain = saisieValide(saisieRepublicain, regexpRepublicain);

  // Lorsque la date est valide [rjmc,rmc,rac]
  if (saisieRepublicain[2] < anneeMax && saisieRepublicain[0] < 31 &&
    absInt(saisieRepublicain[0]) !== 0 && saisieRepublicain[1] < 14 &&
    absInt(saisieRepublicain[1]) !== 0) {
    tab[4] = republicainVersJj(parseInt(saisieRepublicain[2], 10),
      parseInt(saisieRepublicain[1], 10), rjmcVersRdc(saisieRepublicain[0]),
      rjmcVersRjdc(saisieRepublicain[0]));

    // Si jj (tab[4]) est dans les limites ou en illimité
    if (((tab[4] >= jjDebutRepublicain) &&
        (tab[4] <= jjFinRepublicain)) ||
      ((tab[4] >= jjDebutCommuneDeParis) &&
        (tab[4] <= jjFinCommuneDeParis)) ||
      limites === false) {
      const dateGregorienne = jjVersGregorien(tab[4]);
      const dateJulienne = jjVersJulien(tab[4]);

      tab[0] = dateGregorienne[2];
      tab[1] = dateGregorienne[1];
      tab[2] = dateGregorienne[0];
      tab[3] = dateValide(tab[0], tab[1], tab[2]);
      tab[5] = dateJulienne[2];
      tab[6] = dateJulienne[1];
      tab[7] = dateJulienne[0];
      tab[8] = dateValide(tab[5], tab[6], tab[7]);
      tab[9] = rjmcVersRjdc(saisieRepublicain[0]);
      tab[10] = rjmcVersRdc(saisieRepublicain[0]);
      tab[11] = absInt(saisieRepublicain[0]);
      tab[12] = parseInt(saisieRepublicain[1], 10);
      tab[13] = parseInt(saisieRepublicain[2], 10);
    }
  }

  return tab;
};
