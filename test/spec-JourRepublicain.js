describe('new acte.Jour().republicain()', () => {
  // Valeurs par défaut
  it(
    'new acte.Jour().republicain() = la date republicaine ' +
    'formatée par défaut.',
    () => {
      expect(new acte.Jour('1/1/1800').republicain())
        .toEqual('11 nivôse an VIII');
      expect(new acte.Jour('12 nivôse an VIII').republicain())
        .toEqual('12 nivôse an VIII');
      expect(new acte.Jour('30 fructidor an V').republicain())
        .toEqual('30 fructidor an V');
      expect(new acte.Jour('an 9').republicain())
        .toEqual('1er vendémiaire an IX');
      expect(new acte.Jour('an X').republicain())
        .toEqual('1er vendémiaire an X');
      expect(new acte.Jour('brumaire an X', false).republicain())
        .toEqual('1er brumaire an X');
      expect(new acte.Jour('1er brumaire an 7999', false).republicain())
        .toEqual('1er brumaire an MMMMMMMCMXCIX');
    });

  // Balises
  it(
    'new acte.Jour().republicain(\'%A\') = l\'Année republicaine.',
    () => {
      expect(new acte.Jour('1/1/1800').republicain('%A'))
        .toEqual('8');
    });
  it(
    'new acte.Jour().republicain(\'%AN\') = l\'Année republicaine.',
    () => {
      expect(new acte.Jour('1/1/1801').republicain('%AN'))
        .toEqual('9');
    });
  it(
    'new acte.Jour().republicain(\'%D\') = la Semaine/Décade dans le mois.',
    () => {
      expect(new acte.Jour('14/1/1800').republicain('%D'))
        .toEqual('3');
    });
  it(
    'new acte.Jour().republicain(\'%DM\') = la Semaine/Décade dans le mois.',
    () => {
      expect(new acte.Jour('21/1/1800').republicain('%DM'))
        .toEqual('1');
    });
  it(
    'new acte.Jour().republicain(\'%SM\') = la Semaine/Décade dans le mois.',
    () => {
      expect(new acte.Jour('12/2/1800').republicain('%SM'))
        .toEqual('3');
    });
  it(
    'new acte.Jour().republicain(\'%J\') = le Jour dans le mois.',
    () => {
      expect(new acte.Jour('26/1/1800').republicain('%J'))
        .toEqual('6');
    });
  it(
    'new acte.Jour().republicain(\'%JM\') = le Jour dans le mois.',
    () => {
      expect(new acte.Jour('27/1/1800').republicain('%JM'))
        .toEqual('7');
    });
  it(
    'new acte.Jour().republicain(\'%JA\') = le Jour dans l\'année.',
    () => {
      expect(new acte.Jour('23/8/1800').republicain('%JA'))
        .toEqual('335');
    });
  it(
    'new acte.Jour().republicain(\'%JS\') = le Jour de la décade/Semaine.',
    () => {
      expect(new acte.Jour('7/1/1800').republicain('%JS'))
        .toEqual('7');
    });
  it(
    'new acte.Jour().republicain(\'%JD\') = le Jour de la décade/Semaine.',
    () => {
      expect(new acte.Jour('8/1/1800').republicain('%JD'))
        .toEqual('8');
    });
  it(
    'new acte.Jour().republicain(\'%M\') = le Mois dans l\'année.',
    () => {
      expect(new acte.Jour('1/9/1800').republicain('%M'))
        .toEqual('12');
    });
  it(
    'new acte.Jour().republicain(\'%MA\') = le Mois dans l\'année.',
    () => {
      expect(new acte.Jour('1/10/1800').republicain('%MA'))
        .toEqual('1');
    });
  it(
    'new acte.Jour().republicain(\'%S\') = la Semaine/Décade dans l\'année.',
    () => {
      expect(new acte.Jour('1/4/1800').republicain('%S'))
        .toEqual('20');
    });
  it(
    'new acte.Jour().republicain(\'%SA\') = la Semaine/Décade dans l\'année.',
    () => {
      expect(new acte.Jour('1/5/1800').republicain('%SA'))
        .toEqual('23');
    });
  it(
    'new acte.Jour().republicain(\'%DA\') = la Semaine/Décade dans l\'année.',
    () => {
      expect(new acte.Jour('1/6/1800').republicain('%DA'))
        .toEqual('26');
    });

  // Filtres
  it(
    'new acte.Jour().republicain(\'%M1\') = Mois en lettres sur 1 caractère.',
    () => {
      expect(new acte.Jour('1/1/1800').republicain('%M1'))
        .toEqual('N');
    });
  it(
    'new acte.Jour().republicain(\'%M2\') = Mois en lettres sur 2 caractère.',
    () => {
      expect(new acte.Jour('1/2/1800').republicain('%M2'))
        .toEqual('Pl');
    });
  it(
    'new acte.Jour().republicain(\'%M3\') = Mois en lettres sur 3 caractère.',
    () => {
      expect(new acte.Jour('1/3/1800').republicain('%M3'))
        .toEqual('Vnt');
    });
  it(
    'new acte.Jour().republicain(\'%Ma\') = Mois en abrégé.',
    () => {
      expect(new acte.Jour('1/4/1800').republicain('%Ma'))
        .toEqual('Germ');
    });
  it(
    'new acte.Jour().republicain(\'%Ml\') = Mois en lettres.',
    () => {
      expect(new acte.Jour('1/5/1800').republicain('%Ml'))
        .toEqual('Floréal');
    });
  it(
    'new acte.Jour().republicain(\'%JS1\') = Jour de la Semaine en lettres ' +
    'sur 1 caractère.',
    () => {
      expect(new acte.Jour('10/1/1800').republicain('%JS1'))
        .toEqual('D');
    });
  it(
    'new acte.Jour().republicain(\'%JS2\') = Jour de la Semaine en lettres ' +
    'sur 2 caractère.',
    () => {
      expect(new acte.Jour('11/1/1800').republicain('%JS2'))
        .toEqual('Pi');
    });
  it(
    'new acte.Jour().republicain(\'%JS3\') = Jour de la Semaine en lettres ' +
    'sur 3 caractère.',
    () => {
      expect(new acte.Jour('12/1/1800').republicain('%JS3'))
        .toEqual('Duo');
    });
  it(
    'new acte.Jour().republicain(\'%JSa\') = Jour de la Semaine en abrégé.',
    () => {
      expect(new acte.Jour('13/1/1800').republicain('%JSa'))
        .toEqual('Tri');
    });
  it(
    'new acte.Jour().republicain(\'%JSl\') = Jour de la semaine en lettres.',
    () => {
      expect(new acte.Jour('1/9/1800').republicain('%JSl'))
        .toEqual('Quartidi');
    });

  // Erreurs
  it(
    'new acte.Jour().republicain() = Pas de correspondances.',
    () => {
      expect(new acte.Jour('').republicain())
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('brumaire an 11000').republicain())
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('brumaire an 11000', false).republicain())
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('brumaire an -11000', false).republicain())
        .toEqual('Pas de correspondances.');
      expect(new acte.Jour('1er brumaire an 8000', false).republicain())
        .toEqual('Pas de correspondances.');
    });
  it(
    'new acte.Jour().republicain(0, \'erreur\') = Message d\'erreur.',
    () => {
      expect(new acte.Jour('').republicain('', 'Message d\'erreur.'))
        .toEqual('Message d\'erreur.');
    });

  // Callback functions
  it(
    'new acte.Jour().republicain(0, 0, ((res, obj) => {})) ' +
    '= Fonction de rappel.',
    () => {
      expect(new acte.Jour('3 avril 1805')
          .republicain('%Jz/%Mz', 0, ((res, obj) => {
            const an = acte.prefixeZero(obj.A % 100);

            return `${res}/${an}`;
          })))
        .toEqual('13/07/13');
    });
});
