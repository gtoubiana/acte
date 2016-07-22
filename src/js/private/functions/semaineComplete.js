 /**
  * Pour calculer le nombre de semaines depuis le début de l'année ou du mois.
  * @access private
  * @author Gilles Toubiana
  * @since 0.0.15
  * @license MIT
  * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
  * @param {Number} j - le jour du mois grégorien
  * @param {Number} m - le mois grégorien
  * @param {Number} a - l'année grégorienne
  * @param {Number} [mois] - par défaut, le calcul correspond à l'année.
  * Pour calculer sur le mois en cours, il suffit d'ajouter un argument.
  * @return {Number} le nombre de semaines
  * @example
  * semaineComplete(14, 7, 2016); // 28
  * semaineComplete(14, 7, 2016, 1); // 2
  */
 const semaineComplete = (j, m, a, mois) => {
   // Si l'argument mois existe, calcule depuis le début du mois.
   // sinon depuis le début de l'année
   const x = (mois) ? m : 1;
   let jourSemaine = dateValide(1, x, a).getDay();

   jourSemaine = (jourSemaine === 0) ? 7 : jourSemaine;

   // Si le premier jour < jeudi (4), ajouter une semaine
   const n = (jourSemaine <= 4) ? 1 : 0;
   const nombreSemaines = (periodeEnJours(1, x, a, j, m, a) - (8 -
     jourSemaine)) / 7;
   const semainesValides = (nombreSemaines > parseInt(nombreSemaines, 10)) ?
     parseInt(nombreSemaines, 10) + n + 1 : parseInt(nombreSemaines, 10) +
     n;

   return semainesValides;
 };
