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
var deltaT = function deltaT(an) {
  var dt;
  var f;
  var i;
  var t;

  if ((an >= 1620) && (an <= 2012)) {
    i = Math.floor((an - 1620) / 2);
    f = ((an - 1620) / 2) - i;
    dt = DELTA[i] + ((DELTA[i + 1] - DELTA[i]) * f);
  } else {
    t = (an - 2000) / 100;
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
