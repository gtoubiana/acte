/**
 * Expressions régulières pour convertir les mois gregoriens
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @constant {Array}
 */
const regexpGregorien = [{
  regexp: 'jan(v)?(\\.)?(ier)?',
  replace: '/1/',
}, {
  regexp: 'f(é|e)v(r)?(\\.)?(ier)?',
  replace: '/2/',
}, {
  regexp: 'mar(s|\\.)?',
  replace: '/3/',
}, {
  regexp: 'avr(il|\\.)?',
  replace: '/4/',
}, {
  regexp: 'mai',
  replace: '/5/',
}, {
  regexp: 'ju(i)?n',
  replace: '/6/',
}, {
  regexp: 'ju(i)?l(\\.|l)?(\\.)?(et)?',
  replace: '/7/',
}, {
  regexp: 'ao(u|û)(t|\\.)?',
  replace: '/8/',
}, {
  regexp: 'sep(t)?(\\.)?(embre)?',
  replace: '/9/',
}, {
  regexp: '7bre',
  replace: '/9/',
}, {
  regexp: 'oct(obre|\\.)?',
  replace: '/10/',
}, {
  regexp: '8bre',
  replace: '/10/',
}, {
  regexp: 'nov(embre|\\.)?',
  replace: '/11/',
}, {
  regexp: '9bre',
  replace: '/11/',
}, {
  regexp: 'd(é|e)c(embre|\\.)?',
  replace: '/12/',
}, {
  regexp: 'Xbre',
  replace: '/12/',
}, {
  regexp: '[^-()\\d/*+.]',
  replace: '',
}];
