describe('Public functions', () => {
  it('acte.arabeVersRomain()', () => {
    expect(acte.arabeVersRomain(2012))
      .toEqual('MMXII');
  });
  it('acte.nombreEnLettres()', () => {
    expect(acte.nombreEnLettres(2371))
      .toEqual('Deux-mille-trois-cent-soixante-et-onze');
    expect(acte.nombreEnLettres(1799, 1))
      .toEqual('Mille sept cent quatre-vingt-dix-neuf');
  });
  it('acte.nombreOrdinal()', () => {
    expect(acte.nombreOrdinal(1, 'er', 'e'))
      .toEqual('1er');
    expect(acte.nombreOrdinal(1, 're', 'e'))
      .toEqual('1re');
    expect(acte.nombreOrdinal(2, 'er', 'e'))
      .toEqual('2e');
  });
  it('acte.ordinauxEnLettres()', () => {
    expect(acte.ordinauxEnLettres('Un'))
      .toEqual('Premier');
    expect(acte.ordinauxEnLettres('Un', 1))
      .toEqual('Première');
    expect(acte.ordinauxEnLettres('Deux'))
      .toEqual('Deuxième');
    expect(acte.ordinauxEnLettres('Vingt-trois'))
      .toEqual('Vingt-troisième');
  });
  it('acte.prefixeZero()', () => {
    expect(acte.prefixeZero(20))
      .toEqual(20);
    expect(acte.prefixeZero(9))
      .toEqual('09');
    expect(acte.prefixeZero(0))
      .toEqual(0);
    expect(acte.prefixeZero(-4))
      .toEqual(-4);
  });
  it('acte.premierOrdinalEnLettres()', () => {
    expect(acte.premierOrdinalEnLettres('Un'))
      .toEqual('Premier');
    expect(acte.premierOrdinalEnLettres('Un', 1))
      .toEqual('Première');
    expect(acte.premierOrdinalEnLettres('Deux'))
      .toEqual('Deux');
    expect(acte.premierOrdinalEnLettres('Vingt-trois'))
      .toEqual('Vingt-trois');
  });
});
