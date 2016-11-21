# Constantes privées utilisées dans Acte

## Table des matières

* [anneeMax](#anneeMax) : <code>Nombre</code> ℗
* [anneeTropique](#anneeTropique) : <code>Nombre</code> ℗
* [argNutCoeff](#argNutCoeff) : <code>Tableau</code> ℗
* [argNutMult](#argNutMult) : <code>Tableau</code> ℗
* [dateDebutGregorien](#dateDebutGregorien) : <code>Tableau</code> ℗
* [dateFinJulien](#dateFinJulien) : <code>Tableau</code> ℗
* [delta](#delta) : <code>Tableau</code> ℗
* [dixainesEnLettres](#dixainesEnLettres) : <code>Tableau</code> ℗
* [jde0Tab1000](#jde0Tab1000) : <code>Tableau</code> ℗
* [jde0Tab2000](#jde0Tab2000) : <code>Tableau</code> ℗
* [jjAn1Gregorien](#jjAn1Gregorien) : <code>Nombre</code> ℗
* [jjAn2000Gregorien](#jjAn2000Gregorien) : <code>Nombre</code> ℗
* [jjDebutCommuneDeParis](#jjDebutCommuneDeParis) : <code>Nombre</code> ℗
* [jjDebutRepublicain](#jjDebutRepublicain) : <code>Nombre</code> ℗
* [jjFinCommuneDeParis](#jjFinCommuneDeParis) : <code>Nombre</code> ℗
* [jjFinRepublicain](#jjFinRepublicain) : <code>Nombre</code> ℗
* [jourGregorien](#jourGregorien) : <code>Tableau</code> ℗
* [jourRepublicain](#jourRepublicain) : <code>Tableau</code> ℗
* [joursDansLeMois](#joursDansLeMois) : <code>Tableau</code> ℗
* [moisGregorien](#moisGregorien) : <code>Tableau</code> ℗
* [moisRepublicain](#moisRepublicain) : <code>Tableau</code> ℗
* [regexpGregorien](#regexpGregorien) : <code>Tableau</code> ℗
* [regexpRepublicain](#regexpRepublicain) : <code>Tableau</code> ℗
* [siecleJulien](#siecleJulien) : <code>Nombre</code> ℗
* [termesPerEquinoxes](#termesPerEquinoxes) : <code>Tableau</code> ℗
* [unitesEnLettres](#unitesEnLettres) : <code>Tableau</code> ℗

* * *
<a name="anneeMax"></a>

## anneeMax : <code>Nombre</code> ℗
Année maximale acceptée pour les calculs grégoriens, juliens
ou républicains.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.17  
**Auteur** : Gilles Toubiana  
<a name="anneeTropique"></a>

## anneeTropique : <code>Nombre</code> ℗
Nombre de jours, sur Terre, pour que le Soleil retourne à la même
position
dans le cycle des saisons.

**Type** : Constante  
**Accès** : privé  
**Voir** : [TropicalYear](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="argNutCoeff"></a>

## argNutCoeff : <code>Tableau</code> ℗
Coefficient des sinus et cosinus de l'argument pour la nutation.

**Type** : Constante  
**Accès** : privé  
**Voir** : [nutArgCoeff](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="argNutMult"></a>

## argNutMult : <code>Tableau</code> ℗
Termes périodiques pour la nutation en longitude et obliquité.

**Type** : Constante  
**Accès** : privé  
**Voir** : [nutArgMult](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="dateDebutGregorien"></a>

## dateDebutGregorien : <code>Tableau</code> ℗
Date de l'adoption du calendrier grégorien.

**Type** : Constante  
**Accès** : privé  
**See**

- [Projet sur GitHub](https://github.com/gtoubiana/acte.js)
- https://fr.wikipedia.org/wiki/Passage_du_calendrier_julien_au_calendrier_gr%C3%A9gorien

**Depuis** : 0.0.17  
**Auteur** : Gilles Toubiana  
**Exemple** :  
```js
gregorienVersJj(dateDebutGregorien[2], dateDebutGregorien[1],
dateDebutGregorien[0]);
```
<a name="dateFinJulien"></a>

## dateFinJulien : <code>Tableau</code> ℗
Date de fin d'utilisation du calendrier julien.

**Type** : Constante  
**Accès** : privé  
**See**

- [Projet sur GitHub](https://github.com/gtoubiana/acte.js)
- https://fr.wikipedia.org/wiki/Passage_du_calendrier_julien_au_calendrier_gr%C3%A9gorien

**Depuis** : 0.0.17  
**Auteur** : Gilles Toubiana  
**Exemple** :  
```js
dateValide(dateFinJulien[0], dateFinJulien[1], dateFinJulien[2]);
```
<a name="delta"></a>

## delta : <code>Tableau</code> ℗
Tableau des Delta T différence entre Temps universel et temps terrestre
en secondes, observées pour les années paires de 1620 à 2016.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Valeurs](https://www.staff.science.uu.nl/~gent0113/deltat/deltat_modern.htm) |
[IERS](http://maia.usno.navy.mil/ser7/deltat.data) |
[Predictions](http://maia.usno.navy.mil/ser7/deltat.preds)  
**Depuis** : 0.0.15  
**Auteur** : F.R. Stephenson & L.V. Morrison & IERS & Gilles Toubiana  
<a name="dixainesEnLettres"></a>

## dixainesEnLettres : <code>Tableau</code> ℗
Dixaines en toutes lettres.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
<a name="jde0Tab1000"></a>

## jde0Tab1000 : <code>Tableau</code> ℗
Jours juliens des équinoxes avant l'an 1000.

**Type** : Constante  
**Accès** : privé  
**Voir** : [JDE0tab1000](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="jde0Tab2000"></a>

## jde0Tab2000 : <code>Tableau</code> ℗
Jours juliens des équinoxes de l'an 1000 à l'an 2000.

**Type** : Constante  
**Accès** : privé  
**Voir** : [JDE0tab2000](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="jjAn1Gregorien"></a>

## jjAn1Gregorien : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'an 1 gregorien.

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
Nombre de jours juliens correspondants à l'an 2000 grégorien.

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
en 1871.

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
<a name="jjDebutRepublicain"></a>

## jjDebutRepublicain : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'an 1 républicain.

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
en 1871.

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
républicain.

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
<a name="jourGregorien"></a>

## jourGregorien : <code>Tableau</code> ℗
Nom des Jours Grégoriens et abbréviations courantes,
sur 1, 2 et 3 caractères.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
<a name="jourRepublicain"></a>

## jourRepublicain : <code>Tableau</code> ℗
Nom des Jours Republicains et abbréviations courantes,
sur 1, 2 et 3 caractères.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
<a name="joursDansLeMois"></a>

## joursDansLeMois : <code>Tableau</code> ℗
Nombre de jours en fonction des mois Grégoriens.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.17  
**Auteur** : Gilles Toubiana  
<a name="moisGregorien"></a>

## moisGregorien : <code>Tableau</code> ℗
Nom des Mois Grégoriens et abbréviations courantes,
sur 1, 2 et 3 caractères.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
<a name="moisRepublicain"></a>

## moisRepublicain : <code>Tableau</code> ℗
Nom des Mois Republicains et abbréviations courantes,
sur 1, 2 et 3 caractères.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
<a name="regexpGregorien"></a>

## regexpGregorien : <code>Tableau</code> ℗
Expressions régulières pour convertir les mois gregoriens.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
<a name="regexpRepublicain"></a>

## regexpRepublicain : <code>Tableau</code> ℗
Expressions régulières pour convertir les mois républicains.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
<a name="siecleJulien"></a>

## siecleJulien : <code>Nombre</code> ℗
Nombre de jours dans un siècle julien.

**Type** : Constante  
**Accès** : privé  
**Voir** : [JulianCentury](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="termesPerEquinoxes"></a>

## termesPerEquinoxes : <code>Tableau</code> ℗
Termes périodiques pour obtenir des temps réels.

**Type** : Constante  
**Accès** : privé  
**Voir** : [EquinoxpTerms](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="unitesEnLettres"></a>

## unitesEnLettres : <code>Tableau</code> ℗
Unités en toutes lettres.

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
* * *
Créé et maintenu par [@gtoubiana](https://github.com/gtoubiana/).<br>
Code sous licence [MIT](https://github.com/gtoubiana/acte/blob/master/LICENSE), documentation sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).
