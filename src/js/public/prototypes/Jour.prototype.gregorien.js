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
  const frmt = format || '%Jp %Mlb %A';
  const err = erreur || 'Pas de correspondances.';
  const tvg = this.variables.gregorien;
  let resultat;

  if (tvg.od) {
    const obj = {
      A: tvg.a,
      D: semaineComplete(tvg.jm, tvg.m, tvg.a, 1),
      JA: periodeEnJours(1, 1, tvg.a, tvg.jm, tvg.m, tvg.a),
      J: tvg.jm,
      JS: tvg.od.getDay(),
      JSl: jourGregorien[tvg.od.getDay()],
      M: tvg.m,
      Ml: moisGregorien[tvg.m - 1],
      S: semaineComplete(tvg.jm, tvg.m, tvg.a, 0),
    };

    resultat = frmt.replace(/%[ADJMNSabcflmoprvz123]+/g,

      /* Sortir cette partie ? */
      // jscs:disable
      (x) => {
        // jscs:enable
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
          res = arabeVersRomain(res);
        }
        if (x.match(/z/)) {
          // - z = Zéro devant le chiffre
          res = prefixeZero(res);
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
              res = nombreEnLettres(res, 1);
            } else {
              // - l = chiffres en Lettres
              res = nombreEnLettres(res);
            }
            ordinaux = true;
          }
        }
        if (x.match(/a/)) {
          if (x.match(/[^JDS](MA|M)/)) {
            // MAa | Ma = Mois en Abrégé
            res = obj.Ml[1];
          } else if (x.match(/(JS|JD)/)) {
            // JSa | JDa = Jour de la Décade/Semaine en Abrégé
            res = obj.JSl[1];
          }
        }
        if (x.match(/3/)) {
          if (x.match(/[^JDS](MA|M)/)) {
            // MA3 | M3 = Mois en Abrégé sur 3 caractères
            res = obj.Ml[2];
          } else if (x.match(/(JS|JD)/)) {
            // JS3 | JD3 = Jour de la Décade/Semaine en Abrégé
            // sur 3 caractères
            res = obj.JSl[2];
          }
        }
        if (x.match(/2/)) {
          if (x.match(/[^JDS](MA|M)/)) {
            // MA2 | M2 = Mois en Abrégé sur 2 caractères
            res = obj.Ml[3];
          } else if (x.match(/(JS|JD)/)) {
            // JS2 | JD2 = Jour de la Décade/Semaine en Abrégé
            // sur 2 caractères
            res = obj.JSl[3];
          }
        }
        if (x.match(/1/)) {
          if (x.match(/[^JDS](MA|M)/)) {
            // MA1 | M1 = Mois en Abrégé sur 1 caractère
            res = obj.Ml[4];
          } else if (x.match(/(JS|JD)/)) {
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
          if (ordinaux && x.match(/f/)) {
            res = ordinauxEnLettres(lettres, 1);
          } else if (ordinaux) {
            res = ordinauxEnLettres(lettres);
          } else if (x.match(/f/) && chiffres) {
            res = nombreOrdinal(lettres, 're', 'e');
          } else if (chiffres) {
            res = nombreOrdinal(lettres, 'er', 'e');
          }
        }

        // - p = Premier ou 1er
        if (x.match(/p/)) {
          if (ordinaux) {
            res = premierOrdinalEnLettres(lettres);
          } else {
            res = nombreOrdinal(lettres, 'er', '');
          }
        }

        // - f = Féminin de p (première ou 1re)
        if (x.match(/[^o]f/)) {
          if (ordinaux) {
            res = premierOrdinalEnLettres(lettres, 1);
          } else {
            res = nombreOrdinal(lettres, 're', '');
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
      });

    if (typeof rappel === 'function') {
      resultat = rappel(resultat, obj);
    }
  } else {
    resultat = err;
  }

  return resultat;
};
