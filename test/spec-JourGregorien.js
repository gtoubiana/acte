// http://jasmine.github.io/edge/introduction.html
describe('new acte.Jour().gregorien()', () => {
  /*
  Statements   : 66.51% ( 437/657 ), 23 ignored
  Branches     : 38.03% ( 135/355 ), 21 ignored
  Functions    : 86.96% ( 80/92 ), 1 ignored
  Lines        : 66.46% ( 436/656 )
   */
  it(
    'new acte.Jour().gregorien() = la date grégorienne ' +
    'formatée par défaut.',
    () => {
      expect(new acte.Jour('1/1/1600').gregorien())
        .toEqual('1 janvier 1600');
    });

  /*
  Statements   : 74.28% ( 488/657 ), 23 ignored
  Branches     : 48.45% ( 172/355 ), 21 ignored
  Functions    : 92.39% ( 85/92 ), 1 ignored
  Lines        : 74.24% ( 487/656 )
  */
});
