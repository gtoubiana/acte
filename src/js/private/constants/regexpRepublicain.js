/**
 * Expressions régulières pour convertir les mois républicains
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @constant {Array}
 */
const regexpRepublicain = [{
  regexp: 'vend(é|e)miaire',
  replace: '/1/',
}, {
  regexp: 'brumaire',
  replace: '/2/',
}, {
  regexp: 'frimaire',
  replace: '/3/',
}, {
  regexp: 'niv(ô|o)se',
  replace: '/4/',
}, {
  regexp: 'pluvi(ô|o)se',
  replace: '/5/',
}, {
  regexp: 'vent(ô|o)se',
  replace: '/6/',
}, {
  regexp: 'germinal',
  replace: '/7/',
}, {
  regexp: 'flor(é|e)al',
  replace: '/8/',
}, {
  regexp: 'prairial',
  replace: '/9/',
}, {
  regexp: 'messidor',
  replace: '/10/',
}, {
  regexp: 'thermidor',
  replace: '/11/',
}, {
  regexp: 'fructidor',
  replace: '/12/',
}, {
  regexp: 'san(s-)?culottide(s)?',
  replace: '/13/',
}, {
  regexp: 'jour(s)?\\scompl(é|e)mentaire(s)?',
  replace: '/13/',
}, {
  regexp: 'd(é|e)cade\\s(\\d){1,2}',
  replace: '',
}, {
  regexp: '[^-()\\d/*+.]',
  replace: '',
}];
