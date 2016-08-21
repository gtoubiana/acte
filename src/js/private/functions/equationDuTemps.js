/**
 * Pour calculer l'équation du temps pour un moment précis.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|equationOfTime}
 * @param  {Number} jj - Nombre de jours juliens
 * @return {Number} Équation du temps pour une fraction de jour
 * @example
 * equationDuTemps(2457333.5); // 0.002839122270852552
 */
const equationDuTemps = jj => {
  const tau = (jj - jjAn2000Gregorien) / (siecleJulien * 10);
  const l0 = normaliserDegres(280.4664567 + (360007.6982779 * tau) +
    (0.03032028 * Math.pow(tau, 2)) + ((Math.pow(tau, 3)) / 49931) +
    (-((Math.pow(tau, 4)) / 15300)) + (-((Math.pow(tau, 5)) / 2000000))
  );
  const alpha = positionSoleil(jj)[10];
  const deltaPsi = nutation(jj)[0];
  const epsilon = obliquiteEcliptique(jj) + nutation(jj)[1];
  let E = l0 + (-0.0057183) + (-alpha) + (deltaPsi * cosinus(epsilon));

  E -= 20.0 * (Math.floor(E / 20.0));

  return E / (24 * 60);
};
