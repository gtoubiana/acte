/**
 * Pour convertir une saisie en objet JavaScript
 * @memberof acte
 * @class
 * @chainable
 * @access public
 * @author Gilles Toubiana
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {String} saisie - Saisie d'une date grégorienne ou républicaine.
 * @param {Boolean} [limites=true] - Par défaut, les résultats sont limités
 * aux périodes d'utilisation des calendriers :<br>
 * - une saisie de date grégorienne sera considérée comme julienne avant
 * le 15/10/1582<br>
 * - une saisie de date républicaine ne sera valide que du 22/9/1792 au
 * 31/12/1805 (Période républicaine) et du 18/3/1871 au 28/5/1871
 * (Commune de Paris).<br>
 * La valeur `false` permet de désactiver ces limitations.
 * @since 0.0.1
 * @license MIT
 */
acte.Jour = class Jour {
  constructor(saisie, limites) {
    let tab = [];

    this.variables = this.variables || {};
    this.limites = limites !== false;

    // On détecte si c'est une date républicaine
    if (saisie.match(/\W?an\s-?([-MDCLXVI]+|\d+)\W?/gi)) {
      tab = tabRepublicain(saisie, this.limites);

      // Si ce n'est pas du républicain (donc grégorien ou julien)
    } else {
      tab = tabGregorien(saisie, this.limites);
    }

    // Ecriture de toutes les valeurs
    this.variables = {
      gregorien: {
        jmc: tab[0],
        mc: tab[1],
        ac: tab[2],
        od: tab[3],
      },
      julien: {
        jj: tab[4],
        jmc: tab[5],
        mc: tab[6],
        ac: tab[7],
        od: tab[8],
      },
      republicain: {
        jdc: tab[9],
        dc: tab[10],
        jmc: tab[11],
        mc: tab[12],
        ac: tab[13],
      },
      limites: this.limites,
    };
  }
};
