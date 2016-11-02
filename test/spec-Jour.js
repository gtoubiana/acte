const dateValide = (jour, mois, an) => {
  const resultat = new Date(an, mois - 1, jour);

  resultat.setFullYear(an);
  return resultat;
};

const anActuel = new Date();

describe('new acte.Jour()', () => {
  it('new acte.Jour() = un objet', () => {
    expect(new acte.Jour('6 octobre 1793'))
      .toEqual(jasmine.any(Object));
  });
  it(
    'new acte.Jour().variables.gregorien.od = ' +
    'un objet Date grégorienne (ou Undefined)',
    () => {
      // gregorien
      expect(new acte.Jour('1793').variables.gregorien.od)
        .toEqual(dateValide(1, 1, 1793));
      expect(new acte.Jour('octobre 1793').variables.gregorien.od)
        .toEqual(dateValide(1, 10, 1793));
      expect(new acte.Jour('2 octobre 1793').variables.gregorien.od)
        .toEqual(dateValide(2, 10, 1793));
      expect(new acte.Jour('3 oct 1793').variables.gregorien.od)
        .toEqual(dateValide(3, 10, 1793));
      expect(new acte.Jour('4 Oct. 1793').variables.gregorien.od)
        .toEqual(dateValide(4, 10, 1793));
      expect(new acte.Jour('5 8bre 1793').variables.gregorien.od)
        .toEqual(dateValide(5, 10, 1793));
      expect(new acte.Jour('6/10/1793').variables.gregorien.od)
        .toEqual(dateValide(6, 10, 1793));
      expect(new acte.Jour('7.10.1793').variables.gregorien.od)
        .toEqual(dateValide(7, 10, 1793));

      // false for debug
      expect(new acte.Jour('8//10.-1793', false).variables.gregorien.od)
        .toEqual(dateValide(8, 10, -1793));
      expect(new acte.Jour('/2/3', false).variables.gregorien.od)
        .toEqual(dateValide(1, 2, 3));
      expect(new acte.Jour('/3/4/', false).variables.gregorien.od)
        .toEqual(dateValide(1, 3, 4));
      expect(new acte.Jour('4/5/6/', false).variables.gregorien.od)
        .toEqual(dateValide(4, 5, 6));
      expect(new acte.Jour('/5/6/7', false).variables.gregorien.od)
        .toEqual(dateValide(1, 5, 6));
      expect(new acte.Jour('/6/7/8/', false).variables.gregorien.od)
        .toEqual(dateValide(1, 6, 7));
      expect(new acte.Jour('7/8/9/1', false).variables.gregorien.od)
        .toEqual(dateValide(7, 8, 9));

      // republicain
      expect(new acte.Jour('1er vendémiaire an I').variables.gregorien
        .od).toEqual(dateValide(22, 9, 1792));
      expect(new acte.Jour('1 vendémiaire an 1').variables.gregorien.od)
        .toEqual(dateValide(22, 9, 1792));
      expect(new acte.Jour('vendémiaire an 1').variables.gregorien.od)
        .toEqual(dateValide(22, 9, 1792));
      expect(new acte.Jour('an I').variables.gregorien.od)
        .toEqual(dateValide(22, 9, 1792));
      expect(new acte.Jour('La loi du 18 germinal an III.').variables
        .gregorien.od).toEqual(dateValide(7, 4, 1795));
      expect(new acte.Jour(
          'le Sextidi, 6 messidor, décade 28, de l\'an I.').variables
        .gregorien.od).toEqual(dateValide(24, 6, 1793));

      // Debut gregorien
      expect(new acte.Jour('15 octobre 1582').variables.gregorien.od)
        .toEqual(dateValide(15, 10, 1582));

      // Fin julien
      expect(new acte.Jour('14 octobre 1582').variables.gregorien.od)
        .toEqual(dateValide(24, 10, 1582));

      // Fin julien forcé
      expect(new acte.Jour('14 octobre 1582', false).variables.gregorien
        .od).toEqual(dateValide(14, 10, 1582));

      // Coverage gregorienBissextile()
      expect(new acte.Jour('29 février 4', false).variables.gregorien
        .od).toEqual(dateValide(29, 2, 4));
      expect(new acte.Jour('29 février 100', false).variables.gregorien
        .od).toEqual(dateValide(29, 2, 100));
      expect(new acte.Jour('29 février 400', false).variables.gregorien
        .od).toEqual(dateValide(29, 2, 400));
      expect(new acte.Jour('29 février 1600').variables.gregorien.od)
        .toEqual(dateValide(29, 2, 1600));
      expect(new acte.Jour('29 février 40000').variables.gregorien.od)
        .toEqual(dateValide(29, 2, 40000));

      // Coverage anRepublicain()
      expect(new acte.Jour('7 août 33618', false).variables.gregorien
        .od).toEqual(dateValide(7, 8, 33618));

      // Coverage deltaT()
      expect(new acte.Jour('8 septembre 2099', false).variables.gregorien
        .od).toEqual(dateValide(8, 9, 2099));
      expect(new acte.Jour(`8 septembre ${anActuel.getFullYear()}`,
        false).variables.gregorien.od).toEqual(dateValide(8, 9,
        anActuel.getFullYear()));

      // Undefined
      expect(new acte.Jour('6 octobre').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('octobre').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('6/13/1793').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('32/10/1793').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('0 octobre 1657').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('-00 octobre 1657').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('-12/-10/-1657', false).variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('8/5').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('8/5/').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('27 frimaire').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('frimaire').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('6-10-1793').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('1 vendémiaire').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('vendémiaire').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('67 vendémiaire an I').variables.gregorien
        .od).not.toBeDefined();
      expect(new acte.Jour('totokjhkjh').variables.gregorien.od)
        .not.toBeDefined();
      expect(new acte.Jour('').variables.gregorien.od)
        .not.toBeDefined();
    });
  it(
    'new acte.Jour().variables.gregorien.a = l\'année grégorienne en chiffres',
    () => {
      expect(new acte.Jour('1 octobre 1793').variables.gregorien.a)
        .toEqual(1793);
    });
  it(
    'new acte.Jour().variables.gregorien.m = le mois grégorien en chiffres',
    () => {
      expect(new acte.Jour('2 octobre 1793').variables.gregorien.m)
        .toEqual(10);
    });
  it(
    'new acte.Jour().variables.gregorien.jm = le jour du mois grégorien ' +
    'en chiffres',
    () => {
      expect(new acte.Jour('3 octobre 1793').variables.gregorien.jm)
        .toEqual(3);
    });
  it(
    'new acte.Jour().variables.julien.od = un objet Date julienne ' +
    '(ou Undefined)',
    () => {
      // Debut gregorien
      expect(new acte.Jour('15 octobre 1582').variables.julien.od)
        .toEqual(dateValide(5, 10, 1582));

      // Fin julien
      expect(new acte.Jour('14 octobre 1582').variables.julien.od)
        .toEqual(dateValide(14, 10, 1582));

      // Fin julien forcé
      expect(new acte.Jour('14 octobre 1582', false).variables.julien
        .od).toEqual(dateValide(4, 10, 1582));
    });
  it(
    'new acte.Jour().variables.julien.a = l\'année julienne en chiffres',
    () => {
      expect(new acte.Jour('4 octobre 1793').variables.julien.a)
        .toEqual(1793);
    });
  it('new acte.Jour().variables.julien.m = le mois julien en chiffres',
    () => {
      expect(new acte.Jour('5 octobre 1793').variables.julien.m)
        .toEqual(9);
    });
  it(
    'new acte.Jour().variables.julien.jm = le jour du mois julien en chiffres',
    () => {
      expect(new acte.Jour('6 octobre 1793').variables.julien.jm)
        .toEqual(25);
    });
  it('new acte.Jour().variables.julien.jj = le nombre de jours juliens',
    () => {
      expect(new acte.Jour('6 octobre 1793').variables.julien.jj)
        .toEqual(2376218.5);
    });
  it(
    'new acte.Jour().variables.republicain.a = l\'année républicaine ' +
    'en chiffres (ou Undefined)',
    () => {
      expect(new acte.Jour('6 octobre 1793').variables.republicain.a)
        .toEqual(2);

      // Borne mini
      expect(new acte.Jour('22 septembre 1792').variables.republicain
        .a).toEqual(1);
      expect(new acte.Jour('1 Vendémiaire an I').variables.republicain
        .a).toEqual(1);

      // Borne maxi
      expect(new acte.Jour('31 décembre 1805').variables.republicain.a)
        .toEqual(14);
      expect(new acte.Jour('10 nivôse an XIV').variables.republicain.a)
        .toEqual(14);

      // Date négative
      expect(new acte.Jour('-12 frimaire an -XVIII', false).variables
        .republicain.a).toEqual(-18);
      expect(new acte.Jour('-12 frimaire an -1685', false).variables
        .republicain.a).toEqual(-1685);

      // Retourne la date hors des bornes
      expect(new acte.Jour('frimaire an XVIII', false).variables
        .republicain.a).toEqual(18);

      // Min commune de Paris
      expect(new acte.Jour('27 ventose an LXXIX').variables
        .republicain.a).toEqual(79);

      // Max commune de Paris
      expect(new acte.Jour('8 prairial an LXXIX').variables
        .republicain.a).toEqual(79);

      // Pendant la commune de Paris
      expect(new acte.Jour('25 mai 1871').variables
        .republicain.a).toEqual(79);

      // Coverage JjVersGregorien()
      expect(new acte.Jour('11 nivôse an I').variables
        .republicain.a).toEqual(1);

      // Saisie erronée
      expect(new acte.Jour('31 frimaire an XVIII').variables.republicain
        .a).not.toBeDefined();
      expect(new acte.Jour('0 frimaire an XVIII').variables.republicain
        .a).not.toBeDefined();
      expect(new acte.Jour('-00 frimaire an XVIII').variables.republicain
        .a).not.toBeDefined();

      // Manque l'année
      expect(new acte.Jour('27 frimaire').variables.republicain.a)
        .not.toBeDefined();

      // Manque l'année et le jour
      expect(new acte.Jour('frimaire').variables.republicain.a)
        .not.toBeDefined();

      // Sous la borne mini
      expect(new acte.Jour('21 septembre 1792').variables.republicain
        .a).not.toBeDefined();
      expect(new acte.Jour('30 fructidor an 0').variables.republicain
        .a).not.toBeDefined();

      // Au delà de la borne maxi
      expect(new acte.Jour('1 janvier 1806').variables.republicain.a)
        .not.toBeDefined();
      expect(new acte.Jour('11 nivôse an 14').variables.republicain.a)
        .not.toBeDefined();

      // Min commune de Paris
      expect(new acte.Jour('26 ventose an LXXIX').variables
        .republicain.a).not.toBeDefined();

      // Max commune de Paris
      expect(new acte.Jour('9 prairial an LXXIX').variables
        .republicain.a).not.toBeDefined();
    });
  it(
    'new acte.Jour().variables.republicain.m = ' +
    'le mois républicain en chiffres',
    () => {
      expect(new acte.Jour('6 octobre 1793').variables.republicain.m)
        .toEqual(1);
    });
  it(
    'new acte.Jour().variables.republicain.jm = le jour du mois républicain ' +
    'en chiffres',
    () => {
      expect(new acte.Jour('6 octobre 1793').variables.republicain.jm)
        .toEqual(15);
    });
  it(
    'new acte.Jour().variables.republicain.d = la décade républicaine ' +
    'en chiffres',
    () => {
      expect(new acte.Jour('6 octobre 1793').variables.republicain.d)
        .toEqual(2);
    });
  it(
    'new acte.Jour().variables.republicain.jd = le jour de la décade ' +
    'républicaine en chiffres',
    () => {
      expect(new acte.Jour('6 octobre 1793').variables.republicain.jd)
        .toEqual(5);
    });
});
