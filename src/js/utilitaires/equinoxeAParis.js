/**
 * Pour calculer le nombre de jours juliens correspondant à l'équinoxe
 * de septembre au méridien de Paris, pour une année grégorienne
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|paris_equinoxe_jd}
 * @param {Number} an - Année grégorienne
 * @return {Number} Nombre de jours juliens pour l'équinoxe de septembre
 * @example
 * equinoxeAParis(2015); // 2457288.5
 */
var equinoxeAParis = function equinoxeAParis(an) {
  var ep = fractionEquinoxe(an);

  return Math.floor(ep - 0.5) + 0.5;
};
