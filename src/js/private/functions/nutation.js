/**
 * Pour calculer la nutation en longitude (deltaPsi),
 * et obliquité (deltaEpsilon) pour un nombre de jours juliens.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|nutation}
 * @param  {Number} jj - Nombre de jours juliens
 * @return {Array} Nutation en [0] longitude et [1] obliquité en degrés
 * @example
 * nutation(2457333.5);
 * // [-0.000514859690208824, -0.0025586654864005456]
 */
const nutation = jj => {
  const ta = [];
  const t = (jj - 2451545.0) / 36525.0;
  const t2 = t * t;
  const t3 = t * t2;
  let dp = 0;
  let de = 0;

  ta[0] = degresVersRadians(297.850363 + 445267.11148 * t - 0.0019142 *
    t2 + t3 / 189474.0);
  ta[1] = degresVersRadians(357.52772 + 35999.05034 * t - 0.0001603 *
    t2 - t3 / 300000.0);
  ta[2] = degresVersRadians(134.96298 + 477198.867398 * t + 0.0086972 *
    t2 + t3 / 56250.0);
  ta[3] = degresVersRadians(93.27191 + 483202.017538 * t - 0.0036825 *
    t2 + t3 / 327270);
  ta[4] = degresVersRadians(125.04452 - 1934.136261 * t + 0.0020708 *
    t2 + t3 / 450000.0);
  for (let i = 0; i < 5; i++) {
    ta[i] -= (2 * Math.PI) * (Math.floor(ta[i] / (2 * Math.PI)));
  }
  const to10 = t / 10.0;

  for (let i = 0; i < 63; i++) {
    let ang = 0;

    for (let j = 0; j < 5; j++) {
      if (argNutMult[(i * 5) + j] !== 0) {
        ang += argNutMult[(i * 5) + j] * ta[j];
      }
    }
    dp += (argNutCoeff[(i * 4) + 0] +
      argNutCoeff[(i * 4) + 1] * to10) * Math.sin(ang);
    de += (argNutCoeff[(i * 4) + 2] +
      argNutCoeff[(i * 4) + 3] * to10) * Math.cos(ang);
  }

  return [dp / (3600.0 * 10000.0), de / (3600.0 * 10000.0)];
};
