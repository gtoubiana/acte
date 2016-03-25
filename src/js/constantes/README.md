## Constantes

<dl>
<dt><a href="#ANNEE_TROPIQUE">ANNEE_TROPIQUE</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours, sur Terre, pour que le Soleil retourne à la même
position
dans le cycle des saisons</p>
</dd>
<dt><a href="#ARG_NUT_COEFF">ARG_NUT_COEFF</a> : <code>Tableau</code> ℗</dt>
<dd><p>Coefficient des sinus et cosinus de l&#39;argument pour la nutation</p>
</dd>
<dt><a href="#ARG_NUT_MULT">ARG_NUT_MULT</a> : <code>Tableau</code> ℗</dt>
<dd><p>Termes périodiques pour la nutation en longitude et obliquité</p>
</dd>
<dt><a href="#DELTA">DELTA</a> : <code>Tableau</code> ℗</dt>
<dd><p>Tableau des Delta T (différence entre Temps universel et temps terrestre)
tous les 2 ans de 1620 à 2014</p>
</dd>
<dt><a href="#JDE0TAB1000">JDE0TAB1000</a> : <code>Tableau</code> ℗</dt>
<dd><p>Jours juliens des équinoxes avant l&#39;an 1000</p>
</dd>
<dt><a href="#JDE0TAB2000">JDE0TAB2000</a> : <code>Tableau</code> ℗</dt>
<dd><p>Jours juliens des équinoxes de l&#39;an 1000 à l&#39;an 2000</p>
</dd>
<dt><a href="#JJ_AN1_GREGORIEN">JJ_AN1_GREGORIEN</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;an 1 gregorien</p>
</dd>
<dt><a href="#JJ_AN2000_GREGORIEN">JJ_AN2000_GREGORIEN</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;an 2000 grégorien</p>
</dd>
<dt><a href="#JJ_DEBUT_COMMUNE_DE_PARIS">JJ_DEBUT_COMMUNE_DE_PARIS</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;adoption du calendrier
républicain dans le journal officiel lors de la Commune de Paris
en 1871</p>
</dd>
<dt><a href="#JJ_DEBUT_GREGORIEN">JJ_DEBUT_GREGORIEN</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;adoption du calendrier
grégorien</p>
</dd>
<dt><a href="#JJ_DEBUT_REPUBLICAIN">JJ_DEBUT_REPUBLICAIN</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;an 1 républicain</p>
</dd>
<dt><a href="#JJ_FIN_COMMUNE_DE_PARIS">JJ_FIN_COMMUNE_DE_PARIS</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;abrogation du calendrier
républicain dans le journal officiel lors de la Commune de Paris
en 1871</p>
</dd>
<dt><a href="#JJ_FIN_REPUBLICAIN">JJ_FIN_REPUBLICAIN</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours juliens correspondants à l&#39;abrogation du calendrier
républicain</p>
</dd>
<dt><a href="#REGEXP_GREGORIEN">REGEXP_GREGORIEN</a> : <code>Objet</code> ℗</dt>
<dd><p>Expressions régulières pour convertir les mois gregoriens</p>
</dd>
<dt><a href="#REGEXP_REPUBLICAIN">REGEXP_REPUBLICAIN</a> : <code>Objet</code> ℗</dt>
<dd><p>Expressions régulières pour convertir les mois républicains</p>
</dd>
<dt><a href="#SIECLE_JULIEN">SIECLE_JULIEN</a> : <code>Nombre</code> ℗</dt>
<dd><p>Nombre de jours dans un siècle julien</p>
</dd>
<dt><a href="#TERMES_PER_EQUINOXES">TERMES_PER_EQUINOXES</a> : <code>Tableau</code> ℗</dt>
<dd><p>Termes périodiques pour obtenir des temps réels</p>
</dd>
</dl>

<a name="ANNEE_TROPIQUE"></a>

## ANNEE_TROPIQUE : <code>Nombre</code> ℗
Nombre de jours, sur Terre, pour que le Soleil retourne à la même
position
dans le cycle des saisons

