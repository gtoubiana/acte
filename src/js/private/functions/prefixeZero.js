 /**
  * Pour ajouter un préfixe de 0 à un nombre compris entre 1 et 9.
  * @access private
  * @author Gilles Toubiana
  * @since 0.0.15
  * @license MIT
  * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
  * @param {Number} n - le nombre à préfixer
  * @return {String} le nombre avec préfixe zéro
  * @example
  * prefixeZero(20); // 20
  * prefixeZero(9); // "09"
  * prefixeZero(0); // 0
  * prefixeZero(-4); // -4
  */
 const prefixeZero = (n) => {
   const result = n < 10 && n > 0 ? `0${n}` : n;

   return result;
 };
