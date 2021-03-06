/**
 * Pour calculer le nombre de jours juliens et la fraction de l'équinoxe
 * de septembre au méridien de Paris pour une année grégorienne.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|equinoxe_a_paris}
 * @param {Number} an - Année grégorienne
 * @return {Number} Nombre de jours juliens et fraction de l'équinoxe
 * de septembre au méridien de Paris pour une année grégorienne
 * @example
 * fractionEquinoxe(2015); // 2457288.855100263
 */
const fractionEquinoxe = (an) => {
  const equJED = equinoxe(an, 2);
  const equJD = equJED - (deltaT(an) / (24 * 60 * 60));
  const equAPP = equJD + equationDuTemps(equJED);
  const dtParis = (2 + (20 / 60.0) + (15 / (60 * 60.0))) / 360;

  return equAPP + dtParis;
};
