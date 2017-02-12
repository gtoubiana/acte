/**
 * Expressions régulières pour convertir les mois républicains.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @constant {Array}
 */
const regexpRepublicain = [{
  e: 'vend(é|e)miaire',
  r: '/1/',
}, {
  e: 'brumaire',
  r: '/2/',
}, {
  e: 'frimaire',
  r: '/3/',
}, {
  e: 'niv(ô|o)se',
  r: '/4/',
}, {
  e: 'pluvi(ô|o)se',
  r: '/5/',
}, {
  e: 'vent(ô|o)se',
  r: '/6/',
}, {
  e: 'germinal',
  r: '/7/',
}, {
  e: 'flor(é|e)al',
  r: '/8/',
}, {
  e: 'prairial',
  r: '/9/',
}, {
  e: 'messidor',
  r: '/10/',
}, {
  e: 'thermidor',
  r: '/11/',
}, {
  e: 'fructidor',
  r: '/12/',
}, {
  e: 'san(s-)?culottide(s)?',
  r: '/13/',
}, {
  e: 'jour(s)?\\scompl(é|e)mentaire(s)?',
  r: '/13/',
}, {
  e: 'd(é|e)cade\\s(\\d){1,2}',
  r: '',
}, {
  e: '[^-()\\d/*+.]',
  r: '',
}];
