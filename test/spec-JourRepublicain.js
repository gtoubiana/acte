// http://jasmine.github.io/edge/introduction.html
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
    });
});
