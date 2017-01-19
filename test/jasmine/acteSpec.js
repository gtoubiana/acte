var acte = require('./lib/acte.js');
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

describe('Public functions', function () {
  it('acte.arabeVersRomain()', function () {
    expect(acte.arabeVersRomain(2012)).toEqual('MMXII');
  });
  it('acte.nombreEnLettres()', function () {
    expect(acte.nombreEnLettres(2371)).toEqual('Deux-mille-trois-cent-soixante-et-onze');
    expect(acte.nombreEnLettres(1799, 1)).toEqual('Mille sept cent quatre-vingt-dix-neuf');
  });
  it('acte.nombreOrdinal()', function () {
    expect(acte.nombreOrdinal(1, 'er', 'e')).toEqual('1er');
    expect(acte.nombreOrdinal(1, 're', 'e')).toEqual('1re');
    expect(acte.nombreOrdinal(2, 'er', 'e')).toEqual('2e');
  });
  it('acte.ordinauxEnLettres()', function () {
    expect(acte.ordinauxEnLettres('Un')).toEqual('Premier');
    expect(acte.ordinauxEnLettres('Un', 1)).toEqual('Première');
    expect(acte.ordinauxEnLettres('Deux')).toEqual('Deuxième');
    expect(acte.ordinauxEnLettres('Vingt-trois')).toEqual('Vingt-troisième');
  });
  it('acte.prefixeZero()', function () {
    expect(acte.prefixeZero(20)).toEqual(20);
    expect(acte.prefixeZero(9)).toEqual('09');
    expect(acte.prefixeZero(0)).toEqual(0);
    expect(acte.prefixeZero(-4)).toEqual(-4);
  });
  it('acte.premierOrdinalEnLettres()', function () {
    expect(acte.premierOrdinalEnLettres('Un')).toEqual('Premier');
    expect(acte.premierOrdinalEnLettres('Un', 1)).toEqual('Première');
    expect(acte.premierOrdinalEnLettres('Deux')).toEqual('Deux');
    expect(acte.premierOrdinalEnLettres('Vingt-trois')).toEqual('Vingt-trois');
  });
});

var dateValide = function dateValide(jour, mois, an) {
  var resultat = new Date(an, mois - 1, jour);

  resultat.setFullYear(an);
  return resultat;
};

var anActuel = new Date();

describe('new acte.Jour()', function () {
  it('new acte.Jour() = un objet', function () {
    expect(new acte.Jour('6 octobre 1793')).toEqual(jasmine.any(Object));
  });
  it('new acte.Jour().variables.gregorien.od = ' + 'un objet Date grégorienne (ou Undefined)', function () {
    // gregorien
    expect(new acte.Jour('1793').variables.gregorien.od).toEqual(dateValide(1, 1, 1793));
    expect(new acte.Jour('octobre 1793').variables.gregorien.od).toEqual(dateValide(1, 10, 1793));
    expect(new acte.Jour('2 octobre 1793').variables.gregorien.od).toEqual(dateValide(2, 10, 1793));
    expect(new acte.Jour('3 oct 1793').variables.gregorien.od).toEqual(dateValide(3, 10, 1793));
    expect(new acte.Jour('4 Oct. 1793').variables.gregorien.od).toEqual(dateValide(4, 10, 1793));
    expect(new acte.Jour('5 8bre 1793').variables.gregorien.od).toEqual(dateValide(5, 10, 1793));
    expect(new acte.Jour('6/10/1793').variables.gregorien.od).toEqual(dateValide(6, 10, 1793));
    expect(new acte.Jour('7.10.1793').variables.gregorien.od).toEqual(dateValide(7, 10, 1793));

    // false for debug
    expect(new acte.Jour('8//10.-1793', false).variables.gregorien.od).toEqual(dateValide(8, 10, -1793));
    expect(new acte.Jour('/2/3', false).variables.gregorien.od).toEqual(dateValide(1, 2, 3));
    expect(new acte.Jour('/3/4/', false).variables.gregorien.od).toEqual(dateValide(1, 3, 4));
    expect(new acte.Jour('4/5/6/', false).variables.gregorien.od).toEqual(dateValide(4, 5, 6));
    expect(new acte.Jour('/5/6/7', false).variables.gregorien.od).toEqual(dateValide(1, 5, 6));
    expect(new acte.Jour('/6/7/8/', false).variables.gregorien.od).toEqual(dateValide(1, 6, 7));
    expect(new acte.Jour('7/8/9/1', false).variables.gregorien.od).toEqual(dateValide(7, 8, 9));

    // republicain
    expect(new acte.Jour('1er vendémiaire an I').variables.gregorien.od).toEqual(dateValide(22, 9, 1792));
    expect(new acte.Jour('1 vendémiaire an 1').variables.gregorien.od).toEqual(dateValide(22, 9, 1792));
    expect(new acte.Jour('vendémiaire an 1').variables.gregorien.od).toEqual(dateValide(22, 9, 1792));
    expect(new acte.Jour('an I').variables.gregorien.od).toEqual(dateValide(22, 9, 1792));
    expect(new acte.Jour('La loi du 18 germinal an III.').variables.gregorien.od).toEqual(dateValide(7, 4, 1795));
    expect(new acte.Jour('le Sextidi, 6 messidor, décade 28, de l\'an I.').variables.gregorien.od).toEqual(dateValide(24, 6, 1793));

    // Debut gregorien
    expect(new acte.Jour('15 octobre 1582').variables.gregorien.od).toEqual(dateValide(15, 10, 1582));

    // Fin julien
    expect(new acte.Jour('14 octobre 1582').variables.gregorien.od).toEqual(dateValide(24, 10, 1582));

    // Fin julien forcé
    expect(new acte.Jour('14 octobre 1582', false).variables.gregorien.od).toEqual(dateValide(14, 10, 1582));

    // Coverage gregorienBissextile()
    expect(new acte.Jour('29 février 4', false).variables.gregorien.od).toEqual(dateValide(29, 2, 4));
    expect(new acte.Jour('29 février 100', false).variables.gregorien.od).toEqual(dateValide(29, 2, 100));
    expect(new acte.Jour('29 février 400', false).variables.gregorien.od).toEqual(dateValide(29, 2, 400));
    expect(new acte.Jour('29 février 1600').variables.gregorien.od).toEqual(dateValide(29, 2, 1600));
    expect(new acte.Jour('29 février 40000').variables.gregorien.od).toEqual(dateValide(29, 2, 40000));

    // Coverage anRepublicain()
    expect(new acte.Jour('7 août 33618', false).variables.gregorien.od).toEqual(dateValide(7, 8, 33618));

    // Coverage deltaT()
    expect(new acte.Jour('8 septembre 2099', false).variables.gregorien.od).toEqual(dateValide(8, 9, 2099));
    expect(new acte.Jour('8 septembre ' + anActuel.getFullYear(), false).variables.gregorien.od).toEqual(dateValide(8, 9, anActuel.getFullYear()));

    // Undefined
    expect(new acte.Jour('6 octobre').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('octobre').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('6/13/1793').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('32/10/1793').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('0 octobre 1657').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('-00 octobre 1657').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('-12/-10/-1657', false).variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('8/5').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('8/5/').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('27 frimaire').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('frimaire').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('6-10-1793').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('1 vendémiaire').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('vendémiaire').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('67 vendémiaire an I').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('totokjhkjh').variables.gregorien.od).not.toBeDefined();
    expect(new acte.Jour('').variables.gregorien.od).not.toBeDefined();
  });
  it('new acte.Jour().variables.gregorien.a = l\'année grégorienne en chiffres', function () {
    expect(new acte.Jour('1 octobre 1793').variables.gregorien.a).toEqual(1793);
  });
  it('new acte.Jour().variables.gregorien.m = le mois grégorien en chiffres', function () {
    expect(new acte.Jour('2 octobre 1793').variables.gregorien.m).toEqual(10);
  });
  it('new acte.Jour().variables.gregorien.jm = le jour du mois grégorien ' + 'en chiffres', function () {
    expect(new acte.Jour('3 octobre 1793').variables.gregorien.jm).toEqual(3);
  });
  it('new acte.Jour().variables.julien.od = un objet Date julienne ' + '(ou Undefined)', function () {
    // Debut gregorien
    expect(new acte.Jour('15 octobre 1582').variables.julien.od).not.toBeDefined();

    // Fin julien
    expect(new acte.Jour('14 octobre 1582').variables.julien.od).toEqual(dateValide(14, 10, 1582));

    // Fin julien forcé
    expect(new acte.Jour('14 octobre 1582', false).variables.julien.od).toEqual(dateValide(4, 10, 1582));
  });
  it('new acte.Jour().variables.julien.a = l\'année julienne en chiffres', function () {
    expect(new acte.Jour('4 octobre 793').variables.julien.a).toEqual(793);
  });
  it('new acte.Jour().variables.julien.m = le mois julien en chiffres', function () {
    expect(new acte.Jour('5 octobre 793').variables.julien.m).toEqual(10);
  });
  it('new acte.Jour().variables.julien.jm = le jour du mois julien en chiffres', function () {
    expect(new acte.Jour('6 octobre 793').variables.julien.jm).toEqual(6);
  });
  it('new acte.Jour().variables.julien.jj = le nombre de jours juliens', function () {
    expect(new acte.Jour('7 octobre 793').variables.julien.jj).toEqual(2010976.5);
  });
  it('new acte.Jour().variables.republicain.a = l\'année républicaine ' + 'en chiffres (ou Undefined)', function () {
    expect(new acte.Jour('6 octobre 1793').variables.republicain.a).toEqual(2);

    // Borne mini
    expect(new acte.Jour('22 septembre 1792').variables.republicain.a).toEqual(1);
    expect(new acte.Jour('1 Vendémiaire an I').variables.republicain.a).toEqual(1);

    // Borne maxi
    expect(new acte.Jour('31 décembre 1805').variables.republicain.a).toEqual(14);
    expect(new acte.Jour('10 nivôse an XIV').variables.republicain.a).toEqual(14);

    // Date négative
    expect(new acte.Jour('-12 frimaire an -XVIII', false).variables.republicain.a).toEqual(-18);
    expect(new acte.Jour('-12 frimaire an -1685', false).variables.republicain.a).toEqual(-1685);

    // Retourne la date hors des bornes
    expect(new acte.Jour('frimaire an XVIII', false).variables.republicain.a).toEqual(18);

    // Min commune de Paris
    expect(new acte.Jour('27 ventose an LXXIX').variables.republicain.a).toEqual(79);

    // Max commune de Paris
    expect(new acte.Jour('8 prairial an LXXIX').variables.republicain.a).toEqual(79);

    // Pendant la commune de Paris
    expect(new acte.Jour('25 mai 1871').variables.republicain.a).toEqual(79);

    // Coverage JjVersGregorien()
    expect(new acte.Jour('11 nivôse an I').variables.republicain.a).toEqual(1);

    // Saisie erronée
    expect(new acte.Jour('31 frimaire an XVIII').variables.republicain.a).not.toBeDefined();
    expect(new acte.Jour('0 frimaire an XVIII').variables.republicain.a).not.toBeDefined();
    expect(new acte.Jour('-00 frimaire an XVIII').variables.republicain.a).not.toBeDefined();

    // Manque l'année
    expect(new acte.Jour('27 frimaire').variables.republicain.a).not.toBeDefined();

    // Manque l'année et le jour
    expect(new acte.Jour('frimaire').variables.republicain.a).not.toBeDefined();

    // Sous la borne mini
    expect(new acte.Jour('21 septembre 1792').variables.republicain.a).not.toBeDefined();
    expect(new acte.Jour('30 fructidor an 0').variables.republicain.a).not.toBeDefined();

    // Au delà de la borne maxi
    expect(new acte.Jour('1 janvier 1806').variables.republicain.a).not.toBeDefined();
    expect(new acte.Jour('11 nivôse an 14').variables.republicain.a).not.toBeDefined();

    // Min commune de Paris
    expect(new acte.Jour('26 ventose an LXXIX').variables.republicain.a).not.toBeDefined();

    // Max commune de Paris
    expect(new acte.Jour('9 prairial an LXXIX').variables.republicain.a).not.toBeDefined();
  });
  it('new acte.Jour().variables.republicain.m = ' + 'le mois républicain en chiffres', function () {
    expect(new acte.Jour('6 octobre 1793').variables.republicain.m).toEqual(1);
  });
  it('new acte.Jour().variables.republicain.jm = le jour du mois républicain ' + 'en chiffres', function () {
    expect(new acte.Jour('6 octobre 1793').variables.republicain.jm).toEqual(15);
  });
  it('new acte.Jour().variables.republicain.d = la décade républicaine ' + 'en chiffres', function () {
    expect(new acte.Jour('6 octobre 1793').variables.republicain.d).toEqual(2);
  });
  it('new acte.Jour().variables.republicain.jd = le jour de la décade ' + 'républicaine en chiffres', function () {
    expect(new acte.Jour('6 octobre 1793').variables.republicain.jd).toEqual(5);
  });
});

