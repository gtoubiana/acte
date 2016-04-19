/**
 * Expressions régulières pour convertir les mois républicains
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @constant {Object}
 */
const regexpRepublicain = {
  'vend(é|e)miaire': '/1/',
  brumaire: '/2/',
  frimaire: '/3/',
  'niv(ô|o)se': '/4/',
  'pluvi(ô|o)se': '/5/',
  'vent(ô|o)se': '/6/',
  germinal: '/7/',
  'flor(é|e)al': '/8/',
  prairial: '/9/',
  messidor: '/10/',
  thermidor: '/11/',
  fructidor: '/12/',
  'san(s-)?culottide(s)?': '/13/',
  'jour(s)?\\scompl(é|e)mentaire(s)?': '/13/',
  'd(é|e)cade\\s(\\d){1,2}': '',
  '[^-()\\d/*+.]': '',
};
