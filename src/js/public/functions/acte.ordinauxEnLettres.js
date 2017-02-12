 /**
  * Pour convertir les nombres en toutes lettres en nombres ordinaux.
  * @memberof acte
  * @access public
  * @author Gilles Toubiana
  * @since 0.0.17
  * @license MIT
  * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
  * @param {Number} saisie - le nombre en lettres
  * @param {String} [genre] - par défaut, le genre masculin est appliqué.
  * Pour utiliser le genre féminin, il suffit d'ajouter un argument.
  * @return {String} le nombre ordinal en lettres
  * @example
  * acte.ordinauxEnLettres('Un'); // 'Premier'
  * acte.ordinauxEnLettres('Un', 1); // 'Première'
  * acte.ordinauxEnLettres('Deux'); // 'Deuxième'
  * acte.ordinauxEnLettres('Vingt-trois'); // 'Vingt-troisième'
  */
 acte.ordinauxEnLettres = (saisie, genre) => {
   const str = saisie.toString();
   let result;

   // Dernier caractère
   /* eslint-disable indent */
   switch (str.slice(-1)) {
   case 't':
   case 'x':
     result = `${str}ième`;
     break;
   case 'q':
     result = `${str}uième`;
     break;
   case 'f':
     result = `${str.slice(0, str.length - 1)}vième`;
     break;
   case 'e':
     result = `${str.slice(0, str.length - 1)}ième`;
     break;
   case 's':
     result = (str.slice(-2) === 'ts') ?
       `${str.slice(0, str.length - 1)}ième` : `${str}ième`;
     break;
   case 'n':
     if (str.slice(-5) === 'et-un' || str.slice(-5) === 'et un') {
       result = `${str}ième`;
     } else {
       result = acte.premierOrdinalEnLettres(str, genre);
     }
     break;
   default:
     result = `${str}ième`;
   }

   /* eslint-enable indent */
   return result;
 };