describe('new acte.Jour().gregorien()', function () {
  // Valeurs par défaut
  it('new acte.Jour().gregorien() = la date grégorienne ' + 'formatée par défaut.', function () {
    expect(new acte.Jour('1/1/1600').gregorien()).toEqual('1er janvier 1600');
    expect(new acte.Jour('2 jan 1890').gregorien()).toEqual('2 janvier 1890');
    expect(new acte.Jour('8 juin an 1890').gregorien()).toEqual('8 juin 1890');
    expect(new acte.Jour(new Date(1890, 6, 9)).gregorien()).toEqual('9 juillet 1890');
    expect(new acte.Jour('8 brumaire an 1890', false).gregorien()).toEqual('28 octobre 3681');
    expect(new acte.Jour('9 brumaire juillet an 1890', false).gregorien()).toEqual('29 octobre 3681');
    expect(new acte.Jour('10 brum juillet an 1890', false).gregorien()).toEqual('10 juillet 1890');
    expect(new acte.Jour('11 juillet an 10', false).gregorien()).toEqual('11 juillet 10');
    expect(new acte.Jour('12 juillet an X', false).gregorien()).toEqual('12 juillet 10');
    expect(new acte.Jour('le 1er janvier de l\'an 2', false).gregorien()).toEqual('1er janvier 2');
    expect(new acte.Jour('le 4 mars de l\'an VI', false).gregorien()).toEqual('4 mars 6');
    expect(new acte.Jour('le 5 avril de l\'an -IV', false).gregorien()).toEqual('5 avril -4');
    expect(new acte.Jour('5/10/1582').gregorien('%JSl %JM %Mlb %A')).toEqual('Vendredi 15 octobre 1582');
    expect(new acte.Jour('14/10/1582').gregorien('%JSl %JM %Mlb %A')).toEqual('Dimanche 24 octobre 1582');
    expect(new acte.Jour('15/10/1582').gregorien('%JSl %JM %Mlb %A')).toEqual('Vendredi 15 octobre 1582');
    expect(new acte.Jour('15/10/1582', false).gregorien('%JSl %JM %Mlb %A')).toEqual('Vendredi 15 octobre 1582');

    // Gestion des années bissextiles
    expect(new acte.Jour('29 février 2004').gregorien()).toEqual('29 février 2004');
    expect(new acte.Jour('29 février 1900').gregorien()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('29 février 2000').gregorien()).toEqual('29 février 2000');
    expect(new acte.Jour('29 février 1004').gregorien()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('29 février 900').gregorien()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('29 février 1000').gregorien()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('29 février 2004', false).gregorien()).toEqual('29 février 2004');
    expect(new acte.Jour('29 février 1900', false).gregorien()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('29 février 2000', false).gregorien()).toEqual('29 février 2000');
    expect(new acte.Jour('29 février 1004', false).gregorien()).toEqual('29 février 1004');
    expect(new acte.Jour('29 février 900', false).gregorien()).toEqual('29 février 900');
    expect(new acte.Jour('29 février 1000', false).gregorien()).toEqual('29 février 1000');
  });

  // Balises
  it('new acte.Jour().gregorien(\'%A\') = l\'Année grégorienne.', function () {
    expect(new acte.Jour('1/1/1601').gregorien('%A')).toEqual('1601');
  });
  it('new acte.Jour().gregorien(\'%AN\') = l\'Année grégorienne.', function () {
    expect(new acte.Jour('1/1/1602').gregorien('%AN')).toEqual('1602');
  });
  it('new acte.Jour().gregorien(\'%D\') = la décade/Semaine dans le mois.', function () {
    expect(new acte.Jour('14/1/1600').gregorien('%D')).toEqual('2');
  });
  it('new acte.Jour().gregorien(\'%DM\') = la décade/Semaine dans le mois.', function () {
    expect(new acte.Jour('21/1/1600').gregorien('%DM')).toEqual('3');
  });
  it('new acte.Jour().gregorien(\'%SM\') = la décade/Semaine dans le mois.', function () {
    expect(new acte.Jour('28/1/1600').gregorien('%SM')).toEqual('4');
  });
  it('new acte.Jour().gregorien(\'%J\') = le Jour dans le mois.', function () {
    expect(new acte.Jour('26/1/1600').gregorien('%J')).toEqual('26');
  });
  it('new acte.Jour().gregorien(\'%JM\') = le Jour dans le mois.', function () {
    expect(new acte.Jour('27/1/1600').gregorien('%JM')).toEqual('27');
  });
  it('new acte.Jour().gregorien(\'%JA\') = le Jour dans l\'année.', function () {
    expect(new acte.Jour('23/8/1600').gregorien('%JA')).toEqual('236');
  });
  it('new acte.Jour().gregorien(\'%JS\') = le Jour de la décade/Semaine.', function () {
    expect(new acte.Jour('7/1/1600').gregorien('%JS')).toEqual('5');
  });
  it('new acte.Jour().gregorien(\'%JD\') = le Jour de la décade/Semaine.', function () {
    expect(new acte.Jour('8/1/1600').gregorien('%JD')).toEqual('6');
  });
  it('new acte.Jour().gregorien(\'%M\') = le Mois dans l\'année.', function () {
    expect(new acte.Jour('1/9/1600').gregorien('%M')).toEqual('9');
  });
  it('new acte.Jour().gregorien(\'%MA\') = le Mois dans l\'année.', function () {
    expect(new acte.Jour('1/10/1600').gregorien('%MA')).toEqual('10');
  });
  it('new acte.Jour().gregorien(\'%S\') = la Semaine/décade dans l\'année.', function () {
    expect(new acte.Jour('1/4/1600').gregorien('%S')).toEqual('13');
  });
  it('new acte.Jour().gregorien(\'%SA\') = la Semaine/décade dans l\'année.', function () {
    expect(new acte.Jour('1/5/1600').gregorien('%SA')).toEqual('18');
  });
  it('new acte.Jour().gregorien(\'%DA\') = la Semaine/décade dans l\'année.', function () {
    expect(new acte.Jour('1/6/1600').gregorien('%DA')).toEqual('22');
  });

  // Filtres
  it('new acte.Jour().gregorien(\'%M1\') = Mois en lettres sur 1 caractère.', function () {
    expect(new acte.Jour('1/1/1600').gregorien('%M1')).toEqual('J');
  });
  it('new acte.Jour().gregorien(\'%M2\') = Mois en lettres sur 2 caractère.', function () {
    expect(new acte.Jour('1/2/1600').gregorien('%M2')).toEqual('Fr');
  });
  it('new acte.Jour().gregorien(\'%M3\') = Mois en lettres sur 3 caractère.', function () {
    expect(new acte.Jour('1/3/1600').gregorien('%M3')).toEqual('Mar');
  });
  it('new acte.Jour().gregorien(\'%Ma\') = Mois en abrégé.', function () {
    expect(new acte.Jour('1/4/1600').gregorien('%Ma')).toEqual('Avr');
  });
  it('new acte.Jour().gregorien(\'%JS1\') = Jour de la Semaine en lettres ' + 'sur 1 caractère.', function () {
    expect(new acte.Jour('10/1/1600').gregorien('%JS1')).toEqual('L');
  });
  it('new acte.Jour().gregorien(\'%JS2\') = Jour de la Semaine en lettres ' + 'sur 2 caractère.', function () {
    expect(new acte.Jour('11/1/1600').gregorien('%JS2')).toEqual('Ma');
  });
  it('new acte.Jour().gregorien(\'%JS3\') = Jour de la Semaine en lettres ' + 'sur 3 caractère.', function () {
    expect(new acte.Jour('12/1/1600').gregorien('%JS3')).toEqual('Mer');
  });
  it('new acte.Jour().gregorien(\'%JSa\') = Jour de la Semaine en abrégé.', function () {
    expect(new acte.Jour('13/1/1600').gregorien('%JSa')).toEqual('Jeudi');
  });
  it('new acte.Jour().gregorien(\'%Ml\') = Mois en lettres.', function () {
    expect(new acte.Jour('1/5/1600').gregorien('%Ml')).toEqual('Mai');
  });
  it('new acte.Jour().gregorien(\'%Mlb\') = Mois en minuscules.', function () {
    expect(new acte.Jour('1/6/1600').gregorien('%Mlb')).toEqual('juin');
  });
  it('new acte.Jour().gregorien(\'%Mlm\') = Mois en majuscules.', function () {
    expect(new acte.Jour('1/7/1600').gregorien('%Mlm')).toEqual('JUILLET');
  });
  it('new acte.Jour().gregorien(\'%Mlc\') = Mois en capitales.', function () {
    expect(new acte.Jour('1/8/1600').gregorien('%Mlc')).toEqual('AOÛT');
  });
  it('new acte.Jour().gregorien(\'%Mz\') = Mois sur 2 chiffres.', function () {
    expect(new acte.Jour('1/9/1600').gregorien('%Mz')).toEqual('09');
    expect(new acte.Jour('1/10/1600').gregorien('%Mz')).toEqual('10');
  });
  it('new acte.Jour().gregorien(\'%Mo\') = Mois en nombres ordinaux.', function () {
    expect(new acte.Jour('1/10/1628').gregorien('%Mo')).toEqual('10e');
  });
  it('new acte.Jour().gregorien(\'%Jlo\') = Jour en nombres ordinaux' + ' en lettres.', function () {
    expect(new acte.Jour('1/11/1628').gregorien('%Jlo')).toEqual('Premier');
    expect(new acte.Jour('1/11/1628').gregorien('%Jlof')).toEqual('Première');
    expect(new acte.Jour('2/11/1628').gregorien('%Jlo')).toEqual('Deuxième');
    expect(new acte.Jour('3/11/1628').gregorien('%Jlo')).toEqual('Troisième');
    expect(new acte.Jour('4/11/1628').gregorien('%Jlo')).toEqual('Quatrième');
    expect(new acte.Jour('5/11/1628').gregorien('%Jlo')).toEqual('Cinquième');
    expect(new acte.Jour('7/11/1628').gregorien('%Jlo')).toEqual('Septième');
    expect(new acte.Jour('9/11/1628').gregorien('%Jlo')).toEqual('Neuvième');
    expect(new acte.Jour('21/11/1628').gregorien('%Jlo')).toEqual('Vingt-et-unième');
    expect(new acte.Jour('21/11/1628').gregorien('%Jvo')).toEqual('Vingt et unième');
  });
  it('new acte.Jour().gregorien(\'%Alo\') = Année en nombres ordinaux' + ' en lettres.', function () {
    expect(new acte.Jour('22/11/1300', false).gregorien('%Alo')).toEqual('Mille-trois-centième');
    expect(new acte.Jour('23/11/1680').gregorien('%Alo')).toEqual('Mille-six-cent-quatre-vingtième');
    expect(new acte.Jour('24/11/0', false).gregorien('%Alo')).toEqual('Zéroième');
  });
  it('new acte.Jour().gregorien(\'%Al\') = Année en lettres (réforme de 1990).', function () {
    expect(new acte.Jour('1/9/1629').gregorien('%Al')).toEqual('Mille-six-cent-vingt-neuf');
    expect(new acte.Jour('1/9/-1629', false).gregorien('%Al')).toEqual('Moins mille-six-cent-vingt-neuf');
    expect(new acte.Jour('1/9/16290').gregorien('%Al')).toEqual('Pas de correspondances.');
    expect(new acte.Jour('1/9/16290', false).gregorien('%Al')).toEqual('Pas de correspondances.');
    expect(new acte.Jour('1/9/-16290', false).gregorien('%Al')).toEqual('Pas de correspondances.');
    expect(new acte.Jour('1/9/5100').gregorien('%Al')).toEqual('Cinq-mille-cent');
    expect(new acte.Jour('1/9/5110').gregorien('%Al')).toEqual('Cinq-mille-cent-dix');
    expect(new acte.Jour('1/9/5111').gregorien('%Al')).toEqual('Cinq-mille-cent-onze');
    expect(new acte.Jour('1/9/5112').gregorien('%Al')).toEqual('Cinq-mille-cent-douze');
    expect(new acte.Jour('1/9/5170').gregorien('%Al')).toEqual('Cinq-mille-cent-soixante-dix');
    expect(new acte.Jour('1/9/5171').gregorien('%Al')).toEqual('Cinq-mille-cent-soixante-et-onze');
    expect(new acte.Jour('1/9/5172').gregorien('%Al')).toEqual('Cinq-mille-cent-soixante-douze');
    expect(new acte.Jour('1/9/5190').gregorien('%Al')).toEqual('Cinq-mille-cent-quatre-vingt-dix');
    expect(new acte.Jour('1/9/5191').gregorien('%Al')).toEqual('Cinq-mille-cent-quatre-vingt-onze');
    expect(new acte.Jour('1/9/5192').gregorien('%Al')).toEqual('Cinq-mille-cent-quatre-vingt-douze');
    expect(new acte.Jour('1/9/5192').gregorien('%Arl')).toEqual('Cinq-mille-cent-quatre-vingt-douze');
  });
  it('new acte.Jour().gregorien(\'%JSl\') = Jour de la semaine en lettres.', function () {
    expect(new acte.Jour('1/9/5192').gregorien('%JSl')).toEqual('Mardi');
  });
  it('new acte.Jour().gregorien(\'%Av\') = Année en lettres (vieille notation).', function () {
    expect(new acte.Jour('1/9/1631').gregorien('%Av')).toEqual('Mille six cent trente et un');
    expect(new acte.Jour('1/9/1631').gregorien('%Arv')).toEqual('Mille six cent trente et un');
  });
  it('new acte.Jour().gregorien(\'%Ar\') = Année en chiffres romains.', function () {
    expect(new acte.Jour('1/9/1628').gregorien('%Ar')).toEqual('MDCXXVIII');
    expect(new acte.Jour('1/9/-1628', false).gregorien('%Ar')).toEqual('-MDCXXVIII');
    expect(new acte.Jour('1/9/1629').gregorien('%Arz')).toEqual('MDCXXIX');
  });
  it('new acte.Jour().gregorien(\'%JAp\') = Jour de l\'année en nombre ordinal', function () {
    expect(new acte.Jour('1/1/1604').gregorien('%JAp')).toEqual('1er');
  });
  it('new acte.Jour().gregorien(\'%SAf\') = Semaine de l\'année en nombre' + ' ordinal.', function () {
    expect(new acte.Jour('6/1/1605').gregorien('%SAf')).toEqual('1re');
    expect(new acte.Jour('6/1/1605').gregorien('%SAof')).toEqual('1re');
  });
  it('new acte.Jour().gregorien(\'%JAlp\') = Jour de l\'année en nombre' + ' ordinal en lettres.', function () {
    expect(new acte.Jour('1/1/1604').gregorien('%JAlp')).toEqual('Premier');
    expect(new acte.Jour('2/1/1604').gregorien('%JAlp')).toEqual('Deux');
  });
  it('new acte.Jour().gregorien(\'%SAlf\') = Semaine de l\'année en nombre' + ' ordinal en lettres.', function () {
    expect(new acte.Jour('6/1/1605').gregorien('%SAlf')).toEqual('Première');
  });

  // Erreurs
  it('new acte.Jour().gregorien() = Pas de correspondances.', function () {
    expect(new acte.Jour('').gregorien()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('1er 1890').gregorien()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('4/10/1582').gregorien('%JSl %JM %Mlb %A')).toEqual('Pas de correspondances.');
    expect(new acte.Jour(new Date('texte')).gregorien()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('texte').gregorien()).toEqual('Pas de correspondances.');
  });
  it('new acte.Jour().gregorien(0, \'erreur\') = Message d\'erreur.', function () {
    expect(new acte.Jour('').gregorien(0, 'Message d\'erreur 1.')).toEqual('Message d\'erreur 1.');
    expect(new acte.Jour('').gregorien('', 'Message d\'erreur 2.')).toEqual('Message d\'erreur 2.');
    expect(new acte.Jour('').gregorien(false, 'Message d\'erreur 3.')).toEqual('Message d\'erreur 3.');
  });

  // Callback functions
  it('new acte.Jour().gregorien(0, 0, ((res, obj) => {})) ' + '= Fonction de rappel.', function () {
    expect(new acte.Jour('1 février 1603').gregorien(0, 0, function (res, obj) {
      var jour = obj.J < 10 ? '0' + obj.J : obj.J;
      var mois = obj.M < 10 ? '0' + obj.M : obj.M;
      var an = obj.A % 100 < 10 ? '0' + obj.A % 100 : obj.A % 100;

      return jour + '/' + mois + '/' + an;
    })).toEqual('01/02/03');
    expect(new acte.Jour('2 mars 1604').gregorien(0, 0, function (res, obj) {
      var zero = function zero(x) {
        var resultat = x < 10 ? '0' + x : x;

        return resultat;
      };

      return zero(obj.J) + '/' + zero(obj.M) + '/' + zero(obj.A % 100);
    })).toEqual('02/03/04');
    expect(new acte.Jour('3 avril 1605').gregorien('%Jz/%Mz', 0, function (res, obj) {
      var an = obj.A % 100 < 10 ? '0' + obj.A % 100 : obj.A % 100;

      return res + '/' + an;
    })).toEqual('03/04/05');
  });
});

