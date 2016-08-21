 /**
  * Pour calculer le nombre de jours entre deux dates.
  * @access private
  * @author Gilles Toubiana
  * @since 0.0.15
  * @license MIT
  * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
  * @param {Number} j1 - le jour du mois de la première date en chiffres
  * @param {Number} m1 - le mois de la date de la première date en chiffres
  * @param {Number} a1 - l'année de la date de la première date en chiffres
  * @param {Number} j2 - le jour du mois de la deuxième date en chiffres
  * @param {Number} m2 - le mois de la date de la deuxième date en chiffres
  * @param {Number} a2 - l'année de la date de la deuxième date en chiffres
  * @return {Number} le nombre de jours entre les deux dates
  * @example
  * periodeEnJours(1, 1, 2016, 15, 1, 2016]); // 15
  * periodeEnJours(15, 1, 2016, 1, 1, 2016]); // 15
  * periodeEnJours(1, 1, 2016, 1, 1, 2016]); // 1
  */
 const periodeEnJours = (j1, m1, a1, j2, m2, a2) => {
   const date1 = dateValide(j1, m1, a1);
   const date2 = dateValide(j2, m2, a2);
   const debut = (date2 > date1) ? date1 : date2;
   const fin = (date2 > date1) ? date2 : date1;

   return Math.ceil((fin - debut) / (1000 * 60 * 60 * 24)) + 1;
 };
