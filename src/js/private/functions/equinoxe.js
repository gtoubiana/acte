/**
 * Pour calculer le nombre de jours juliens d'une equinoxe ou d'un solstice.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|equinox}
 * @param  {Number} an - Année
 * @param  {Number} item - L'item à calculer :
 * 0 = Equinoxe de Mars,
 * 1 = Solstice de Juin,
 * 2 = Equinoxe de Septembre,
 * 3 = Solstice de Décembre
 * @return {Number} Le nombre de jours juliens pour l'equinoxe ou solstice
 * @example
 * equinoxe(2015,0); // 2457102.4488504543
 */
const equinoxe = (an, item) => {
  let i;
  let j;
  let Jde0tab;
  let S;
  let Y;

  if (an < 1000) {
    Jde0tab = jde0Tab1000;
    Y = an / 1000;
  } else {
    Jde0tab = jde0Tab2000;
    Y = (an - 2000) / 1000;
  }
  const Jde0 = Jde0tab[item][0] + (Jde0tab[item][1] * Y) +
    (Jde0tab[item][2] * Math.pow(Y, 2)) + (Jde0tab[item][3] *
      Math.pow(Y, 3)) + (Jde0tab[item][4] * Math.pow(Y, 4));
  const T = (Jde0 - 2451545.0) / 36525;
  const W = (35999.373 * T) - 2.47;
  const deltaL = 1 + (0.0334 * cosinus(W)) + (0.0007 * cosinus(2 * W));

  S = 0;
  for (i = j = 0; i < 24; i++) {
    S += termesPerEquinoxes[j] *
      cosinus(termesPerEquinoxes[j + 1] +
        (termesPerEquinoxes[j + 2] * T));
    j += 3;
  }

  return Jde0 + ((S * 0.00001) / deltaL);
};