**Type** : Constante  
**Accès** : privé  
**Voir** : [TropicalYear](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="ARG_NUT_COEFF"></a>

## ARG_NUT_COEFF : <code>Tableau</code> ℗
Coefficient des sinus et cosinus de l'argument pour la nutation

**Type** : Constante  
**Accès** : privé  
**Voir** : [nutArgCoeff](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="ARG_NUT_MULT"></a>

## ARG_NUT_MULT : <code>Tableau</code> ℗
Termes périodiques pour la nutation en longitude et obliquité

**Type** : Constante  
**Accès** : privé  
**Voir** : [nutArgMult](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="DELTA"></a>

## DELTA : <code>Tableau</code> ℗
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
<a name="JDE0TAB1000"></a>

## JDE0TAB1000 : <code>Tableau</code> ℗
Jours juliens des équinoxes avant l'an 1000

**Type** : Constante  
**Accès** : privé  
**Voir** : [JDE0tab1000](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="JDE0TAB2000"></a>

## JDE0TAB2000 : <code>Tableau</code> ℗
Jours juliens des équinoxes de l'an 1000 à l'an 2000

**Type** : Constante  
**Accès** : privé  
**Voir** : [JDE0tab2000](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="JJ_AN1_GREGORIEN"></a>

## JJ_AN1_GREGORIEN : <code>Nombre</code> ℗
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
<a name="JJ_AN2000_GREGORIEN"></a>

## JJ_AN2000_GREGORIEN : <code>Nombre</code> ℗
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
<a name="JJ_DEBUT_COMMUNE_DE_PARIS"></a>

## JJ_DEBUT_COMMUNE_DE_PARIS : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'adoption du calendrier
républicain dans le journal officiel lors de la Commune de Paris
en 1871

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte.js)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Exemple** :  
```js
jjVersGregorien(2404504.5); // [1871, 3, 18]
jjVersRepublicain(2404504.5); // [79, 6, 3, 7]
```
<a name="JJ_DEBUT_GREGORIEN"></a>

## JJ_DEBUT_GREGORIEN : <code>Nombre</code> ℗
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
<a name="JJ_DEBUT_REPUBLICAIN"></a>

## JJ_DEBUT_REPUBLICAIN : <code>Nombre</code> ℗
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
<a name="JJ_FIN_COMMUNE_DE_PARIS"></a>

## JJ_FIN_COMMUNE_DE_PARIS : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'abrogation du calendrier
républicain dans le journal officiel lors de la Commune de Paris
en 1871

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte.js)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Exemple** :  
```js
jjVersGregorien(2404575.5); // [1871, 5, 28]
jjVersRepublicain(2404575.5); // [79, 9, 1, 8]
```
<a name="JJ_FIN_REPUBLICAIN"></a>

## JJ_FIN_REPUBLICAIN : <code>Nombre</code> ℗
Nombre de jours juliens correspondants à l'abrogation du calendrier
républicain

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte.js)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Exemple** :  
```js
jjVersGregorien(2380686.5); // [1805, 12, 31]
jjVersRepublicain(2380686.5); // [14, 4, 1, 10]
```
<a name="REGEXP_GREGORIEN"></a>

## REGEXP_GREGORIEN : <code>Objet</code> ℗
Expressions régulières pour convertir les mois gregoriens

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte.js)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
<a name="REGEXP_REPUBLICAIN"></a>

## REGEXP_REPUBLICAIN : <code>Objet</code> ℗
Expressions régulières pour convertir les mois républicains

**Type** : Constante  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte.js)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
<a name="SIECLE_JULIEN"></a>

## SIECLE_JULIEN : <code>Nombre</code> ℗
Nombre de jours dans un siècle julien

**Type** : Constante  
**Accès** : privé  
**Voir** : [JulianCentury](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
<a name="TERMES_PER_EQUINOXES"></a>

## TERMES_PER_EQUINOXES : <code>Tableau</code> ℗
Termes périodiques pour obtenir des temps réels

**Type** : Constante  
**Accès** : privé  
**Voir** : [EquinoxpTerms](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
