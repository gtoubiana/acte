/* istanbul ignore if  */
if (!Array.prototype.reduce) {
  // jscs:disable
  /**
   * Prothèse d'émulation (polyfill) de Array.prototype.reduce pour IE8.
   * @access private
   * @since 0.0.15
   * @license Unknown
   * @see {@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce|Mozilla}
   * @see {@link https://github.com/es-shims/es5-shim|es5-shim}
   * @param {Function} callback - La fonction à exécuter sur chaque valeur de la liste
   * @return {Number|Array} La valeur obtenue grâce à la fonction de réduction
   * @example
   * [0, 1, 2, 3].reduce((a, b)=> a + b, 0); // 6
   */
  Array.prototype.reduce = function(callback/*, initialValue*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.reduce appelé sur null ou undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' n\'est pas une fonction');
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in t)) {
        k++;
      }
      if (k >= len) {
        throw new TypeError('Réduction de tableau vide sans valeur initiale');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
  // jscs:enable
}
