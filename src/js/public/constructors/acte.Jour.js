/**
 * Pour convertir une saisie en objet JavaScript.
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
 * @example
 * new acte.Jour('15/10/1582').gregorien() // 15 octobre 1582
 * new acte.Jour('5 Xbre 1793').gregorien() // 5 décembre 1793
 * new acte.Jour('5 Jet 1793').gregorien() // 5 juillet 1793
 * new acte.Jour('10 nivôse an XIV').gregorien() // 31 décembre 1805
 * new acte.Jour('8 frimaire an XVIII').gregorien() // Pas de correspondances.
 * new acte.Jour('8 frimaire an XVIII', false).gregorien() // 29 novembre 1809
 * new acte.Jour('14/10/1582').gregorien() // Pas de correspondances.
 * new acte.Jour('14/10/1582', false).gregorien() // 14 octobre 1582
 * @since 0.0.1
 * @license MIT
 */
acte.Jour = class Jour {
  constructor(saisie, limites) {
    let tab = [];

    this.variables = this.variables || {};
    this.limites = limites !== false;

    // On détecte si c'est une date républicaine
    if (saisie.match(
        /(i(d|r)|(ô|o)s|a(d|l)|or).*\Wan\s-?([-MDCLXVI]+|\d+)\W?/gi) ||
      saisie.match(/^an\s-?([-MDCLXVI]+|\d+)/gmi)) {
      tab = tabRepublicain(saisie, this.limites);

      // Si ce n'est pas du républicain (donc grégorien ou julien)
    } else {
      tab = tabGregorien(saisie, this.limites);
    }

    // Ecriture de toutes les valeurs
    this.variables = {
      gregorien: {
        jm: tab[0],
        m: tab[1],
        a: tab[2],
        od: tab[3],
      },
      julien: {
        jj: tab[4],
        jm: tab[5],
        m: tab[6],
        a: tab[7],
        od: tab[8],
      },
      republicain: {
        jd: tab[9],
        d: tab[10],
        jm: tab[11],
        m: tab[12],
        a: tab[13],
      },
      limites: this.limites,
    };
  }
};
