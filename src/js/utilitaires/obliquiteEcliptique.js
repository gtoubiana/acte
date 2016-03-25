/**
 * Pour calculer l'obliquité de l'écliptique pour un nombre de jours juliens
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @license Domaine public
 * @see {@link http://fourmilab.ch/documents/calendar/|obliqeq}
 * @param  {Number} jj - Nombre de jours juliens
 * @return {Number} Obliquité de l'écliptique
 * @example
 * obliquiteEcliptique(2457333.5); // 23.437230456425635
 */
var obliquiteEcliptique = function obliquiteEcliptique(jj) {
  var oTerms = [(-4680.93), (-1.55), 1999.25, (-51.38), (-249.67),
    (-39.05), 7.12, 27.87, 5.79, 2.45
  ];
  var u = (jj - JJ_AN2000_GREGORIEN) / (SIECLE_JULIEN * 100);
  var v = u;
  var eps = 23 + (26 / 60.0) + (21.448 / 3600.0);
  var i;

  if (Math.abs(u) < 1.0) {
    for (i = 0; i < 10; i++) {
      eps += (oTerms[i] / 3600.0) * v;
      v *= u;
    }
  }
  return eps;
};