describe('new acte.Jour().julien()', function () {
  // Valeurs par défaut
  it('new acte.Jour().julien() = la date julienne ' + 'formatée par défaut.', function () {
    expect(new acte.Jour('1/12/630').julien()).toEqual('1er décembre 630');
    expect(new acte.Jour('3/10/1582').julien('%JSl %JM %Mlb %A')).toEqual('Mercredi 3 octobre 1582');
    expect(new acte.Jour('4/10/1582').julien('%JSl %JM %Mlb %A')).toEqual('Jeudi 4 octobre 1582');
    expect(new acte.Jour('5/10/1582').julien('%JSl %JM %Mlb %A')).toEqual('Vendredi 5 octobre 1582');
    expect(new acte.Jour('14/10/1582').julien('%JSl %JM %Mlb %A')).toEqual('Dimanche 14 octobre 1582');
    expect(new acte.Jour('15/10/1582').julien('%JSl %JM %Mlb %A')).toEqual('Pas de correspondances.');
    expect(new acte.Jour('15/10/1582', false).julien('%JSl %JM %Mlb %A')).toEqual('Vendredi 5 octobre 1582');
    expect(new acte.Jour('17 frimaire an IV', false).julien()).toEqual('27 novembre 1795');

    // Gestion des années bissextiles
    expect(new acte.Jour('29 février 1004').julien()).toEqual('29 février 1004');
    expect(new acte.Jour('29 février 900').julien()).toEqual('29 février 900');
    expect(new acte.Jour('29 février 1000').julien()).toEqual('29 février 1000');
    expect(new acte.Jour('29 février 1004', false).julien()).toEqual('23 février 1004');
    expect(new acte.Jour('29 février 900', false).julien()).toEqual('25 février 900');
    expect(new acte.Jour('29 février 1000', false).julien()).toEqual('24 février 1000');
  });

  // Balises
  it('new acte.Jour().julien(\'%A\') = l\'Année julienne.', function () {
    expect(new acte.Jour('1/1/601').julien('%A')).toEqual('601');
  });
  it('new acte.Jour().julien(\'%AN\') = l\'Année julienne.', function () {
    expect(new acte.Jour('1/1/602').julien('%AN')).toEqual('602');
  });
  it('new acte.Jour().julien(\'%D\') = la Semaine/Décade dans le mois.', function () {
    expect(new acte.Jour('14/1/600').julien('%D')).toEqual('3');
  });
  it('new acte.Jour().julien(\'%DM\') = la Semaine/Décade dans le mois.', function () {
    expect(new acte.Jour('21/1/600').julien('%DM')).toEqual('4');
  });
  it('new acte.Jour().julien(\'%SM\') = la Semaine/Décade dans le mois.', function () {
    expect(new acte.Jour('28/1/600').julien('%SM')).toEqual('5');
  });
  it('new acte.Jour().julien(\'%J\') = le Jour dans le mois.', function () {
    expect(new acte.Jour('26/1/600').julien('%J')).toEqual('26');
  });
  it('new acte.Jour().julien(\'%JM\') = le Jour dans le mois.', function () {
    expect(new acte.Jour('27/1/600').julien('%JM')).toEqual('27');
  });
  it('new acte.Jour().julien(\'%JA\') = le Jour dans l\'année.', function () {
    expect(new acte.Jour('23/8/600').julien('%JA')).toEqual('235');
  });
  it('new acte.Jour().julien(\'%JS\') = le Jour de la décade/Semaine.', function () {
    expect(new acte.Jour('7/1/600').julien('%JS')).toEqual('5');
  });
  it('new acte.Jour().julien(\'%JD\') = le Jour de la décade/Semaine.', function () {
    expect(new acte.Jour('8/1/600').julien('%JD')).toEqual('6');
  });
  it('new acte.Jour().julien(\'%M\') = le Mois dans l\'année.', function () {
    expect(new acte.Jour('1/9/600').julien('%M')).toEqual('9');
  });
  it('new acte.Jour().julien(\'%MA\') = le Mois dans l\'année.', function () {
    expect(new acte.Jour('1/10/600').julien('%MA')).toEqual('10');
  });
  it('new acte.Jour().julien(\'%S\') = la Semaine/Décade dans l\'année.', function () {
    expect(new acte.Jour('1/4/600').julien('%S')).toEqual('14');
  });
  it('new acte.Jour().julien(\'%SA\') = la Semaine/Décade dans l\'année.', function () {
    expect(new acte.Jour('1/5/600').julien('%SA')).toEqual('18');
  });
  it('new acte.Jour().julien(\'%DA\') = la Semaine/Décade dans l\'année.', function () {
    expect(new acte.Jour('1/6/600').julien('%DA')).toEqual('22');
  });

  // Filtres
  it('new acte.Jour().julien(\'%M1\') = Mois en lettres sur 1 caractère.', function () {
    expect(new acte.Jour('1/1/600').julien('%M1')).toEqual('J');
  });
  it('new acte.Jour().julien(\'%M2\') = Mois en lettres sur 2 caractère.', function () {
    expect(new acte.Jour('1/2/600').julien('%M2')).toEqual('Fr');
  });
  it('new acte.Jour().julien(\'%M3\') = Mois en lettres sur 3 caractère.', function () {
    expect(new acte.Jour('1/3/600').julien('%M3')).toEqual('Mar');
  });
  it('new acte.Jour().julien(\'%Ma\') = Mois en abrégé.', function () {
    expect(new acte.Jour('1/4/600').julien('%Ma')).toEqual('Avr');
  });
  it('new acte.Jour().julien(\'%Ml\') = Mois en lettres.', function () {
    expect(new acte.Jour('1/5/600').julien('%Ml')).toEqual('Mai');
  });
  it('new acte.Jour().julien(\'%JS1\') = Jour de la Semaine en lettres ' + 'sur 1 caractère.', function () {
    expect(new acte.Jour('10/1/600').julien('%JS1')).toEqual('L');
  });
  it('new acte.Jour().julien(\'%JS2\') = Jour de la Semaine en lettres ' + 'sur 2 caractère.', function () {
    expect(new acte.Jour('11/1/600').julien('%JS2')).toEqual('Ma');
  });
  it('new acte.Jour().julien(\'%JS3\') = Jour de la Semaine en lettres ' + 'sur 3 caractère.', function () {
    expect(new acte.Jour('12/1/600').julien('%JS3')).toEqual('Mer');
  });
  it('new acte.Jour().julien(\'%JSa\') = Jour de la Semaine en abrégé.', function () {
    expect(new acte.Jour('13/1/600').julien('%JSa')).toEqual('Jeudi');
  });
  it('new acte.Jour().julien(\'%JSl\') = Jour de la semaine en lettres.', function () {
    expect(new acte.Jour('1/9/5192').julien('%JSl')).toEqual('Pas de correspondances.');
  });

  // Erreurs
  it('new acte.Jour().julien() = Pas de correspondances.', function () {
    expect(new acte.Jour('').julien()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('1/1/16000').julien('%A')).toEqual('Pas de correspondances.');
    expect(new acte.Jour('1/1/-16000').julien('%A')).toEqual('Pas de correspondances.');
    expect(new acte.Jour('1/1/16000', false).julien('%A')).toEqual('Pas de correspondances.');
    expect(new acte.Jour('17 frimaire an IV').julien()).toEqual('Pas de correspondances.');
  });
  it('new acte.Jour().julien(0, \'erreur\') = Message d\'erreur.', function () {
    expect(new acte.Jour('').julien('', 'Message d\'erreur.')).toEqual('Message d\'erreur.');
  });

  // Callback functions
  it('new acte.Jour().julien(0, 0, ((res, obj) => {})) ' + '= Fonction de rappel.', function () {
    expect(new acte.Jour('3 avril 605').julien('%Jz/%Mz', 0, function (res, obj) {
      var an = obj.A % 100 < 10 ? '0' + obj.A % 100 : obj.A % 100;

      return res + '/' + an;
    })).toEqual('03/04/05');
  });
});

