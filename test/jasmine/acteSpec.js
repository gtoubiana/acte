var acte = require('./lib/acte.js');
'use strict';

var dateValide = function dateValide(jour, mois, an) {
  var resultat = new Date(an, mois - 1, jour);

  resultat.setFullYear(an);
  return resultat;
};

var anActuel = new Date();

// http://jasmine.github.io/edge/introduction.html
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
    expect(new acte.Jour('-12/-10/-1657', false).variables.gregorien.od).toEqual(dateValide(12, 10, -1657));
    expect(new acte.Jour('/2/3', false).variables.gregorien.od).toEqual(dateValide(1, 2, 3));
    expect(new acte.Jour('/3/4/', false).variables.gregorien.od).toEqual(dateValide(1, 3, 4));
    expect(new acte.Jour('4/5/6/', false).variables.gregorien.od).toEqual(dateValide(4, 5, 6));

    // DEBUGGER IE 8.0.0 (Windows 7 0.0.0)
    // Expected Date(Tue Jun 5 00:00:00 UTC 7)
    // to equal Date(Mon May 1 00:00:00 UTC 6).
    expect(new acte.Jour('/5/6/7', false).variables.gregorien.od).toEqual(dateValide(1, 5, 6));

    // DEBUGGER IE 8.0.0 (Windows 7 0.0.0)
    // Expected Date(Sun Jul 6 00:00:00 UTC 8)
    // to equal Date(Fri Jun 1 00:00:00 UTC 7).
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

    // Fin julien
    expect(new acte.Jour('14 octobre 1582').variables.gregorien.od).not.toBeDefined();
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
    expect(new acte.Jour('15 octobre 1582').variables.julien.od).toEqual(dateValide(5, 10, 1582));

    // Fin julien
    expect(new acte.Jour('14 octobre 1582').variables.julien.od).toEqual(dateValide(14, 10, 1582));

    // Fin julien forcé
    expect(new acte.Jour('14 octobre 1582', false).variables.julien.od).toEqual(dateValide(4, 10, 1582));
  });
  it('new acte.Jour().variables.julien.a = l\'année julienne en chiffres', function () {
    expect(new acte.Jour('4 octobre 1793').variables.julien.a).toEqual(1793);
  });
  it('new acte.Jour().variables.julien.m = le mois julien en chiffres', function () {
    expect(new acte.Jour('5 octobre 1793').variables.julien.m).toEqual(9);
  });
  it('new acte.Jour().variables.julien.jm = le jour du mois julien en chiffres', function () {
    expect(new acte.Jour('6 octobre 1793').variables.julien.jm).toEqual(25);
  });
  it('new acte.Jour().variables.julien.jj = le nombre de jours juliens', function () {
    expect(new acte.Jour('6 octobre 1793').variables.julien.jj).toEqual(2376218.5);
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

// http://jasmine.github.io/edge/introduction.html
describe('new acte.Jour().gregorien()', function () {
  // Valeurs par défaut
  it('new acte.Jour().gregorien() = la date grégorienne ' + 'formatée par défaut.', function () {
    expect(new acte.Jour('1/1/1600').gregorien()).toEqual('1er janvier 1600');
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
    expect(new acte.Jour('1/9/16290').gregorien('%Al')).toEqual('');
    expect(new acte.Jour('1/9/-16290', false).gregorien('%Al')).toEqual('');
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
  it('new acte.Jour().gregorien() = Pas de correspondances.', function () {
    expect(new acte.Jour('').gregorien()).toEqual('Pas de correspondances.');
  });
  it('new acte.Jour().gregorien(0, \'erreur\') = Message d\'erreur.', function () {
    expect(new acte.Jour('').gregorien(0, 'Message d\'erreur 1.')).toEqual('Message d\'erreur 1.');
    expect(new acte.Jour('').gregorien('', 'Message d\'erreur 2.')).toEqual('Message d\'erreur 2.');
    expect(new acte.Jour('').gregorien(false, 'Message d\'erreur 3.')).toEqual('Message d\'erreur 3.');
  });
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