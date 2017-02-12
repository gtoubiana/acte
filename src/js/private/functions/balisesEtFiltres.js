/**
 * Pour appliquer les balises et filtres aux prototypes gregorien(),
 * julien() et republicain().
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.15
 * @license MIT
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @param {Number} x - Saisie
 * @param {Object} obj - Objet content les dates
 * @return {String} Saisie filtrée
 * @example
 * balisesEtFiltres(x, dobj(tvg));
 */
const balisesEtFiltres = (x, obj) => {
  let arabe;
  let ordinaux;
  let res = x;
  let chiffres = true;

  // BALISES
  if (x.match(/A/)) {
    if (x.match(/AN/)) {
      // AN = Année
      res = obj.A;
    } else {
      // A = Année
      res = obj.A;
    }
  }
  if (x.match(/J/)) {
    if (x.match(/JA/)) {
      // JA = Jour dans l'Année
      res = obj.JA;
    } else {
      // J = Jour dans le mois
      res = obj.J;
    }
  }
  if (x.match(/M/)) {
    if (x.match(/MA/)) {
      // MA = Mois dans l'Année
      res = obj.M;
    } else if (x.match(/JM/)) {
      // JM = Jour dans le Mois
      res = obj.J;
    } else {
      // M = Mois dans l'année
      res = obj.M;
    }
  }
  if (x.match(/D/)) {
    if (x.match(/DA/)) {
      // DA = Décade/Semaine dans l'Année
      res = obj.S;
    } else if (x.match(/DM/)) {
      // DM = Décade/Semaine dans le Mois
      res = obj.D;
    } else if (x.match(/JD/)) {
      // JD = Jour de la Décade/Semaine
      res = obj.JS;
    } else {
      // D = Décade/Semaine dans le mois
      res = obj.D;
    }
  }
  if (x.match(/S/)) {
    if (x.match(/SA/)) {
      // SA = Décade/Semaine dans l'année
      res = obj.S;
    } else if (x.match(/SM/)) {
      // SM = Décade/Semaine dans le mois
      res = obj.D;
    } else if (x.match(/JS/)) {
      // JS = Jour de la décade/semaine
      res = obj.JS;
    } else {
      // S = Décade/Semaine dans l'année
      res = obj.S;
    }
  }

  /* FILTRES */
  if (x.match(/r/)) {
    // - r = chiffres en Romains
    arabe = res;
    res = acte.arabeVersRomain(res);
  }
  if (x.match(/z/)) {
    // - z = Zéro devant le chiffre
    if (!arabe) {
      arabe = res;
    }
    res = acte.prefixeZero(res);
  }
  if (x.match(/l|v/)) {
    if (x.match(/[^JDS](MA|M)/)) {
      // MAl | Ml = Mois en Lettres
      res = obj.Ml[0];
      chiffres = false;
    } else if (x.match(/(JS|JD)/)) {
      // JSl | JDl = Jour de la Décade/Semaine en Lettres
      res = obj.JSl[0];
      chiffres = false;
    } else {
      if (x.match(/v/)) {
        // - v = chiffres en lettres (Vieille notation)
        res = arabe ? acte.nombreEnLettres(arabe, 1) : acte.nombreEnLettres(
          res, 1);
      } else {
        // - l = chiffres en Lettres
        res = arabe ? acte.nombreEnLettres(arabe) : acte.nombreEnLettres(
          res);
      }
      ordinaux = true;
    }
  }
  if (x.match(/a/)) {
    if (x.match(/[^JDS](MA|M)/)) {
      // MAa | Ma = Mois en Abrégé
      res = obj.Ml[1];
    }
    if (x.match(/(JS|JD)/)) {
      // JSa | JDa = Jour de la Décade/Semaine en Abrégé
      res = obj.JSl[1];
    }
  }
  if (x.match(/3/)) {
    if (x.match(/[^JDS](MA|M)/)) {
      // MA3 | M3 = Mois en Abrégé sur 3 caractères
      res = obj.Ml[2];
    }
    if (x.match(/(JS|JD)/)) {
      // JS3 | JD3 = Jour de la Décade/Semaine en Abrégé
      // sur 3 caractères
      res = obj.JSl[2];
    }
  }
  if (x.match(/2/)) {
    if (x.match(/[^JDS](MA|M)/)) {
      // MA2 | M2 = Mois en Abrégé sur 2 caractères
      res = obj.Ml[3];
    }
    if (x.match(/(JS|JD)/)) {
      // JS2 | JD2 = Jour de la Décade/Semaine en Abrégé
      // sur 2 caractères
      res = obj.JSl[3];
    }
  }
  if (x.match(/1/)) {
    if (x.match(/[^JDS](MA|M)/)) {
      // MA1 | M1 = Mois en Abrégé sur 1 caractère
      res = obj.Ml[4];
    }
    if (x.match(/(JS|JD)/)) {
      // JS1 | JD1 = Jour de la Décade/Semaine en Abrégé
      // sur 1 caractère
      res = obj.JSl[4];
    }
  }

  // ENCOURS bugs globaux avec chiffres et lettres
  // cf %Jrzl
  const lettres = res;

  // - o = lettres ou chiffres en Ordinaux
  if (x.match(/o/)) {
    /* istanbul ignore else  */
    if (ordinaux && x.match(/f/)) {
      res = acte.ordinauxEnLettres(lettres, 1);
    } else if (ordinaux) {
      res = acte.ordinauxEnLettres(lettres);
    } else if (x.match(/f/) && chiffres) {
      res = acte.nombreOrdinal(lettres, 're', 'e');
    } else if (chiffres) {
      res = acte.nombreOrdinal(lettres, 'er', 'e');
    }
  }

  // - p = Premier ou 1er
  if (x.match(/p/)) {
    if (ordinaux) {
      res = acte.premierOrdinalEnLettres(lettres);
    } else {
      res = acte.nombreOrdinal(lettres, 'er', '');
    }
  }

  // - f = Féminin de p (première ou 1re)
  if (x.match(/[^o]f/)) {
    if (ordinaux) {
      res = acte.premierOrdinalEnLettres(lettres, 1);
    } else {
      res = acte.nombreOrdinal(lettres, 're', '');
    }
  }
  if (x.match(/b/)) {
    // - b = en Bas de casse (minuscules)
    res = res.toString().toLowerCase();
  }
  if (x.match(/c|m/)) {
    // - c | m = en Capitales (Majuscules)
    res = res.toString().toUpperCase();
  }
  return res;
};
