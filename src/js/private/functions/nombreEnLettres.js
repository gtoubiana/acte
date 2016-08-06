/**
 * Pour convertir les nombres en toutes lettres.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.15
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Number} n - le nombre en chiffres
 * @param {String} [r] - par défaut, la réforme de 1990 est appliquée.
 * Pour utiliser l'ancienne notation, il suffit d'ajouter un argument.
 * @return {String} le nombre en toutes lettres
 * @example
 * nombreEnLettres(2371); // "Deux-mille-trois-cent-soixante-et-onze"
 * nombreEnLettres(1799,1); // "Mille sept cent quatre-vingt-dix-neuf"
 */
const nombreEnLettres = (n, r) => {
  let mill;
  let sepcen;
  let centl;
  let sepdix;
  let dixl;
  let sepunit;
  let unitl;
  let dizunit;
  let res;

  if (typeof n === 'number' && n > -10000 && n < 10000) {
    // UnitesEnLettres
    const u = unitesEnLettres;

    // DixainesEnLettres
    const v = dixainesEnLettres;

    // Saisie en valeur absolue
    const abs = Math.abs(n);
    const splus = (r) ? ' ' : '-';

    // Milliers
    const mil = parseInt(abs / 1000, 10);

    // Centaines
    const cent = parseInt(abs % 1000 / 100, 10);

    // Dixaines
    const dix = parseInt(abs % 100 / 10, 10);

    // Unités
    const unit = parseInt(abs % 10, 10);

    // Milliers
    if (mil === 1) {
      // Un seul millier
      mill = 'mille';
    } else if (mil > 1) {
      // Plusieurs milliers
      mill = `${u[mil]}${splus}mille`;
    } else {
      // Pas de milliers
      mill = '';
    }

    // Centaines
    sepcen = (mil > 0) ? splus : '';
    if (cent === 1) {
      // Une seule centaine
      centl = `${sepcen}cent`;
    } else if (cent > 1 && dix === 0 && unit === 0) {
      // Plusieurs centaines
      centl = `${sepcen}${u[cent]}${splus}cents`;
    } else if (cent > 1) {
      // Plusieurs centaines suivies de dizaines
      centl = `${sepcen}${u[cent]}${splus}cent`;
    } else {
      // Pas de centaines
      centl = '';
    }

    // Dizaines et unités
    sepdix = (mil + cent > 0) && (dix + unit > 0) ? splus : '';
    if (dix > 0) {
      dixl = v[dix];

      // Splus
      sepunit = '-';
    } else {
      dixl = '';
      sepunit = '';
    }

    // Unités
    unitl = (abs > 0) ? sepunit + u[unit] : 'zéro';

    // Multiples de 10
    if ((dix * 10 + unit) % 10 === 0) {
      unitl = '';
    }

    // Dix, soixante-dix, quatre-vingt-dix
    if ((dix === 1 || dix === 7 || dix === 9) && unit === 0) {
      dixl = (dix === 1) ? 'dix' : `${v[dix]}-dix`;
      unitl = (dix === 1) ? '' : u[unit];
    }

    // Onze+
    // soixante-et-onze+, quatre-vingt-onze+
    if ((dix === 1 || dix === 7 || dix === 9) && unit >= 1) {
      dixl = (dix === 1) ? '' : v[dix];
      if (dix === 1) {
        sepunit = '';
      }
      unitl = (dix === 7 && unit === 1) ?
        `${splus}et${splus}${u[10 + unit]}` : sepunit + u[10 + unit];
    }

    // Vingt-et-un, trente-et-un, quarante-et-un,
    // cinquante-et-un, soixante-et-un
    if (dix >= 2 && dix <= 6 && unit === 1) {
      unitl = `${splus}et${splus}${u[unit]}`;
    }

    // Pluriel sur 80
    if (dix === 8 && unit === 0) {
      dixl = `${v[dix]}s`;
      unitl = '';
    }

    dizunit = sepdix + dixl + unitl;

    // Si nombre négatif
    const avjc = (n < 0) ? 'Moins ' : '';

    res = (abs > 0) ? initialeEnCapitale(avjc + mill + centl + dizunit) :
      'Zéro';
  } else {
    res = '';
  }
  return res;
};
