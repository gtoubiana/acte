 /**
  * Pour retourner un objet utilisable par le prototype .gregorien().
  * @access private
  * @author Gilles Toubiana
  * @since 0.0.15
  * @license MIT
  * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
  * @param {Object} d - un objet de Jour.variables
  * @param {Object} [pro] - La référence du prototype si nécessaire
  * @return {Object} result - un nouvel objet contenant toutes les valeurs
  * @example
  * objGregorien(tvg);
  */
 const objGregorien = (d, pro) => {
   const js = (pro === 'julien') ? jourSemaineJulien(d.jj) : d.od.getDay();
   const result = {

     // A = Année
     A: d.a,

     // D = Décade/Semaine dans le mois
     D: semaineComplete(d.jm, d.m, d.a, 1),

     // JA = Jour dans l'Année
     JA: periodeEnJours(1, 1, d.a, d.jm, d.m, d.a),

     // J = Jour dans le mois
     J: d.jm,

     // JS = Jour de la décade/semaine
     JS: js,

     // JSl = Jour de la décade/semaine en lettres
     JSl: jourGregorien[js],

     // M = Mois dans l'année
     M: d.m,

     // Ml = Mois dans l'année en lettres
     Ml: moisGregorien[d.m - 1],

     // S = Décade/Semaine dans l'année
     S: semaineComplete(d.jm, d.m, d.a, 0),
   };

   return result;
 };
