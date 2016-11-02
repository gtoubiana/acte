describe('new acte.Jour().gregorien()', () => {
  // Valeurs par défaut
  it(
    'new acte.Jour().gregorien() = la date grégorienne ' +
    'formatée par défaut.',
    () => {
      expect(new acte.Jour('1/1/1600').gregorien())
        .toEqual('1er janvier 1600');
      expect(new acte.Jour('2 jan 1890').gregorien())
        .toEqual('2 janvier 1890');
      expect(new acte.Jour('8 juin an 1890').gregorien())
        .toEqual('8 juin 1890');
      expect(new acte.Jour('8 brumaire an 1890', false).gregorien())
        .toEqual('28 octobre 3681');
      expect(new acte.Jour('9 brumaire juillet an 1890', false).gregorien())
        .toEqual('29 octobre 3681');
      expect(new acte.Jour('10 brum juillet an 1890', false).gregorien())
        .toEqual('10 juillet 1890');
      expect(new acte.Jour('11 juillet an 10', false).gregorien())
        .toEqual('11 juillet 10');
      expect(new acte.Jour('12 juillet an X', false).gregorien())
        .toEqual('12 juillet 10');
      expect(new acte.Jour('le 1er janvier de l\'an 2', false).gregorien())
        .toEqual('1er janvier 2');
      expect(new acte.Jour('le 4 mars de l\'an VI', false).gregorien())
        .toEqual('4 mars 6');
      expect(new acte.Jour('le 5 avril de l\'an -IV', false).gregorien())
        .toEqual('5 avril -4');
      expect(new acte.Jour('5/10/1582').gregorien('%JSl %JM %Mlb %A'))
        .toEqual('Vendredi 15 octobre 1582');
      expect(new acte.Jour('14/10/1582').gregorien('%JSl %JM %Mlb %A'))
        .toEqual('Dimanche 24 octobre 1582');
      expect(new acte.Jour('15/10/1582').gregorien('%JSl %JM %Mlb %A'))
        .toEqual('Vendredi 15 octobre 1582');
      expect(new acte.Jour('15/10/1582', false).gregorien(
          '%JSl %JM %Mlb %A'))
        .toEqual('Vendredi 15 octobre 1582');
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
    'new acte.Jour().gregorien(\'%JS1\') = Jour de la Semaine en lettres ' +
    'sur 1 caractère.',
    () => {
      expect(new acte.Jour('10/1/1600').gregorien('%JS1'))
        .toEqual('L');
    });
  it(
    'new acte.Jour().gregorien(\'%JS2\') = Jour de la Semaine en lettres ' +
    'sur 2 caractère.',
    () => {
      expect(new acte.Jour('11/1/1600').gregorien('%JS2'))
        .toEqual('Ma');
    });
  it(
    'new acte.Jour().gregorien(\'%JS3\') = Jour de la Semaine en lettres ' +
    'sur 3 caractère.',
    () => {
      expect(new acte.Jour('12/1/1600').gregorien('%JS3'))
        .toEqual('Mer');
    });
  it(
    'new acte.Jour().gregorien(\'%JSa\') = Jour de la Semaine en abrégé.',
    () => {
      expect(new acte.Jour('13/1/1600').gregorien('%JSa'))
        .toEqual('Jeudi');
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
      expect(new acte.Jour('1/11/1628').gregorien('%Jlo'))
        .toEqual('Premier');
      expect(new acte.Jour('1/11/1628').gregorien('%Jlof'))
        .toEqual('Première');
      expect(new acte.Jour('2/11/1628').gregorien('%Jlo'))
        .toEqual('Deuxième');
      expect(new acte.Jour('3/11/1628').gregorien('%Jlo'))
        .toEqual('Troisième');
      expect(new acte.Jour('4/11/1628').gregorien('%Jlo'))
        .toEqual('Quatrième');
      expect(new acte.Jour('5/11/1628').gregorien('%Jlo'))
        .toEqual('Cinquième');
      expect(new acte.Jour('7/11/1628').gregorien('%Jlo'))
        .toEqual('Septième');
      expect(new acte.Jour('9/11/1628').gregorien('%Jlo'))
        .toEqual('Neuvième');
      expect(new acte.Jour('21/11/1628').gregorien('%Jlo'))
        .toEqual('Vingt-et-unième');
      expect(new acte.Jour('21/11/1628').gregorien('%Jvo'))
        .toEqual('Vingt et unième');
    });
  it(
    'new acte.Jour().gregorien(\'%Alo\') = Année en nombres ordinaux' +
    ' en lettres.',
    () => {
      expect(new acte.Jour('22/11/1300', false).gregorien('%Alo'))
        .toEqual('Mille-trois-centième');
      expect(new acte.Jour('23/11/1680').gregorien('%Alo'))
        .toEqual('Mille-six-cent-quatre-vingtième');
      expect(new acte.Jour('24/11/0', false).gregorien('%Alo'))
        .toEqual('Zéroième');
    });
  it(
    'new acte.Jour().gregorien(\'%Al\') = Année en lettres (réforme de 1990).',
    () => {
      expect(new acte.Jour('1/9/1629').gregorien('%Al'))
        .toEqual('Mille-six-cent-vingt-neuf');
      expect(new acte.Jour('1/9/-1629', false).gregorien('%Al'))
        .toEqual('Moins mille-six-cent-vingt-neuf');
      expect(new acte.Jour('1/9/16290').gregorien('%Al'))
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('1/9/16290', false).gregorien('%Al'))
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('1/9/-16290', false).gregorien('%Al'))
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('1/9/5100').gregorien('%Al'))
        .toEqual('Cinq-mille-cent');
      expect(new acte.Jour('1/9/5110').gregorien('%Al'))
        .toEqual('Cinq-mille-cent-dix');
      expect(new acte.Jour('1/9/5111').gregorien('%Al'))
        .toEqual('Cinq-mille-cent-onze');
      expect(new acte.Jour('1/9/5112').gregorien('%Al'))
        .toEqual('Cinq-mille-cent-douze');
      expect(new acte.Jour('1/9/5170').gregorien('%Al'))
        .toEqual('Cinq-mille-cent-soixante-dix');
      expect(new acte.Jour('1/9/5171').gregorien('%Al'))
        .toEqual('Cinq-mille-cent-soixante-et-onze');
      expect(new acte.Jour('1/9/5172').gregorien('%Al'))
        .toEqual('Cinq-mille-cent-soixante-douze');
      expect(new acte.Jour('1/9/5190').gregorien('%Al'))
        .toEqual('Cinq-mille-cent-quatre-vingt-dix');
      expect(new acte.Jour('1/9/5191').gregorien('%Al'))
        .toEqual('Cinq-mille-cent-quatre-vingt-onze');
      expect(new acte.Jour('1/9/5192').gregorien('%Al'))
        .toEqual('Cinq-mille-cent-quatre-vingt-douze');
      expect(new acte.Jour('1/9/5192').gregorien('%Arl'))
        .toEqual('Cinq-mille-cent-quatre-vingt-douze');
    });
  it(
    'new acte.Jour().gregorien(\'%JSl\') = Jour de la semaine en lettres.',
    () => {
      expect(new acte.Jour('1/9/5192').gregorien('%JSl'))
        .toEqual('Mardi');
    });
  it(
    'new acte.Jour().gregorien(\'%Av\') = Année en lettres (vieille notation).',
    () => {
      expect(new acte.Jour('1/9/1631').gregorien('%Av'))
        .toEqual('Mille six cent trente et un');
      expect(new acte.Jour('1/9/1631').gregorien('%Arv'))
        .toEqual('Mille six cent trente et un');
    });
  it(
    'new acte.Jour().gregorien(\'%Ar\') = Année en chiffres romains.',
    () => {
      expect(new acte.Jour('1/9/1628').gregorien('%Ar'))
        .toEqual('MDCXXVIII');
      expect(new acte.Jour('1/9/-1628', false).gregorien('%Ar'))
        .toEqual('-MDCXXVIII');
      expect(new acte.Jour('1/9/1629').gregorien('%Arz'))
        .toEqual('MDCXXIX');
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
      expect(new acte.Jour('6/1/1605').gregorien('%SAof'))
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

  // Erreurs
  it(
    'new acte.Jour().gregorien() = Pas de correspondances.',
    () => {
      expect(new acte.Jour('').gregorien())
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('1er 1890').gregorien())
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('4/10/1582').gregorien('%JSl %JM %Mlb %A'))
        .toEqual('Pas de correspondances.');
    });
  it(
    'new acte.Jour().gregorien(0, \'erreur\') = Message d\'erreur.',
    () => {
      expect(new acte.Jour('').gregorien(0, 'Message d\'erreur 1.'))
        .toEqual('Message d\'erreur 1.');
      expect(new acte.Jour('').gregorien('', 'Message d\'erreur 2.'))
        .toEqual('Message d\'erreur 2.');
      expect(new acte.Jour('').gregorien(false, 'Message d\'erreur 3.'))
        .toEqual('Message d\'erreur 3.');
    });

  // Callback functions
  it(
    'new acte.Jour().gregorien(0, 0, ((res, obj) => {})) ' +
    '= Fonction de rappel.',
    () => {
      expect(new acte.Jour('1 février 1603')
          .gregorien(0, 0, ((res, obj) => {
            const jour = obj.J < 10 ? `0${obj.J}` : obj.J;
            const mois = obj.M < 10 ? `0${obj.M}` : obj.M;
            const an = (obj.A % 100) < 10 ? `0${obj.A % 100}` : obj
              .A % 100;

            return `${jour}/${mois}/${an}`;
          })))
        .toEqual('01/02/03');
      expect(new acte.Jour('2 mars 1604')
          .gregorien(0, 0, ((res, obj) => {
            const zero = (x) => {
              const resultat = x < 10 ? `0${x}` : x;

              return resultat;
            };

            return `${zero(obj.J)}/${zero(obj.M)}/${zero(obj.A % 100)}`;
          })))
        .toEqual('02/03/04');
      expect(new acte.Jour('3 avril 1605')
          .gregorien('%Jz/%Mz', 0, ((res, obj) => {
            const an = (obj.A % 100) < 10 ? `0${obj.A % 100}` : obj
              .A % 100;

            return `${res}/${an}`;
          })))
        .toEqual('03/04/05');
    });
});
