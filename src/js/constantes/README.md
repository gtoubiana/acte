## Constantes

<dl>
<dt><a href="#anneeTropique">anneeTropique</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours, sur Terre, pour que le Soleil retourne à la même
position
dans le cycle des saisons</p>
</dd>
<dt><a href="#argNutCoeff">argNutCoeff</a> : <code>Tableau</code> ℗</dt>
<dd><p>Coefficient des sinus et cosinus de l&#39;argument pour la nutation</p>
</dd>
<dt><a href="#argNutMult">argNutMult</a> : <code>Tableau</code> ℗</dt>
<dd><p>Termes périodiques pour la nutation en longitude et obliquité</p>
</dd>
<dt><a href="#delta">delta</a> : <code>Tableau</code> ℗</dt>
<dd><p>Tableau des Delta T (différence entre Temps universel et temps terrestre)
tous les 2 ans de 1620 à 2014</p>
</dd>
<dt><a href="#jde0Tab1000">jde0Tab1000</a> : <code>Tableau</code> ℗</dt>
<dd><p>Jours juliens des équinoxes avant l&#39;an 1000</p>
</dd>
<dt><a href="#jde0Tab2000">jde0Tab2000</a> : <code>Tableau</code> ℗</dt>
<dd><p>Jours juliens des équinoxes de l&#39;an 1000 à l&#39;an 2000</p>
</dd>
<dt><a href="#jjAn1Gregorien">jjAn1Gregorien</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;an 1 gregorien</p>
</dd>
<dt><a href="#jjAn2000Gregorien">jjAn2000Gregorien</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;an 2000 grégorien</p>
</dd>
<dt><a href="#jjDebutCommuneDeParis">jjDebutCommuneDeParis</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;adoption du calendrier
républicain dans le journal officiel lors de la Commune de Paris
en 1871</p>
</dd>
<dt><a href="#jjDebutGregorien">jjDebutGregorien</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;adoption du calendrier
grégorien</p>
</dd>
<dt><a href="#jjDebutRepublicain">jjDebutRepublicain</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;an 1 républicain</p>
</dd>
<dt><a href="#jjFinCommuneDeParis">jjFinCommuneDeParis</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;abrogation du calendrier
républicain dans le journal officiel lors de la Commune de Paris
en 1871</p>
</dd>
<dt><a href="#jjFinRepublicain">jjFinRepublicain</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;abrogation du calendrier
républicain</p>
</dd>
<dt><a href="#regexpGregorien">regexpGregorien</a> : <code>Objet</code> ℗</dt>
<dd><p>Expressions régulières pour convertir les mois gregoriens</p>
</dd>
<dt><a href="#regexpRepublicain">regexpRepublicain</a> : <code>Objet</code> ℗</dt>
<dd><p>Expressions régulières pour convertir les mois républicains</p>
</dd>
<dt><a href="#siecleJulien">siecleJulien</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours dans un siècle julien</p>
</dd>
<dt><a href="#termesPerEquinoxes">termesPerEquinoxes</a> : <code>Tableau</code> ℗</dt>
<dd><p>Termes périodiques pour obtenir des temps réels</p>
</dd>
</dl>

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
jjVersRepublicain(2404504.5); // [79, 6, 3, 7]
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
jjVersJulien(2299160.5); // [1582, 10, 5]
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
jjVersRepublicain(2375839.5); // [1, 1, 1, 1]
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
jjVersRepublicain(2404575.5); // [79, 9, 1, 8]
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
jjVersRepublicain(2380686.5); // [14, 4, 1, 10]
```
<a name="regexpGregorien"></a>

## regexpGregorien : <code>Objet</code> ℗
Expressions régulières pour convertir les mois gregoriens

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
<a name="regexpRepublicain"></a>

## regexpRepublicain : <code>Objet</code> ℗
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
