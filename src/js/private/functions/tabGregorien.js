/**
 * Pour convertir la saisie grégorienne ou julienne en Objet Jour.
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
 * tabGregorien(saisie, this.limites);
 */
const tabGregorien = (saisie, limites) => {
  // Uniformisation de la saisie
  const iesaisie = saisie[0] === '/' ? `1${saisie}` : saisie;
  let saisieGregorien = iesaisie.replace(/\W?an\s-?([-MDCLXVI]+)\W?/gi,

    // jscs:disable
    (x, p1) => {
      const rva = romainVersArabe(p1);

      return x.match(/-/) ? ` -${rva}` : ` ${rva}`;
    });

  // jscs:enable
  const tab = [];

  saisieGregorien = saisieValide(saisieGregorien, regexpGregorien);

  // Lorsque la date est valide [gjmc,gmc,gac]
  if (saisieGregorien[2] && saisieGregorien[0] < 32 &&
    absInt(saisieGregorien[0]) !== 0 &&
    saisieGregorien[1] < 13 && saisieGregorien[1] > 0 &&
    saisieGregorien[1] !== '' && absInt(saisieGregorien[1]) !== 0 &&
    (saisieGregorien[0] <= joursDansLeMois[saisieGregorien[1] - 1])) {
    tab[4] = gregorienVersJj(parseInt(saisieGregorien[2], 10), absInt(
      saisieGregorien[1]), absInt(saisieGregorien[0]));

    // Si limitation et avant début du calendrier grégorien
    if ((limites === true) && (tab[4] < gregorienVersJj(
        dateDebutGregorien[2], dateDebutGregorien[1], dateDebutGregorien[
          0]))) {
      tab[5] = absInt(saisieGregorien[0]);
      tab[6] = absInt(saisieGregorien[1]);
      tab[7] = parseInt(saisieGregorien[2], 10);
      tab[8] = dateValide(tab[5], tab[6], tab[7]);

      // Si limitation et après la fin du calendrier julien
      if (tab[8] > dateValide(dateFinJulien[0], dateFinJulien[1],
          dateFinJulien[2])) {
        tab[0] = tab[5] + 10;
        tab[1] = tab[6];
        tab[2] = tab[7];
        tab[3] = dateValide(tab[0], tab[1], tab[2]);
      }

      // Résultats gregorien/julien standards et/ou débridés
    } else {
      tab[0] = absInt(saisieGregorien[0]);
      tab[1] = absInt(saisieGregorien[1]);
      tab[2] = parseInt(saisieGregorien[2], 10);
      tab[3] = dateValide(tab[0], tab[1], tab[2]);

      // Si débridé
      if (limites === false) {
        const dateJulienne = jjVersJulien(tab[4]);

        tab[5] = dateJulienne[2];
        tab[6] = dateJulienne[1];
        tab[7] = dateJulienne[0];
        tab[8] = dateValide(tab[5], tab[6], tab[7]);
      }
    }

    // Limitations republicain
    if (((tab[4] >= jjDebutRepublicain) &&
        (tab[4] <= jjFinRepublicain)) ||
      ((tab[4] >= jjDebutCommuneDeParis) &&
        (tab[4] <= jjFinCommuneDeParis)) ||
      limites === false) {
      const dateRepublicaine = jjVersRepublicain(tab[4]);

      tab[9] = dateRepublicaine[3];
      tab[10] = dateRepublicaine[2];
      tab[11] = (dateRepublicaine[2] - 1) * 10 + dateRepublicaine[3];
      tab[12] = dateRepublicaine[1];
      tab[13] = dateRepublicaine[0];
    }
  }

  return tab;
};