describe('new acte.Jour().republicain()', function () {
  // Valeurs par défaut
  it('new acte.Jour().republicain() = la date republicaine ' + 'formatée par défaut.', function () {
    expect(new acte.Jour('1/1/1800').republicain()).toEqual('11 nivôse an VIII');
    expect(new acte.Jour('12 nivôse an VIII').republicain()).toEqual('12 nivôse an VIII');
    expect(new acte.Jour('30 fructidor an V').republicain()).toEqual('30 fructidor an V');
    expect(new acte.Jour('an 9').republicain()).toEqual('1er vendémiaire an IX');
    expect(new acte.Jour('an X').republicain()).toEqual('1er vendémiaire an X');
    expect(new acte.Jour('brumaire an X', false).republicain()).toEqual('1er brumaire an X');
    expect(new acte.Jour('1er brumaire an 7999', false).republicain()).toEqual('1er brumaire an MMMMMMMCMXCIX');
  });

  // Balises
  it('new acte.Jour().republicain(\'%A\') = l\'Année republicaine.', function () {
    expect(new acte.Jour('1/1/1800').republicain('%A')).toEqual('8');
  });
  it('new acte.Jour().republicain(\'%AN\') = l\'Année republicaine.', function () {
    expect(new acte.Jour('1/1/1801').republicain('%AN')).toEqual('9');
  });
  it('new acte.Jour().republicain(\'%D\') = la Semaine/Décade dans le mois.', function () {
    expect(new acte.Jour('14/1/1800').republicain('%D')).toEqual('3');
  });
  it('new acte.Jour().republicain(\'%DM\') = la Semaine/Décade dans le mois.', function () {
    expect(new acte.Jour('21/1/1800').republicain('%DM')).toEqual('1');
  });
  it('new acte.Jour().republicain(\'%SM\') = la Semaine/Décade dans le mois.', function () {
    expect(new acte.Jour('12/2/1800').republicain('%SM')).toEqual('3');
  });
  it('new acte.Jour().republicain(\'%J\') = le Jour dans le mois.', function () {
    expect(new acte.Jour('26/1/1800').republicain('%J')).toEqual('6');
  });
  it('new acte.Jour().republicain(\'%JM\') = le Jour dans le mois.', function () {
    expect(new acte.Jour('27/1/1800').republicain('%JM')).toEqual('7');
  });
  it('new acte.Jour().republicain(\'%JA\') = le Jour dans l\'année.', function () {
    expect(new acte.Jour('23/8/1800').republicain('%JA')).toEqual('335');
  });
  it('new acte.Jour().republicain(\'%JS\') = le Jour de la décade/Semaine.', function () {
    expect(new acte.Jour('7/1/1800').republicain('%JS')).toEqual('7');
  });
  it('new acte.Jour().republicain(\'%JD\') = le Jour de la décade/Semaine.', function () {
    expect(new acte.Jour('8/1/1800').republicain('%JD')).toEqual('8');
  });
  it('new acte.Jour().republicain(\'%M\') = le Mois dans l\'année.', function () {
    expect(new acte.Jour('1/9/1800').republicain('%M')).toEqual('12');
  });
  it('new acte.Jour().republicain(\'%MA\') = le Mois dans l\'année.', function () {
    expect(new acte.Jour('1/10/1800').republicain('%MA')).toEqual('1');
  });
  it('new acte.Jour().republicain(\'%S\') = la Semaine/Décade dans l\'année.', function () {
    expect(new acte.Jour('1/4/1800').republicain('%S')).toEqual('20');
  });
  it('new acte.Jour().republicain(\'%SA\') = la Semaine/Décade dans l\'année.', function () {
    expect(new acte.Jour('1/5/1800').republicain('%SA')).toEqual('23');
  });
  it('new acte.Jour().republicain(\'%DA\') = la Semaine/Décade dans l\'année.', function () {
    expect(new acte.Jour('1/6/1800').republicain('%DA')).toEqual('26');
  });

  // Filtres
  it('new acte.Jour().republicain(\'%M1\') = Mois en lettres sur 1 caractère.', function () {
    expect(new acte.Jour('1/1/1800').republicain('%M1')).toEqual('N');
  });
  it('new acte.Jour().republicain(\'%M2\') = Mois en lettres sur 2 caractère.', function () {
    expect(new acte.Jour('1/2/1800').republicain('%M2')).toEqual('Pl');
  });
  it('new acte.Jour().republicain(\'%M3\') = Mois en lettres sur 3 caractère.', function () {
    expect(new acte.Jour('1/3/1800').republicain('%M3')).toEqual('Vnt');
  });
  it('new acte.Jour().republicain(\'%Ma\') = Mois en abrégé.', function () {
    expect(new acte.Jour('1/4/1800').republicain('%Ma')).toEqual('Germ');
  });
  it('new acte.Jour().republicain(\'%Ml\') = Mois en lettres.', function () {
    expect(new acte.Jour('1/5/1800').republicain('%Ml')).toEqual('Floréal');
  });
  it('new acte.Jour().republicain(\'%JS1\') = Jour de la Semaine en lettres ' + 'sur 1 caractère.', function () {
    expect(new acte.Jour('10/1/1800').republicain('%JS1')).toEqual('D');
  });
  it('new acte.Jour().republicain(\'%JS2\') = Jour de la Semaine en lettres ' + 'sur 2 caractère.', function () {
    expect(new acte.Jour('11/1/1800').republicain('%JS2')).toEqual('Pi');
  });
  it('new acte.Jour().republicain(\'%JS3\') = Jour de la Semaine en lettres ' + 'sur 3 caractère.', function () {
    expect(new acte.Jour('12/1/1800').republicain('%JS3')).toEqual('Duo');
  });
  it('new acte.Jour().republicain(\'%JSa\') = Jour de la Semaine en abrégé.', function () {
    expect(new acte.Jour('13/1/1800').republicain('%JSa')).toEqual('Tri');
  });
  it('new acte.Jour().republicain(\'%JSl\') = Jour de la semaine en lettres.', function () {
    expect(new acte.Jour('1/9/1800').republicain('%JSl')).toEqual('Quartidi');
  });

  // Erreurs
  it('new acte.Jour().republicain() = Pas de correspondances.', function () {
    expect(new acte.Jour('').republicain()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('brumaire an 11000').republicain()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('brumaire an 11000', false).republicain()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('brumaire an -11000', false).republicain()).toEqual('Pas de correspondances.');
    expect(new acte.Jour('1er brumaire an 8000', false).republicain()).toEqual('Pas de correspondances.');
  });
  it('new acte.Jour().republicain(0, \'erreur\') = Message d\'erreur.', function () {
    expect(new acte.Jour('').republicain('', 'Message d\'erreur.')).toEqual('Message d\'erreur.');
  });

  // Callback functions
  it('new acte.Jour().republicain(0, 0, ((res, obj) => {})) ' + '= Fonction de rappel.', function () {
    expect(new acte.Jour('3 avril 1805').republicain('%Jz/%Mz', 0, function (res, obj) {
      var an = obj.A % 100 < 10 ? '0' + obj.A % 100 : obj.A % 100;

      return res + '/' + an;
    })).toEqual('13/07/13');
  });
});

