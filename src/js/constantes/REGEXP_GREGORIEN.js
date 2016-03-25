/**
 * Expressions régulières pour convertir les mois gregoriens
 * @access private
 * @author Gilles Toubiana
 * @since 0.0.1
 * @see {@link https://github.com/gtoubiana/acte|Projet sur GitHub}
 * @constant {Object}
 */
var REGEXP_GREGORIEN = {
  'jan(v)?(\\.)?(ier)?': '/1/',
  'f(é|e)v(r)?(\\.)?(ier)?': '/2/',
  'mar(s|\\.)?': '/3/',
  'avr(il|\\.)?': '/4/',
  mai: '/5/',
  'ju(i)?n': '/6/',
  'ju(i)?l(\\.|l)?(\\.)?(et)?': '/7/',
  'ao(u|û)(t|\\.)?': '/8/',
  'sep(t)?(\\.)?(embre)?': '/9/',
  '7bre': '/9/',
  'oct(obre|\\.)?': '/10/',
  '8bre': '/10/',
  'nov(embre|\\.)?': '/11/',
  '9bre': '/11/',
  'd(é|e)c(embre|\\.)?': '/12/',
  Xbre: '/12/',
  '[^-()\\d/*+.]': ''
};
