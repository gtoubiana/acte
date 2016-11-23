/**
 * Expressions régulières pour convertir les mois gregoriens.
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @constant {Array}
 */
const regexpGregorien = [{
  e: 'jan(v)?(\\.)?(ier)?',
  r: '/1/',
}, {
  e: 'Jer',
  r: '/1/',
}, {
  e: 'f(é|e)v(r)?(\\.)?(ier)?',
  r: '/2/',
}, {
  e: 'Fer',
  r: '/2/',
}, {
  e: 'mardi',
  r: '',
}, {
  e: 'mar(s|\\.)?',
  r: '/3/',
}, {
  e: 'avr(il|\\.)?',
  r: '/4/',
}, {
  e: 'mai',
  r: '/5/',
}, {
  e: 'ju(i)?n',
  r: '/6/',
}, {
  e: 'ju(i)?l(\\.|l)?(\\.)?(et)?',
  r: '/7/',
}, {
  e: 'Jet',
  r: '/7/',
}, {
  e: 'ao(u|û)(t|\\.)?',
  r: '/8/',
}, {
  e: 'sep(t)?(\\.)?(embre)?',
  r: '/9/',
}, {
  e: '7bre',
  r: '/9/',
}, {
  e: 'oct(obre|\\.)?',
  r: '/10/',
}, {
  e: '8bre',
  r: '/10/',
}, {
  e: 'nov(embre|\\.)?',
  r: '/11/',
}, {
  e: '9bre',
  r: '/11/',
}, {
  e: 'd(é|e)c(embre|\\.)?',
  r: '/12/',
}, {
  e: 'Xbre',
  r: '/12/',
}, {
  e: '10bre',
  r: '/12/',
}, {
  e: '[^-()\\d/*+.]',
  r: '',
}];