describe('Recettes', function () {
  it('Recette 1 : Afficher l\'année sur 2 chiffres', function () {
    expect(new acte.Jour('3 avril 1605').gregorien('%Jz/%Mz', 0, function (res, obj) {
      var result = res + '/' + acte.prefixeZero(obj.A % 100);

      return result;
    })).toEqual('03/04/05');
  });
  it('Recette 2 : Afficher le siècle', function () {
    expect(new acte.Jour('8 décembre 2016').gregorien('', 0, function (res, obj) {
      var result = '' + acte.nombreOrdinal(acte.arabeVersRomain(parseInt(obj.A / 100, 10) + 1), 'er', 'e');

      return result + ' si\xE8cle';
    })).toEqual('XXIe siècle');
  });
  it('Recette 3 : Afficher Mil plutôt que Mille', function () {
    expect(new acte.Jour('28/7/1910').gregorien('%Jl %Mlb de l\'an %Avb', 0, function (res, obj) {
      var result = res.replace(/(M|m)(ille)(\s|-|$)/gm, '$1il$3');

      return result;
    })).toEqual('Vingt-huit juillet de l\'an mil neuf cent dix');
  });
  it('Recette 4 : Date complète hebdomadaire ISO', function () {
    expect(new acte.Jour('1/1/2006').gregorien('', 0, function (res, obj) {
      var jour = obj.JS === 0 ? 7 : obj.JS;

      var _ref = obj.S === 0 ? [52, obj.A - 1] : [acte.prefixeZero(obj.S), obj.A];

      var _ref2 = _slicedToArray(_ref, 2);

      var semaine = _ref2[0];
      var an = _ref2[1];


      return an + '-W' + semaine + '-' + jour;
    })).toEqual('2005-W52-7');
  });
  it('Recette 5 : Saints du jour', function () {
    expect(new acte.Jour('1/9/2016')

    // voir acte.saintChretien en fin de ce fichier
    .gregorien('{saintChretien}', 0, acte.saintChretien)).toEqual('Saint Gilles');
  });
  it('Recette 6 : Jour républicain', function () {
    expect(new acte.Jour('4 brumaire an V')

    // voir acte.jourRepublicain en fin de ce fichier
    .republicain('Jour {jourRepublicain}', 0, acte.jourRepublicain)).toEqual('Jour de la Betterave');
  });
});

