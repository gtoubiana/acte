// http://jasmine.github.io/edge/introduction.html
describe('new acte.Jour().julien()', () => {
  // Valeurs par défaut
  it(
    'new acte.Jour().julien() = la date julienne ' +
    'formatée par défaut.',
    () => {
      expect(new acte.Jour('1/1/1630').julien())
        .toEqual('22 décembre 1629');
    });
});
