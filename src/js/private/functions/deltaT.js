/**
 * Pour calculer la différence entre temps terrestre et temps universel,
 * en secondes
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|deltat}
 * @param {Number} an - Année
 * @return {Number} Différence entre temps terrestre et temps universel,
 * en secondes
 * @example
 * deltaT(2015); // 86.41924999999999
 */
const deltaT = an => {
  let dt;

  if ((an >= 1620) && (an <= 2012)) {
    const i = Math.floor((an - 1620) / 2);
    const f = ((an - 1620) / 2) - i;

    dt = delta[i] + ((delta[i + 1] - delta[i]) * f);
  } else {
    const t = (an - 2000) / 100;

    if (an < 948) {
      dt = 2177 + (497 * t) + (44.1 * t * t);
    } else {
      dt = 102 + (102 * t) + (25.3 * t * t);
      if ((an > 2000) && (an < 2100)) {
        dt += 0.37 * (an - 2100);
      }
    }
  }

  return dt;
};