/**
 * Nouvelles fonctions
 */

acte.saintChretien = function (res, obj) {
  var saints = [['Sainte Marie', 'Saint Basile', 'Sainte Geneviève', 'Saint Odilon', 'Saint Edouard', 'Saint Mélaine', 'Saint Raymond', 'Saint Lucien', 'Sainte Alix', 'Saint Guillaume', 'Saint Paulin', 'Sainte Tatiana', 'Sainte Yvette', 'Sainte Nina', 'Saint Rémi', 'Saint Marcel', 'Sainte Roseline', 'Sainte Prisca', 'Saint Marius', 'Saint Sébastien', 'Sainte Agnès', 'Saint Vincent', 'Saint Barnard', 'Saint François de Sales', 'Saint Ananie', 'Sainte Paule', 'Sainte Angèle', 'Saint Thomas d\'Aquin', 'Saint Gildas', 'Sainte Martine', 'Sainte Marcelle'], ['Sainte Ella', 'Présentation', 'Saint Blaise', 'Sainte Véronique', 'Sainte Agathe', 'Saint Gaston', 'Sainte Eugènie', 'Sainte Jacqueline', 'Sainte Apolline', 'Saint Arnaud', 'Notre Dame de Lourdes', 'Saint Félix', 'Sainte Béatrice', 'Saint Valentin', 'Saint Claude', 'Sainte Julienne', 'Saint Alexis', 'Sainte Bernadette', 'Saint Gabin', 'Sainte Aimée', 'Saint Pierre-Damien', 'Sainte Isabelle', 'Saint Lazare', 'Saint Modeste', 'Saint Roméo', 'Saint Nestor', 'Sainte Honorine', 'Saint Romain', 'Saint Auguste'], ['Saint Aubin', 'Saint Charles le Bon', 'Saint Guénolé', 'Saint Casimir', 'Sainte Olive', 'Sainte Colette', 'Sainte Félicité', 'Saint Jean de Dieu', 'Sainte Françoise', 'Saint Vivien', 'Sainte Rosine', 'Sainte Justine', 'Saint Rodrigue', 'Sainte Mathilde', 'Sainte Louise', 'Sainte Bénédicte', 'Saint Patrick', 'Saint Cyrille', 'Saint Joseph', 'Saint Herbert', 'Sainte Clémence', 'Sainte Léa', 'Saint Victorien', 'Sainte Catherine de Suède', 'Annonciation', 'Sainte Larissa', 'Saint Habib', 'Saint Gontran', 'Sainte Gwladys', 'Saint Amédée', 'Saint Benjamin'], ['Saint Hugues', 'Sainte Sandrine', 'Saint Richard', 'Saint Isidore', 'Sainte Irène', 'Saint Marcellin', 'Saint Jean-Baptiste de la Salle', 'Sainte Julie', 'Saint Gautier', 'Saint Fulbert', 'Saint Stanislas', 'Saint Jules', 'Sainte Ida', 'Saint Maxime', 'Saint Paterne', 'Saint Benoît-Joseph', 'Saint Anicet', 'Saint Parfait', 'Sainte Emma', 'Sainte Odette', 'Saint Anselme', 'Saint Alexandre', 'Saint Georges', 'Saint Fidèle', 'Saint Marc', 'Sainte Alida', 'Sainte Zita', 'Sainte Valérie', 'Sainte Catherine de Sienne', 'Saint Robert'], ['Saint Jérémie', 'Saint Boris', 'Saints Philippe, Jacques', 'Saint Sylvain', 'Sainte Judith', 'Sainte Prudence', 'Sainte Gisèle', 'Saint Désiré', 'Saint Pacôme', 'Sainte Solange', 'Sainte Estelle / Saint Mamert', 'Saint Achille / Saint Pancrace', 'Sainte Rolande / Saint Servais', 'Saint Matthias', 'Sainte Denise', 'Saint Honoré', 'Saint Pascal', 'Saint Éric', 'Saint Yves', 'Saint Bernardin', 'Saint Constantin', 'Saint Émile', 'Saint Didier', 'Saint Donatien', 'Sainte Sophie', 'Saint Béranger', 'Saint Augustin', 'Saint Germain', 'Saint Aymard', 'Saint Ferdinand', 'Visitation de la Sainte Vierge'], ['Saint Justin', 'Sainte Blandine', 'Saint Kévin', 'Sainte Clotilde', 'Saint Igor', 'Saint Norbert', 'Saint Gilbert', 'Saint Médard', 'Sainte Diane', 'Saint Landry', 'Saint Barnabé', 'Saint Guy', 'Saint Antoine de Padoue', 'Saint Elisée', 'Sainte Germaine', 'Saint Jean-François Régis', 'Saint Hervé', 'Saint Léonce', 'Saint Romuald', 'Saint Silvère', 'Saint Louis de Gonzague', 'Saint Alban', 'Sainte Audrey', 'Saint Jean-Baptiste', 'Saint Prosper', 'Saint Anthelme', 'Saint Fernand', 'Sainte Irénée', 'Saints Pierre, Paul', 'Saint Martial'], ['Saint Thierry', 'Saint Martinien', 'Saint Thomas', 'Saint Florent', 'Saint Antoine', 'Sainte Mariette', 'Saint Raoul', 'Saint Thibault', 'Sainte Amandine', 'Saint Ulrich', 'Saint Benoît', 'Saint Olivier', 'Saints Henri, Joël', 'Saint Camille', 'Saint Donald', 'Notre Dame du Mont Carmel', 'Sainte Charlotte', 'Saint Frédéric', 'Saint Arsène', 'Sainte Marina', 'Saint Victor', 'Sainte Marie-Madeleine', 'Sainte Brigitte', 'Sainte Christine', 'Saint Jacques', 'Saints Anne, Joachin', 'Sainte Nathalie', 'Saint Samson', 'Sainte Marthe', 'Sainte Juliette', 'Saint Ignace de Loyola'], ['Saint Alphonse', 'Saint Julien Eymard', 'Sainte Lydie', 'Saint Jean-Marie Vianney', 'Saint Abel', 'Transfiguration', 'Saint Gaétan', 'Saint Dominique', 'Saint Amour', 'Saint Laurent', 'Sainte Claire', 'Sainte Clarisse', 'Saint Hippolyte', 'Saint Evrard', 'Assomption', 'Saint Armel', 'Saint Hyacinthe', 'Sainte Hélène', 'Saint Jean-Eudes', 'Saint Bernard', 'Saint Christophe', 'Saint Fabrice', 'Sainte Rose de Lima', 'Saint Barthélémy', 'Saint Louis', 'Sainte Natacha', 'Saint Monique', 'Saint Augustin', 'Sainte Sabine', 'Saint Fiacre', 'Saint Aristide'], ['Saint Gilles', 'Sainte Ingrid', 'Saint Grégoire', 'Sainte Rosalie', 'Sainte Raïssa', 'Saint Bertrand', 'Sainte Reine', 'Saint Nativité', 'Saint Alain', 'Sainte Inès', 'Saint Adelphe', 'Saint Apollinaire', 'Saint Aimé', 'La Sainte-Croix', 'Saint Roland', 'Sainte Edith', 'Saint Renaud', 'Sainte Nadège', 'Sainte Émilie', 'Saint Davy', 'Saint Matthieu', 'Saint Maurice', 'Saint Constant', 'Sainte Thècle', 'Saint Hermann', 'Saints Côme, Damien', 'Saint Vincent de Paul', 'Saint Venceslas', 'Saints Michel, Gabriel, Raphaël', 'Saint Jérôme'], ['Sainte Thérèse de l\'Enfant Jésus', 'Saint Léger', 'Saint Gérard', 'Saint François d\'Assise', 'Sainte Fleur', 'Saint Bruno', 'Saint Serge', 'Sainte Pélagie', 'Saint Denis', 'Saint Ghislain', 'Saint Firmin', 'Saint Wilfried', 'Saint Géraud', 'Saint Juste', 'Sainte Thérèse d\'Avila', 'Sainte Edwige', 'Saint Baudoin', 'Saint Luc', 'Saint René', 'Sainte Adeline', 'Sainte Céline', 'Sainte Élodie', 'Saint Jean de Capistran', 'Saint Florentin', 'Saint Crépin', 'Saint Dimitri', 'Sainte Émeline', 'Saints Simon, Jude', 'Saint Narcisse', 'Saint Bienvenu', 'Saint Quentin'], ['Toussaint', 'Jour des défunts', 'Saint Hubert', 'Saint Charles', 'Sainte Sylvie', 'Sainte Bertille', 'Sainte Carine', 'Saint Geoffroy', 'Saint Théodore', 'Saint Léon', 'Saint Martin', 'Saint Christian', 'Saint Brice', 'Saint Sidoine', 'Saint Albert', 'Sainte Marguerite', 'Sainte Élisabeth', 'Sainte Aude', 'Saint Tanguy', 'Saint Edmond', 'Saint Rufus', 'Sainte Cécile', 'Saint Clément', 'Sainte Flore', 'Sainte Catherine', 'Sainte Delphine', 'Saint Sévrin', 'Saint Jacques de la Marche', 'Saint Saturnin', 'Saint André'], ['Sainte Florence', 'Sainte Viviane', 'Saint François-Xavier', 'Sainte Barbara', 'Saint Gérald', 'Saint Nicolas', 'Saint Ambroise', 'Immaculée Conception', 'Saint Pierre Fourier', 'Saint Romaric', 'Saint Daniel', 'Sainte Jeanne-Françoise de Chantal', 'Sainte Lucie', 'Sainte Odile', 'Sainte Ninon', 'Sainte Alice', 'Saint Gaël', 'Saint Gatien', 'Saint Urbain', 'Saint Théophile', 'Saint Pierre', 'Sainte Françoise-Xavière', 'Saint Armand', 'Sainte Adèle', 'Nativité du Christ', 'Saint Etienne', 'Saint Jean l\'évangile', 'Saints Innocents', 'Saint David', 'Saint Roger', 'Saint Sylvestre / Sainte Famille']];

  return res.replace(/{saintChretien}/g, saints[obj.M - 1][obj.J - 1]);
};
acte.jourRepublicain = function (res, obj) {
  var jours = [['du Raisin', 'du Safran', 'de la Châtaigne', 'de la Colchique', 'du Cheval', 'de la Balsamine', 'de la Carotte', 'de l\'Amarante', 'du Panais', 'de la Cuve', 'de la Pomme de terre', 'de l\'Immortelle', 'du Potiron', 'du Réséda', 'de l\'Âne', 'de la Belle de nuit', 'de la Citrouille', 'du Sarrasin', 'du Tournesol', 'du Pressoir', 'du Chanvre', 'de la Pêche', 'du Navet', 'de l\'Amaryllis', 'du Bœuf', 'de l\'Aubergine', 'du Piment', 'de la Tomate', 'de l\'Orge', 'du Tonneau'], ['de la Pomme', 'du Céleri', 'de la Poire', 'de la Betterave', 'de l\'Oie', 'de l\'Héliotrope', 'de la Figue', 'de la Scorsonère', 'de l\'Alisier', 'de la Charrue', 'du Salsifis', 'de la Mâcre', 'du Topinambour', 'de l\'Endive', 'du Dindon', 'du Chervis', 'du Cresson', 'de la Dentelaire', 'de la Grenade', 'de la Herse', 'de la Bacchante', 'de l\'Azerole', 'de la Garance', 'de l\'Orange', 'du Faisan', 'de la Pistache', 'du Macjonc', 'du Coing', 'du Cormier', 'du Rouleau'], ['de la Raiponce', 'du Turneps', 'du Chicorée', 'de la Nèfle', 'du Cochon', 'de la Mâche', 'du Chou-fleur', 'du Miel', 'du Genièvre', 'de la Pioche', 'de la Cire', 'du Raifort', 'du Cèdre', 'du Sapin', 'du Chevreuil', 'de l\'Ajonc', 'du Cyprès', 'du Lierre', 'de la Sabine', 'du Hoyau', 'de l\'Érable sucré', 'de la Bruyère', 'du Roseau', 'de l\'Oseille', 'du Grillon', 'du Pignon', 'du Liège', 'de la Truffe', 'de l\'Olive', 'de la Pelle'], ['de la Tourbe', 'de la Houille', 'du Bitume', 'du Soufre', 'du Chien', 'de la Lave', 'de la Terre végétale', 'du Fumier', 'du Salpêtre', 'du Fléau', 'du Granit', 'de l\'Argile', 'de l\'Ardoise', 'du Grès', 'du Lapin', 'du Silex', 'de la Marne', 'de la Pierre à chaux', 'du Marbre', 'du Van', 'de la Pierre à plâtre', 'du Sel', 'du Fer', 'du Cuivre', 'du Chat', 'de l\'Étain', 'du Plomb', 'du Zinc', 'du Mercure', 'du Crible'], ['de la Lauréole', 'de la Mousse', 'du Fragon', 'du Perce-neige', 'du Taureau', 'du Laurier tin', 'de l\'Amadouvier', 'du Mézéréon', 'du Peuplier', 'de la Cognée', 'de l\'Ellébore', 'du Brocoli', 'du Laurier', 'de l\'Avelinier', 'de la Vache', 'du Buis', 'du Lichen', 'de l\'If', 'de la Pulmonaire', 'de la Serpette', 'du Thlaspi', 'du Thimele', 'du Chiendent', 'de la Trainasse', 'du Lièvre', 'de la Guède', 'du Noisetier', 'du Cyclamen', 'de la Chélidoine', 'du Traîneau'], ['du Tussilage', 'du Cornouiller', 'du Violier', 'du Troène', 'du Bouc', 'de l\'Asaret', 'de l\'Alaterne', 'de la Violette', 'du Marceau', 'de la Bêche', 'de la Narcisse', 'de l\'Orme', 'de la Fumeterre', 'du Vélar', 'de la Chèvre', 'de l\'Épinard', 'du Doronic', 'du Mouron', 'du Cerfeuil', 'du Cordeau', 'de la Mandragore', 'du Persil', 'de la Cochléaria', 'de la Pâquerette', 'du Thon', 'du Pissenlit', 'de la Sylvie', 'de la Capillaire', 'du Frêne', 'du Plantoir'], ['de la Primevère', 'du Platane', 'de l\'Asperge', 'de la Tulipe', 'de la Poule', 'de la Bette', 'du Bouleau', 'de la Jonquille', 'de l\'Aulne', 'du Greffoir', 'de la Pervenche', 'du Charme', 'de la Morille', 'du Hêtre', 'de l\'Abeille', 'de la Laitue', 'du Mélèze', 'de la Ciguë', 'du Radis', 'de la Ruche', 'du Gainier', 'de la Romaine', 'du Marronnier', 'de la Roquette', 'du Pigeon', 'du Lilas (commun)', 'de l\'Anémone', 'de la Pensée', 'de la Myrtille', 'du Couvoir'], ['de la Rose', 'du Chêne', 'de la Fougère', 'de l\'Aubépine', 'du Rossignol', 'de l\'Ancolie', 'du Muguet', 'du Champignon', 'de l\'Hyacinthe', 'du Râteau', 'de la Rhubarbe', 'du Sainfoin', 'du Bâton-d\'or', 'du Chamérisier', 'du Ver à soie', 'de la Consoude', 'de la Pimprenelle', 'de la Corbeille d\'or', 'de l\'Arroche', 'du Sarcloir', 'de la Statice', 'de la Fritillaire', 'de la Bourrache', 'de la Valériane', 'de la Carpe', 'du Fusain', 'de la Civette', 'de la Buglose', 'du Sénevé', 'de la Houlette'], ['de la Luzerne', 'de l\'Hémérocalle', 'du Trèfle', 'de l\'Angélique', 'du Canard', 'de la Mélisse', 'de la Fromental', 'du Lis martagon', 'du Serpolet', 'de la Faux', 'de la Fraise', 'de la Bétoine', 'du Pois', 'de l\'Acacia', 'de la Caille', 'de l\'Œillet', 'du Sureau', 'du Pavot', 'du Tilleul', 'de la Fourche', 'du Barbeau', 'de la Camomille', 'du Chèvrefeuille', 'du Caille-lait', 'de la Tanche', 'du Jasmin', 'de la Verveine', 'du Thym', 'de la Pivoine', 'du Chariot'], ['du Seigle', 'de l\'Avoine', 'de l\'Oignon', 'de la Véronique', 'du Mulet', 'du Romarin', 'du Concombre', 'de l\'Échalote', 'de l\'Absinthe', 'de la Faucille', 'de la Coriandre', 'de l\'Artichaut', 'de la Girofle', 'de la Lavande', 'du Chamois', 'du Tabac', 'de la Groseille', 'de la Gesse', 'de la Cerise', 'du Parc', 'de la Menthe', 'du Cumin', 'du Haricot', 'de l\'Orcanète', 'de la Pintade', 'de la Sauge', 'de l\'Ail', 'de la Vesce', 'du Blé', 'du Chalemie'], ['de l\'Épeautre', 'du Bouillon-blanc', 'du Melon', 'de l\'Ivraie', 'du Bélier', 'de la Prêle', 'de l\'Armoise', 'du Carthame', 'de la Mûre', 'de l\'Arrosoir', 'du Panic', 'de la Salicorne', 'de l\'Abricot', 'du Basilic', 'de la Brebis', 'de la Guimauve', 'du Lin', 'de l\'Amande', 'de la Gentiane', 'de l\'Écluse', 'de la Carline', 'du Câprier', 'de la Lentille', 'de l\'Aunée', 'de la Loutre', 'du Myrte', 'du Colza', 'du Lupin', 'du Coton', 'du Moulin'], ['de la Prune', 'du Millet', 'du Lycoperdon', 'de l\'Escourgeon', 'du Saumon', 'de la Tubéreuse', 'du Sucrion', 'de l\'Apocyn', 'de la Réglisse', 'de l\'Échelle', 'de la Pastèque', 'du Fenouil', 'de l\'Épine vinette', 'de la Noix', 'de la Truite', 'du Citron', 'de la Cardère', 'du Nerprun', 'du Tagette', 'de la Hotte', 'de l\'Églantier', 'de la Noisette', 'du Houblon', 'du Sorgho', 'de l\'Écrevisse', 'de la Bigarade', 'de la Verge d\'or', 'du Maïs', 'du Marron', 'du Panier'], ['de la Vertu', 'du Génie', 'du Travail', 'de l\'Opinion', 'des Récompenses', 'de la Révolution']];

  return res.replace(/{jourRepublicain}/g, jours[obj.M - 1][obj.J - 1]);
};