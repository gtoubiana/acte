var test = require('tape').test
var acte = require('../../../../dist/acte.js')
var dateValide = function (jour, mois, an) {
  'use strict'
  var resultat = new Date(an, mois - 1, jour)

  resultat.setFullYear(an)
  return resultat
}

test('TEST 1', function(t) {
  t.equal('TEST1', 'TEST1', 'Test numéro 1')
  t.equal('TEST2', 'TEST 2', 'Test numéro 2')
  // t.equal(new acte.Jour('1793').variables.gregorien.od, dateValide(1, 1, 1793))
  // t.equal(new acte.Jour('octobre 1793').variables.gregorien.od, dateValide(1, 10, 1793))
  t.end()
})
