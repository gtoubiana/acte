/**
 * Nombre de jours juliens correspondants à l'abrogation du calendrier
 * républicain dans le journal officiel lors de la Commune de Paris
 * en 1871
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @constant {Number}
 * @example
 * jjVersGregorien(2404575.5); // [1871, 5, 28]
 * jjVersGregorien(jjFinCommuneDeParis); // [1871, 5, 28]
 * jjVersRepublicain(2404575.5); // [79, 9, 1, 8]
 * jjVersRepublicain(jjFinCommuneDeParis); // [79, 9, 1, 8]
 */
const jjFinCommuneDeParis = 2404575.5;
