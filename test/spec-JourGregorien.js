// http://jasmine.github.io/edge/introduction.html
describe('new acte.Jour().gregorien()', () => {
  // Valeurs par défaut
  it(
    'new acte.Jour().gregorien() = la date grégorienne ' +
    'formatée par défaut.',
    () => {
      expect(new acte.Jour('1/1/1600').gregorien())
        .toEqual('1er janvier 1600');
    });

  // Balises
  it(
    'new acte.Jour().gregorien(\'%A\') = l\'Année grégorienne.',
    () => {
      expect(new acte.Jour('1/1/1601').gregorien('%A'))
        .toEqual('1601');
    });
  it(
    'new acte.Jour().gregorien(\'%AN\') = l\'Année grégorienne.',
    () => {
      expect(new acte.Jour('1/1/1602').gregorien('%AN'))
        .toEqual('1602');
    });
  it(
    'new acte.Jour().gregorien(\'%D\') = la décade/Semaine dans le mois.',
    () => {
      expect(new acte.Jour('14/1/1600').gregorien('%D'))
        .toEqual('2');
    });
  it(
    'new acte.Jour().gregorien(\'%DM\') = la décade/Semaine dans le mois.',
    () => {
      expect(new acte.Jour('21/1/1600').gregorien('%DM'))
        .toEqual('3');
    });
  it(
    'new acte.Jour().gregorien(\'%SM\') = la décade/Semaine dans le mois.',
    () => {
      expect(new acte.Jour('28/1/1600').gregorien('%SM'))
        .toEqual('4');
    });
  it(
    'new acte.Jour().gregorien(\'%J\') = le Jour dans le mois.',
    () => {
      expect(new acte.Jour('26/1/1600').gregorien('%J'))
        .toEqual('26');
    });
  it(
    'new acte.Jour().gregorien(\'%JM\') = le Jour dans le mois.',
    () => {
      expect(new acte.Jour('27/1/1600').gregorien('%JM'))
        .toEqual('27');
    });
  it(
    'new acte.Jour().gregorien(\'%JA\') = le Jour dans l\'année.',
    () => {
      expect(new acte.Jour('23/8/1600').gregorien('%JA'))
        .toEqual('236');
    });
  it(
    'new acte.Jour().gregorien(\'%JS\') = le Jour de la décade/Semaine.',
    () => {
      expect(new acte.Jour('7/1/1600').gregorien('%JS'))
        .toEqual('5');
    });
  it(
    'new acte.Jour().gregorien(\'%JD\') = le Jour de la décade/Semaine.',
    () => {
      expect(new acte.Jour('8/1/1600').gregorien('%JD'))
        .toEqual('6');
    });
  it(
    'new acte.Jour().gregorien(\'%M\') = le Mois dans l\'année.',
    () => {
      expect(new acte.Jour('1/9/1600').gregorien('%M'))
        .toEqual('9');
    });
  it(
    'new acte.Jour().gregorien(\'%MA\') = le Mois dans l\'année.',
    () => {
      expect(new acte.Jour('1/10/1600').gregorien('%MA'))
        .toEqual('10');
    });
  it(
    'new acte.Jour().gregorien(\'%S\') = la Semaine/décade dans l\'année.',
    () => {
      expect(new acte.Jour('1/4/1600').gregorien('%S'))
        .toEqual('13');
    });
  it(
    'new acte.Jour().gregorien(\'%SA\') = la Semaine/décade dans l\'année.',
    () => {
      expect(new acte.Jour('1/5/1600').gregorien('%SA'))
        .toEqual('18');
    });
  it(
    'new acte.Jour().gregorien(\'%DA\') = la Semaine/décade dans l\'année.',
    () => {
      expect(new acte.Jour('1/6/1600').gregorien('%DA'))
        .toEqual('22');
    });

  // Filtres
  it(
    'new acte.Jour().gregorien(\'%M1\') = Mois en lettres sur 1 caractère.',
    () => {
      expect(new acte.Jour('1/1/1600').gregorien('%M1'))
        .toEqual('J');
    });
  it(
    'new acte.Jour().gregorien(\'%M2\') = Mois en lettres sur 2 caractère.',
    () => {
      expect(new acte.Jour('1/2/1600').gregorien('%M2'))
        .toEqual('Fr');
    });
  it(
    'new acte.Jour().gregorien(\'%M3\') = Mois en lettres sur 3 caractère.',
    () => {
      expect(new acte.Jour('1/3/1600').gregorien('%M3'))
        .toEqual('Mar');
    });
  it(
    'new acte.Jour().gregorien(\'%Ma\') = Mois en abrégé.',
    () => {
      expect(new acte.Jour('1/4/1600').gregorien('%Ma'))
        .toEqual('Avr');
    });
  it(
    'new acte.Jour().gregorien(\'%Ml\') = Mois en lettres.',
    () => {
      expect(new acte.Jour('1/5/1600').gregorien('%Ml'))
        .toEqual('Mai');
    });
  it(
    'new acte.Jour().gregorien(\'%Mlb\') = Mois en minuscules.',
    () => {
      expect(new acte.Jour('1/6/1600').gregorien('%Mlb'))
        .toEqual('juin');
    });
  it(
    'new acte.Jour().gregorien(\'%Mlm\') = Mois en majuscules.',
    () => {
      expect(new acte.Jour('1/7/1600').gregorien('%Mlm'))
        .toEqual('JUILLET');
    });
  it(
    'new acte.Jour().gregorien(\'%Mlc\') = Mois en capitales.',
    () => {
      expect(new acte.Jour('1/8/1600').gregorien('%Mlc'))
        .toEqual('AOÛT');
    });
  it(
    'new acte.Jour().gregorien(\'%Mz\') = Mois sur 2 chiffres.',
    () => {
      expect(new acte.Jour('1/9/1600').gregorien('%Mz'))
        .toEqual('09');
      expect(new acte.Jour('1/10/1600').gregorien('%Mz'))
        .toEqual('10');
    });
  it(
    'new acte.Jour().gregorien(\'%Mo\') = Mois en nombres ordinaux.',
    () => {
      expect(new acte.Jour('1/10/1628').gregorien('%Mo'))
        .toEqual('10e');
    });
  it(
    'new acte.Jour().gregorien(\'%Jlo\') = Jour en nombres ordinaux' +
    ' en lettres.',
    () => {
      expect(new acte.Jour('18/11/1628').gregorien('%Jlo'))
        .toEqual('Dix-huitième');
    });
  it(
    'new acte.Jour().gregorien(\'%Al\') = Année en lettres (réforme de 1990).',
    () => {
      expect(new acte.Jour('1/9/1629').gregorien('%Al'))
        .toEqual('Mille-six-cent-vingt-neuf');
    });
  it(
    'new acte.Jour().gregorien(\'%Av\') = Année en lettres (vieille notation).',
    () => {
      expect(new acte.Jour('1/9/1631').gregorien('%Av'))
        .toEqual('Mille six cent trente et un');
    });
  it(
    'new acte.Jour().gregorien(\'%Ar\') = Année en chiffres romains.',
    () => {
      expect(new acte.Jour('1/9/1628').gregorien('%Ar'))
        .toEqual('MDCXXVIII');
      expect(new acte.Jour('1/9/-1628', false).gregorien('%Ar'))
        .toEqual('-MDCXXVIII');
    });
  it(
    'new acte.Jour().gregorien(\'%JAp\') = Jour de l\'année en nombre ordinal',
    () => {
      expect(new acte.Jour('1/1/1604').gregorien('%JAp'))
        .toEqual('1er');
    });
  it(
    'new acte.Jour().gregorien(\'%SAf\') = Semaine de l\'année en nombre' +
    ' ordinal.',
    () => {
      expect(new acte.Jour('6/1/1605').gregorien('%SAf'))
        .toEqual('1re');
    });
  it(
    'new acte.Jour().gregorien(\'%JAlp\') = Jour de l\'année en nombre' +
    ' ordinal en lettres.',
    () => {
      expect(new acte.Jour('1/1/1604').gregorien('%JAlp'))
        .toEqual('Premier');
      expect(new acte.Jour('2/1/1604').gregorien('%JAlp'))
        .toEqual('Deux');
    });
  it(
    'new acte.Jour().gregorien(\'%SAlf\') = Semaine de l\'année en nombre' +
    ' ordinal en lettres.',
    () => {
      expect(new acte.Jour('6/1/1605').gregorien('%SAlf'))
        .toEqual('Première');
    });
  it(
    'BUGS A CORRIGER = %Jrzl',
    () => {
      expect(new acte.Jour('6/1/1605').gregorien('%J'))
        .toEqual('6');
      expect(new acte.Jour('6/1/1605').gregorien('%Jz'))
        .toEqual('06');
      expect(new acte.Jour('6/1/1605').gregorien('%Jr'))
        .toEqual('VI');
      expect(new acte.Jour('6/1/1605').gregorien('%Jl'))
        .toEqual('Six');
      expect(new acte.Jour('6/1/1605').gregorien('%Jrz'))
        .toEqual('VI');

      // l ou r
      expect(new acte.Jour('6/1/1605').gregorien('%Jrl'))
        .toEqual('');

      // l
      expect(new acte.Jour('6/1/1605').gregorien('%Jzl'))
        .toEqual('');

      // l ou r
      expect(new acte.Jour('6/1/1605').gregorien('%Jrzl'))
        .toEqual('');

      // '' ou '%z'
      expect(new acte.Jour('6/1/1605').gregorien('%z'))
        .toEqual('%z');

      // '' ou '%r'
      expect(new acte.Jour('6/1/1605').gregorien('%r'))
        .toEqual('');

      // '' ou '%l'
      expect(new acte.Jour('6/1/1605').gregorien('%l'))
        .toEqual('');

      // '' ou '%rzl'
      expect(new acte.Jour('6/1/1605').gregorien('%rzl'))
        .toEqual('');
    });
});
