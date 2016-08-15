 /**
  * Pour retourner un objet gregorien utilisable par le prototype gregorien().
  * @access private
  * @author Gilles Toubiana
  * @since 0.0.15
  * @license MIT
  * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
  * @param {Object} d - un objet de Jour.variables
  * @return {Object} result - un nouvel objet contenat toutes les valeurs
  * @example
  * objGregorien(tvg);
  */
 const objGregorien = (d) => {
   const result = {
     A: d.a,
     D: semaineComplete(d.jm, d.m, d.a, 1),
     JA: periodeEnJours(1, 1, d.a, d.jm, d.m, d.a),
     J: d.jm,
     JS: d.od.getDay(),
     JSl: jourGregorien[d.od.getDay()],
     M: d.m,
     Ml: moisGregorien[d.m - 1],
     S: semaineComplete(d.jm, d.m, d.a, 0),
   };

   return result;
 };
