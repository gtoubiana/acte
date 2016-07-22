/**
 * Pour calculer la différence entre temps terrestre et temps universel,
 * en secondes.
 * @access private
 * @author John Walker & Gilles Toubiana
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|deltat} |
 * {@link http://eclipse.gsfc.nasa.gov/SEcat5/deltatpoly.html|Expressions} |
 * {@link http://www.projectpluto.com/dt.htm|Formules}
 * @param {Number} an - Année
 * @return {Number} Différence entre temps terrestre et temps universel,
 * en secondes
 * @example
 * deltaT(2015); // 67.855
 */

const deltaT = an => {
  let dt;
  const maxindex = 1618 + delta.length * 2;

  if ((an >= 1620) && (an < maxindex)) {
    const i = (an - 1620) / 2;

    dt = ((an - 1620) % 2) ? ((delta[i - 0.5] + delta[i + 0.5]) / 2) :
      delta[i];
  } else {
    const t = (an - 2000) / 100;

    if (an === maxindex) {
      dt = delta[delta.length - 1];
    } else if (an < 948) {
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
