# Constantes privées utilisées dans Acte

## Table des matières

* [anneeTropique](#anneeTropique) : <code>Nombre</code> ℗
* [argNutCoeff](#argNutCoeff) : <code>Tableau</code> ℗
* [argNutMult](#argNutMult) : <code>Tableau</code> ℗
* [delta](#delta) : <code>Tableau</code> ℗
* [jde0Tab1000](#jde0Tab1000) : <code>Tableau</code> ℗
* [jde0Tab2000](#jde0Tab2000) : <code>Tableau</code> ℗
* [jjAn1Gregorien](#jjAn1Gregorien) : <code>Nombre</code> ℗
* [jjAn2000Gregorien](#jjAn2000Gregorien) : <code>Nombre</code> ℗
* [jjDebutCommuneDeParis](#jjDebutCommuneDeParis) : <code>Nombre</code> ℗
* [jjDebutGregorien](#jjDebutGregorien) : <code>Nombre</code> ℗
* [jjDebutRepublicain](#jjDebutRepublicain) : <code>Nombre</code> ℗
* [jjFinCommuneDeParis](#jjFinCommuneDeParis) : <code>Nombre</code> ℗
* [jjFinRepublicain](#jjFinRepublicain) : <code>Nombre</code> ℗
* [regexpGregorien](#regexpGregorien) : <code>Tableau</code> ℗
* [regexpRepublicain](#regexpRepublicain) : <code>Tableau</code> ℗
* [siecleJulien](#siecleJulien) : <code>Nombre</code> ℗
* [termesPerEquinoxes](#termesPerEquinoxes) : <code>Tableau</code> ℗

* * *
<a name="anneeTropique"></a>

## anneeTropique : <code>Nombre</code> ℗
Nombre de jours, sur Terre, pour que le Soleil retourne à la même
position
dans le cycle des saisons

**Type** : Constante  
**Accès** : privé  
**Voir** : [TropicalYear](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="argNutCoeff"></a>

## argNutCoeff : <code>Tableau</code> ℗
Coefficient des sinus et cosinus de l'argument pour la nutation

**Type** : Constante  
**Accès** : privé  
**Voir** : [nutArgCoeff](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="argNutMult"></a>

## argNutMult : <code>Tableau</code> ℗
Termes périodiques pour la nutation en longitude et obliquité

**Type** : Constante  
**Accès** : privé  
**Voir** : [nutArgMult](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="delta"></a>

## delta : <code>Tableau</code> ℗
Tableau des Delta T (différence entre Temps universel et temps terrestre)
tous les 2 ans de 1620 à 2014

**Type** : Constante  
**Accès** : privé  
**Voir** : [deltaTtab](http://fourmilab.ch/documents/calendar/) |
[Valeurs](http://maia.usno.navy.mil/ser7/deltat.data) |
[Predictions](http://maia.usno.navy.mil/ser7/deltat.preds) |
[Expressions](http://eclipse.gsfc.nasa.gov/SEcat5/deltatpoly.html)  
**Depuis** : 0.0.1  
**Auteur** : John Walker & Gilles Toubiana  
<a name="jde0Tab1000"></a>

## jde0Tab1000 : <code>Tableau</code> ℗
Jours juliens des équinoxes avant l'an 1000

**Type** : Constante  
**Accès** : privé  
**Voir** : [JDE0tab1000](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="jde0Tab2000"></a>

## jde0Tab2000 : <code>Tableau</code> ℗
Jours juliens des équinoxes de l'an 1000 à l'an 2000

**Type** : Constante  
**Accès** : privé  
**Voir** : [JDE0tab2000](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="jjAn1Gregorien"></a>

## jjAn1Gregorien : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'an 1 gregorien

**Type** : Constante  
**Accès** : privé  
**Voir** : [GREGORIAN_EPOCH](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Exemple** :  
```js
jjVersGregorien(1721425.5); // [1, 1, 1]
jjVersGregorien(jjAn1Gregorien); // [1, 1, 1]
```
<a name="jjAn2000Gregorien"></a>

## jjAn2000Gregorien : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'an 2000 grégorien

**Type** : Constante  
**Accès** : privé  
**Voir** : [J2000](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Exemple** :  
```js
jjVersGregorien(2451545.0); // [2000, 1, 1]
jjVersGregorien(jjAn2000Gregorien); // [2000, 1, 1]
```
<a name="jjDebutCommuneDeParis"></a>

## jjDebutCommuneDeParis : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'adoption du calendrier
républicain dans le journal officiel lors de la Commune de Paris
en 1871

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Exemple** :  
```js
jjVersGregorien(2404504.5); // [1871, 3, 18]
jjVersGregorien(jjDebutCommuneDeParis); // [1871, 3, 18]
jjVersRepublicain(2404504.5); // [79, 6, 3, 7]
jjVersRepublicain(jjDebutCommuneDeParis); // [79, 6, 3, 7]
```
<a name="jjDebutGregorien"></a>

## jjDebutGregorien : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'adoption du calendrier
grégorien

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte.js)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Exemple** :  
```js
jjVersGregorien(2299160.5); // [1582, 10, 15]
jjVersGregorien(jjDebutGregorien); // [1582, 10, 15]
jjVersJulien(2299160.5); // [1582, 10, 5]
jjVersJulien(jjDebutGregorien); // [1582, 10, 5]
```
<a name="jjDebutRepublicain"></a>

## jjDebutRepublicain : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'an 1 républicain

**Type** : Constante  
**Accès** : privé  
**Voir** : [FRENCH_REVOLUTIONARY_EPOCH](fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Exemple** :  
```js
jjVersGregorien(2375839.5); // [1792, 9, 22]
jjVersGregorien(jjDebutRepublicain); // [1792, 9, 22]
jjVersRepublicain(2375839.5); // [1, 1, 1, 1]
jjVersRepublicain(jjDebutRepublicain); // [1, 1, 1, 1]
```
<a name="jjFinCommuneDeParis"></a>

## jjFinCommuneDeParis : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'abrogation du calendrier
républicain dans le journal officiel lors de la Commune de Paris
en 1871

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Exemple** :  
```js
jjVersGregorien(2404575.5); // [1871, 5, 28]
jjVersGregorien(jjFinCommuneDeParis); // [1871, 5, 28]
jjVersRepublicain(2404575.5); // [79, 9, 1, 8]
jjVersRepublicain(jjFinCommuneDeParis); // [79, 9, 1, 8]
```
<a name="jjFinRepublicain"></a>

## jjFinRepublicain : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'abrogation du calendrier
républicain

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Exemple** :  
```js
jjVersGregorien(2380686.5); // [1805, 12, 31]
jjVersGregorien(jjFinRepublicain); // [1805, 12, 31]
jjVersRepublicain(2380686.5); // [14, 4, 1, 10]
jjVersRepublicain(jjFinRepublicain); // [14, 4, 1, 10]
```
<a name="regexpGregorien"></a>

## regexpGregorien : <code>Tableau</code> ℗
Expressions régulières pour convertir les mois gregoriens

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
<a name="regexpRepublicain"></a>

## regexpRepublicain : <code>Tableau</code> ℗
Expressions régulières pour convertir les mois républicains

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
<a name="siecleJulien"></a>

## siecleJulien : <code>Nombre</code> ℗
Nombre de jours dans un siècle julien

**Type** : Constante  
**Accès** : privé  
**Voir** : [JulianCentury](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="termesPerEquinoxes"></a>

## termesPerEquinoxes : <code>Tableau</code> ℗
Termes périodiques pour obtenir des temps réels

**Type** : Constante  
**Accès** : privé  
**Voir** : [EquinoxpTerms](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
* * *
Créé et maintenu par [@gtoubiana](https://github.com/gtoubiana/).<br>
Code sous licence [MIT](https://github.com/gtoubiana/acte/blob/gh-pages/LICENSE), documentation sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).
