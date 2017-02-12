 /**
  * Pour retourner un objet utilisable par le prototype .gregorien().
  * @access private
  * @author Gilles Toubiana
  * @since 0.0.15
  * @license MIT
  * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
  * @param {Object} d - un objet de Jour.variables
  * @param {Object} [pro] - Une référence issue du prototype si nécessaire
  * @return {Object} result - un nouvel objet contenant toutes les valeurs
  * @example
  * objGregorien(tvg);
  */
 const objGregorien = (d, pro) => {
   let js;

   if (pro === 'julAp1582') {
     js = jourSemaineJulien(d.jj);
   } else if (pro === 'julAv1582') {
     js = jourSemaineJulien(d.jj);
     js = (js - 4) < 0 ? js + 3 : js - 4;
   } else {
     js = d.od.getDay();
   }
   const result = {

     // A = Année
     A: d.a,

     // M = Mois dans l'année
     M: d.m,

     // J = Jour dans le mois
     J: d.jm,

     // D = Décade/Semaine dans le mois
     D: semaineComplete(d.jm, d.m, d.a, 1),

     // S = Décade/Semaine dans l'année
     S: semaineComplete(d.jm, d.m, d.a, 0),

     // JA = Jour dans l'Année
     JA: periodeEnJours(1, 1, d.a, d.jm, d.m, d.a),

     // JS = Jour de la décade/semaine
     JS: js,

     // Ml = Mois dans l'année en lettres
     Ml: moisGregorien[d.m - 1],

     // JSl = Jour de la décade/semaine en lettres
     JSl: jourSemaineGregorienne[js],
   };

   return result;
 };
