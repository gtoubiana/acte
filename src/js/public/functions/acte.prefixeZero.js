 /**
  * Pour ajouter un préfixe de 0 à un nombre compris entre 1 et 9.
  * @memberof acte
  * @access public
  * @author Gilles Toubiana
  * @since 0.0.17
  * @license MIT
  * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
  * @param {Number} n - le nombre à préfixer
  * @return {String} le nombre avec préfixe zéro
  * @example
  * acte.prefixeZero(20); // 20
  * acte.prefixeZero(9); // '09'
  * acte.prefixeZero(0); // 0
  * acte.prefixeZero(-4); // -4
  */
 acte.prefixeZero = (n) => {
   const result = n < 10 && n > 0 ? `0${n}` : n;

   return result;
 };
