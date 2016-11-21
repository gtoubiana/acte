describe('new acte.Jour().julien()', () => {
  // Valeurs par défaut
  it(
    'new acte.Jour().julien() = la date julienne ' +
    'formatée par défaut.',
    () => {
      expect(new acte.Jour('1/12/630').julien())
        .toEqual('1er décembre 630');
      expect(new acte.Jour('3/10/1582').julien('%JSl %JM %Mlb %A'))
        .toEqual('Mercredi 3 octobre 1582');
      expect(new acte.Jour('4/10/1582').julien('%JSl %JM %Mlb %A'))
        .toEqual('Jeudi 4 octobre 1582');
      expect(new acte.Jour('5/10/1582').julien('%JSl %JM %Mlb %A'))
        .toEqual('Vendredi 5 octobre 1582');
      expect(new acte.Jour('14/10/1582').julien('%JSl %JM %Mlb %A'))
        .toEqual('Dimanche 14 octobre 1582');
      expect(new acte.Jour('15/10/1582').julien('%JSl %JM %Mlb %A'))
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('15/10/1582', false).julien(
          '%JSl %JM %Mlb %A'))
        .toEqual('Vendredi 5 octobre 1582');
    });

  // Balises
  it(
    'new acte.Jour().julien(\'%A\') = l\'Année julienne.',
    () => {
      expect(new acte.Jour('1/1/601').julien('%A'))
        .toEqual('601');
    });
  it(
    'new acte.Jour().julien(\'%AN\') = l\'Année julienne.',
    () => {
      expect(new acte.Jour('1/1/602').julien('%AN'))
        .toEqual('602');
    });
  it(
    'new acte.Jour().julien(\'%D\') = la Semaine/Décade dans le mois.',
    () => {
      expect(new acte.Jour('14/1/600').julien('%D'))
        .toEqual('3');
    });
  it(
    'new acte.Jour().julien(\'%DM\') = la Semaine/Décade dans le mois.',
    () => {
      expect(new acte.Jour('21/1/600').julien('%DM'))
        .toEqual('4');
    });
  it(
    'new acte.Jour().julien(\'%SM\') = la Semaine/Décade dans le mois.',
    () => {
      expect(new acte.Jour('28/1/600').julien('%SM'))
        .toEqual('5');
    });
  it(
    'new acte.Jour().julien(\'%J\') = le Jour dans le mois.',
    () => {
      expect(new acte.Jour('26/1/600').julien('%J'))
        .toEqual('26');
    });
  it(
    'new acte.Jour().julien(\'%JM\') = le Jour dans le mois.',
    () => {
      expect(new acte.Jour('27/1/600').julien('%JM'))
        .toEqual('27');
    });
  it(
    'new acte.Jour().julien(\'%JA\') = le Jour dans l\'année.',
    () => {
      expect(new acte.Jour('23/8/600').julien('%JA'))
        .toEqual('235');
    });
  it(
    'new acte.Jour().julien(\'%JS\') = le Jour de la décade/Semaine.',
    () => {
      expect(new acte.Jour('7/1/600').julien('%JS'))
        .toEqual('5');
    });
  it(
    'new acte.Jour().julien(\'%JD\') = le Jour de la décade/Semaine.',
    () => {
      expect(new acte.Jour('8/1/600').julien('%JD'))
        .toEqual('6');
    });
  it(
    'new acte.Jour().julien(\'%M\') = le Mois dans l\'année.',
    () => {
      expect(new acte.Jour('1/9/600').julien('%M'))
        .toEqual('9');
    });
  it(
    'new acte.Jour().julien(\'%MA\') = le Mois dans l\'année.',
    () => {
      expect(new acte.Jour('1/10/600').julien('%MA'))
        .toEqual('10');
    });
  it(
    'new acte.Jour().julien(\'%S\') = la Semaine/Décade dans l\'année.',
    () => {
      expect(new acte.Jour('1/4/600').julien('%S'))
        .toEqual('14');
    });
  it(
    'new acte.Jour().julien(\'%SA\') = la Semaine/Décade dans l\'année.',
    () => {
      expect(new acte.Jour('1/5/600').julien('%SA'))
        .toEqual('18');
    });
  it(
    'new acte.Jour().julien(\'%DA\') = la Semaine/Décade dans l\'année.',
    () => {
      expect(new acte.Jour('1/6/600').julien('%DA'))
        .toEqual('22');
    });

  // Filtres
  it(
    'new acte.Jour().julien(\'%M1\') = Mois en lettres sur 1 caractère.',
    () => {
      expect(new acte.Jour('1/1/600').julien('%M1'))
        .toEqual('J');
    });
  it(
    'new acte.Jour().julien(\'%M2\') = Mois en lettres sur 2 caractère.',
    () => {
      expect(new acte.Jour('1/2/600').julien('%M2'))
        .toEqual('Fr');
    });
  it(
    'new acte.Jour().julien(\'%M3\') = Mois en lettres sur 3 caractère.',
    () => {
      expect(new acte.Jour('1/3/600').julien('%M3'))
        .toEqual('Mar');
    });
  it(
    'new acte.Jour().julien(\'%Ma\') = Mois en abrégé.',
    () => {
      expect(new acte.Jour('1/4/600').julien('%Ma'))
        .toEqual('Avr');
    });
  it(
    'new acte.Jour().julien(\'%Ml\') = Mois en lettres.',
    () => {
      expect(new acte.Jour('1/5/600').julien('%Ml'))
        .toEqual('Mai');
    });
  it(
    'new acte.Jour().julien(\'%JS1\') = Jour de la Semaine en lettres ' +
    'sur 1 caractère.',
    () => {
      expect(new acte.Jour('10/1/600').julien('%JS1'))
        .toEqual('L');
    });
  it(
    'new acte.Jour().julien(\'%JS2\') = Jour de la Semaine en lettres ' +
    'sur 2 caractère.',
    () => {
      expect(new acte.Jour('11/1/600').julien('%JS2'))
        .toEqual('Ma');
    });
  it(
    'new acte.Jour().julien(\'%JS3\') = Jour de la Semaine en lettres ' +
    'sur 3 caractère.',
    () => {
      expect(new acte.Jour('12/1/600').julien('%JS3'))
        .toEqual('Mer');
    });
  it(
    'new acte.Jour().julien(\'%JSa\') = Jour de la Semaine en abrégé.',
    () => {
      expect(new acte.Jour('13/1/600').julien('%JSa'))
        .toEqual('Jeudi');
    });
  it(
    'new acte.Jour().julien(\'%JSl\') = Jour de la semaine en lettres.',
    () => {
      expect(new acte.Jour('1/9/5192').julien('%JSl'))
        .toEqual('Pas de correspondances.');
    });

  // Erreurs
  it(
    'new acte.Jour().julien() = Pas de correspondances.',
    () => {
      expect(new acte.Jour('').julien())
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('1/1/16000').julien('%A'))
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('1/1/-16000').julien('%A'))
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('1/1/16000', false).julien('%A'))
        .toEqual('Pas de correspondances.');
    });
  it(
    'new acte.Jour().julien(0, \'erreur\') = Message d\'erreur.',
    () => {
      expect(new acte.Jour('').julien('', 'Message d\'erreur.'))
        .toEqual('Message d\'erreur.');
    });

  // Callback functions
  it(
    'new acte.Jour().julien(0, 0, ((res, obj) => {})) ' +
    '= Fonction de rappel.',
    () => {
      expect(new acte.Jour('3 avril 605')
          .julien('%Jz/%Mz', 0, ((res, obj) => {
            const an = (obj.A % 100) < 10 ? `0${obj.A % 100}` : obj
              .A % 100;

            return `${res}/${an}`;
          })))
        .toEqual('03/04/05');
    });
});
