 /**
  * Pour retourner un objet utilisable par le prototype .republicain().
  * @access private
  * @author Gilles Toubiana
  * @since 0.0.15
  * @license MIT
  * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
  * @param {Object} d - un objet de Jour.variables
  * @return {Object} result - un nouvel objet contenant toutes les valeurs
  * @example
  * objGregorien(tvg);
  */
 const objRepublicain = (d) => {
   const result = {

     // A = Année
     A: d.a,

     // D = Décade/Semaine dans le mois
     D: d.d,

     // JA = Jour dans l'Année
     JA: (d.m - 1) * 30 + d.jm,

     // J = Jour dans le mois
     J: d.jm,

     // JS = Jour de la décade/semaine
     JS: d.jd,

     // JSl = Jour de la décade/semaine en lettres
     JSl: jourRepublicain[d.jd - 1],

     // M = Mois dans l'année
     M: d.m,

     // Ml = Mois dans l'année en lettres
     Ml: moisRepublicain[d.m - 1],

     // S = Décade/Semaine dans l'année
     S: (d.m - 1) * 3 + d.d,
   };

   return result;
 };
