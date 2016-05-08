# Fonctions privées utilisées dans Acte

## Table des matières

* [absInt(num)](#absInt) ⇒ <code>Nombre</code> ℗
* [anRepublicain(jj)](#anRepublicain) ⇒ <code>Tableau</code> ℗
* [arabeVersRomain(arabe)](#arabeVersRomain) ⇒ <code>Chaîne</code> ℗
* [cosinus(d)](#cosinus) ⇒ <code>Nombre</code> ℗
* [dateValide(jour, mois, an)](#dateValide) ⇒ <code>Objet</code> ℗
* [degresVersRadians(d)](#degresVersRadians) ⇒ <code>Nombre</code> ℗
* [deltaT(an)](#deltaT) ⇒ <code>Nombre</code> ℗
* [equationDuTemps(jj)](#equationDuTemps) ⇒ <code>Nombre</code> ℗
* [equinoxe(an, item)](#equinoxe) ⇒ <code>Nombre</code> ℗
* [equinoxeAParis(an)](#equinoxeAParis) ⇒ <code>Nombre</code> ℗
* [fractionEquinoxe(an)](#fractionEquinoxe) ⇒ <code>Nombre</code> ℗
* [gregorienBissextile(an)](#gregorienBissextile) ⇒ <code>Booléen</code> ℗
* [gregorienVersJj(an, mois, jour)](#gregorienVersJj) ⇒ <code>Nombre</code> ℗
* [jjVersGregorien(jj)](#jjVersGregorien) ⇒ <code>Tableau</code> ℗
* [jjVersJulien(jj)](#jjVersJulien) ⇒ <code>Tableau</code> ℗
* [jjVersRepublicain(jj)](#jjVersRepublicain) ⇒ <code>Tableau</code> ℗
* [julienVersJj(an, mois, jour)](#julienVersJj) ⇒ <code>Nombre</code> ℗
* [normaliserDegres(a)](#normaliserDegres) ⇒ <code>Nombre</code> ℗
* [nutation(jj)](#nutation) ⇒ <code>Tableau</code> ℗
* [obliquiteEcliptique(jj)](#obliquiteEcliptique) ⇒ <code>Nombre</code> ℗
* [positionSoleil(jj)](#positionSoleil) ⇒ <code>Tableau</code> ℗
* [radiansVersDegres(r)](#radiansVersDegres) ⇒ <code>Nombre</code> ℗
* [remplacements(texte, regex, options)](#remplacements) ⇒ <code>Chaîne</code> ℗
* [republicainVersJj(an, mois, decade, jour)](#republicainVersJj) ⇒ <code>Nombre</code> ℗
* [reste(a, b)](#reste) ⇒ <code>Nombre</code> ℗
* [rjmcVersRdc(rjmc)](#rjmcVersRdc) ⇒ <code>Nombre</code> ℗
* [rjmcVersRjdc(rjmc)](#rjmcVersRjdc) ⇒ <code>Nombre</code> ℗
* [romainVersArabe(romain)](#romainVersArabe) ⇒ <code>Nombre</code> ℗
* [saisieValide(saisie, regexp)](#saisieValide) ⇒ <code>Tableau</code> ℗
* [sinus(d)](#sinus) ⇒ <code>Nombre</code> ℗
* [tabGregorien(saisie, limites)](#tabGregorien) ⇒ <code>Tableau</code> ℗
* [tabRepublicain(saisie, limites)](#tabRepublicain) ⇒ <code>Tableau</code> ℗

* * *
<a name="absInt"></a>

## absInt(num) ⇒ <code>Nombre</code> ℗
Pour convertir en nombre entier positif

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Le nombre entier positif  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| num | <code>Nombre</code> | le nombre à convertir |

**Exemple** :  
```js
absInt(-23.45); // 23
```
<a name="anRepublicain"></a>

## anRepublicain(jj) ⇒ <code>Tableau</code> ℗
Pour calculer l'année républicaine correspondant à un nombre de jours
juliens

**Type** : Fonction  
**Résultat** : <code>Tableau</code> - [0] An républicain,
[1] Nombre de jours juliens pour l'équinoxe de l'année républicaine  
**Accès** : privé  
**Voir** : [annee_da_la_revolution](fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| jj | <code>Nombre</code> | Nombre de jours juliens |

**Exemple** :  
```js
anRepublicain(2379902.5); // [12, 2379857.5]
```
<a name="arabeVersRomain"></a>

## arabeVersRomain(arabe) ⇒ <code>Chaîne</code> ℗
Pour convertir des chiffres arabes en chiffres romains

**Type** : Fonction  
**Résultat** : <code>Chaîne</code> - Chiffre romain  
**Accès** : privé  
**Voir** : [Blog](http://blog.stevenlevithan.com/?p=65#comment-16107)  
**Depuis** : 0.0.1  
**Auteur** : Iván Montes  
**Licence** : unknown  

| Paramètres | Type | Description |
| --- | --- | --- |
| arabe | <code>Nombre</code> | Chiffre arabe |

**Exemple** :  
```js
arabeVersRomain(2012); // 'MMXII'
```
<a name="cosinus"></a>

## cosinus(d) ⇒ <code>Nombre</code> ℗
Pour calculer le cosinus d'un angle en degrés

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Cosinus de l'angle en degrés  
**Accès** : privé  
**Voir** : [dcos](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| d | <code>Nombre</code> | Angle en degrés |

**Exemple** :  
```js
cosinus(0); // 1
```
<a name="dateValide"></a>

## dateValide(jour, mois, an) ⇒ <code>Objet</code> ℗
Pour créer un objet date grégorien valide

**Type** : Fonction  
**Résultat** : <code>Objet</code> - L'objet date valide  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| jour | <code>Nombre</code> | le jour du mois gregorien en chiffres |
| mois | <code>Nombre</code> | le mois gregorien en chiffres |
| an | <code>Nombre</code> | l'année gregorienne en chiffres |

**Exemple** :  
```js
dateValide(10,12,34); // Sun Dec 10 34 00:00:00 GMT+0100 (CET)
```
<a name="degresVersRadians"></a>

## degresVersRadians(d) ⇒ <code>Nombre</code> ℗
Pour convertir des degrés en radians

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Angle en radians  
**Accès** : privé  
**Voir** : [dtr](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| d | <code>Nombre</code> | Angle en degrés |

**Exemple** :  
```js
degresVersRadians(90); // 1.5707963267948966
```
<a name="deltaT"></a>

## deltaT(an) ⇒ <code>Nombre</code> ℗
Pour calculer la différence entre temps terrestre et temps universel,
en secondes

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Différence entre temps terrestre et temps universel,
en secondes  
**Accès** : privé  
**Voir** : [deltat](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| an | <code>Nombre</code> | Année |

**Exemple** :  
```js
deltaT(2015); // 86.41924999999999
```
<a name="equationDuTemps"></a>

## equationDuTemps(jj) ⇒ <code>Nombre</code> ℗
Pour calculer l'équation du temps pour un moment précis

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Équation du temps pour une fraction de jour  
**Accès** : privé  
**Voir** : [equationOfTime](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| jj | <code>Nombre</code> | Nombre de jours juliens |

**Exemple** :  
```js
equationDuTemps(2457333.5); // 0.002839122270852552
```
<a name="equinoxe"></a>

## equinoxe(an, item) ⇒ <code>Nombre</code> ℗
Pour calculer le nombre de jours juliens d'une equinoxe ou d'un solstice

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Le nombre de jours juliens pour l'equinoxe ou solstice  
**Accès** : privé  
**Voir** : [equinox](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| an | <code>Nombre</code> | Année |
| item | <code>Nombre</code> | L'item à calculer : 0 = Equinoxe de Mars, 1 = Solstice de Juin, 2 = Equinoxe de Septembre, 3 = Solstice de Décembre |

**Exemple** :  
```js
equinoxe(2015,0); // 2457102.4488504543
```
<a name="equinoxeAParis"></a>

## equinoxeAParis(an) ⇒ <code>Nombre</code> ℗
Pour calculer le nombre de jours juliens correspondant à l'équinoxe
de septembre au méridien de Paris, pour une année grégorienne

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Nombre de jours juliens pour l'équinoxe de septembre  
**Accès** : privé  
**Voir** : [paris_equinoxe_jd](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| an | <code>Nombre</code> | Année grégorienne |

**Exemple** :  
```js
equinoxeAParis(2015); // 2457288.5
```
<a name="fractionEquinoxe"></a>

## fractionEquinoxe(an) ⇒ <code>Nombre</code> ℗
Pour calculer le nombre de jours juliens et la fraction de l'équinoxe
de septembre au méridien de Paris pour une année grégorienne

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Nombre de jours juliens et fraction de l'équinoxe
de septembre au méridien de Paris pour une année grégorienne  
**Accès** : privé  
**Voir** : [equinoxe_a_paris](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| an | <code>Nombre</code> | Année grégorienne |

**Exemple** :  
```js
fractionEquinoxe(2015); // 2457288.855100263
```
<a name="gregorienBissextile"></a>

## gregorienBissextile(an) ⇒ <code>Booléen</code> ℗
Pour déterminer si une année grégorienne est bissextile

**Type** : Fonction  
**Résultat** : <code>Booléen</code> - Est-ce une année bissextile ?  
**Accès** : privé  
**Voir** : [leap_gregorian](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| an | <code>Nombre</code> | Année grégorienne |

**Exemple** :  
```js
gregorienBissextile(2012); // true
```
<a name="gregorienVersJj"></a>

## gregorienVersJj(an, mois, jour) ⇒ <code>Nombre</code> ℗
Pour calculer le nombre de jours juliens (jj) à partir d'une date
grégorienne

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Nombre de jours juliens  
**Accès** : privé  
**Voir** : [gregorian_to_jd](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| an | <code>Nombre</code> | Année grégorienne |
| mois | <code>Nombre</code> | Mois grégorien |
| jour | <code>Nombre</code> | Jour grégorien |

**Exemple** :  
```js
gregorienVersJj(2015,11,7); // 2457333.5
```
<a name="jjVersGregorien"></a>

## jjVersGregorien(jj) ⇒ <code>Tableau</code> ℗
Pour calculer une date grégorienne à partir du nombre de jours juliens

**Type** : Fonction  
**Résultat** : <code>Tableau</code> - [0] Année, [1] Mois et [2] Jour grégorien  
**Accès** : privé  
**Voir** : [jd_to_gregorian](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| jj | <code>Nombre</code> | Nombre de jours juliens |

**Exemple** :  
```js
jjVersGregorien(2457333.5); // [2015, 11, 7]
```
<a name="jjVersJulien"></a>

## jjVersJulien(jj) ⇒ <code>Tableau</code> ℗
Pour calculer une date julienne à partir du nombre de jours juliens

**Type** : Fonction  
**Résultat** : <code>Tableau</code> - [0] An, [1] Mois et [2] Jour julien  
**Accès** : privé  
**Voir** : [jd_to_julian](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| jj | <code>Nombre</code> | Nombre de jours juliens |

**Exemple** :  
```js
jjVersJulien(2457346.5); // [2015,11,7]
```
<a name="jjVersRepublicain"></a>

## jjVersRepublicain(jj) ⇒ <code>Tableau</code> ℗
Pour calculer la date républicaine à partir du nombre de jours juliens,
les 4 ou 5 'sansculottides' sont considérés comme un 13e mois

**Type** : Fonction  
**Résultat** : <code>Tableau</code> - [0] An, [1] Mois, [2] Décade et [3] Jour républicain  
**Accès** : privé  
**Voir** : [jd_to_french_revolutionary](fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| jj | <code>Nombre</code> | Nombre de jours juliens |

**Exemple** :  
```js
jjVersRepublicain(2379902.5); // [12, 2, 2, 6]
```
<a name="julienVersJj"></a>

## julienVersJj(an, mois, jour) ⇒ <code>Nombre</code> ℗
Pour calculer un nombre de jours juliens à partir d'une date julienne

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Nombre de jours juliens  
**Accès** : privé  
**Voir** : [julian_to_jd](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| an | <code>Nombre</code> | Année julienne |
| mois | <code>Nombre</code> | Mois julien |
| jour | <code>Nombre</code> | Jour julien |

**Exemple** :  
```js
julienVersJj(2015,11,7); // 2457346.5
```
<a name="normaliserDegres"></a>

## normaliserDegres(a) ⇒ <code>Nombre</code> ℗
Pour normaliser un angle entre 0 et 360 degrés

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Angle entre 0 et 360 degrés  
**Accès** : privé  
**Voir** : [fixangle](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| a | <code>Nombre</code> | Angle en degrés |

**Exemple** :  
```js
normaliserDegres(375); // 15
```
<a name="nutation"></a>

## nutation(jj) ⇒ <code>Tableau</code> ℗
Pour calculer la nutation en longitude (deltaPsi),
et obliquité (deltaEpsilon) pour un nombre de jours juliens

**Type** : Fonction  
**Résultat** : <code>Tableau</code> - Nutation en [0] longitude et [1] obliquité en degrés  
**Accès** : privé  
**Voir** : [nutation](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| jj | <code>Nombre</code> | Nombre de jours juliens |

**Exemple** :  
```js
nutation(2457333.5);
// [-0.000514859690208824, -0.0025586654864005456]
```
<a name="obliquiteEcliptique"></a>

## obliquiteEcliptique(jj) ⇒ <code>Nombre</code> ℗
Pour calculer l'obliquité de l'écliptique pour un nombre de jours juliens

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Obliquité de l'écliptique  
**Accès** : privé  
**Voir** : [obliqeq](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| jj | <code>Nombre</code> | Nombre de jours juliens |

**Exemple** :  
```js
obliquiteEcliptique(2457333.5); // 23.437230456425635
```
<a name="positionSoleil"></a>

## positionSoleil(jj) ⇒ <code>Tableau</code> ℗
Pour calculer la position du soleil

**Type** : Fonction  
**Résultat** : <code>Tableau</code> - Position du soleil : Angles en degrés.
[0] Longitude moyenne géométrique du Soleil,
[1] Anomalie moyenne du Soleil,
[2] Excentricité de l'orbite de la Terre,
[3] Équation du centre du Soleil,
[4] Longitude réelle du Soleil,
[5] Anomalie réelle du Soleil,
[6] Rayon vecteur du Soleil,
[7] Longitude apparente du Soleil pour une equinoxe,
[8] Ascension réelle du Soleil,
[9] Déclinaison réelle du Soleil,
[10] Ascension apparente du Soleil,
[11] Déclinaison apparente du Soleil  
**Accès** : privé  
**Voir** : [sunpos](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| jj | <code>Nombre</code> | Nombre de jours juliens |

**Exemple** :  
```js
positionSoleil(2457333.5); //[225.88621192607388, 302.6763369039327,
// 0.016701968773317977, -1.6291396906692837, 224.2570722354046,
// 301.0471972132634, 0.9911840619194138, 224.25125854183977,
// 221.79690960202632, -16.115660127694625, 221.79168151491098,
// -16.112230690435588]
```
<a name="radiansVersDegres"></a>

## radiansVersDegres(r) ⇒ <code>Nombre</code> ℗
Pour convertir des radians en degrés

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Angle en degrés  
**Accès** : privé  
**Voir** : [rtd](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| r | <code>Nombre</code> | Angle en radians |

**Exemple** :  
```js
radiansVersDegres(1.5707963267948966); // 90
```
<a name="remplacements"></a>

## remplacements(texte, regex, options) ⇒ <code>Chaîne</code> ℗
Pour remplacer en série avec un objet contenant des regex

**Type** : Fonction  
**Résultat** : <code>Chaîne</code> - Le texte modifié  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| texte | <code>Chaîne</code> | Le texte à modifier |
| regex | <code>Objet</code> | Les expressions régulières de remplacements |
| options | <code>Chaîne</code> | Les options des expressions régulières |

**Exemple** :  
```js
remplacements('Bonjour', {'jour': 'soir'}, 'gi');
// 'Bonsoir'
```
<a name="republicainVersJj"></a>

## republicainVersJj(an, mois, decade, jour) ⇒ <code>Nombre</code> ℗
Pour calculer le nombre de jours juliens à partir d'une date républicaine

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Nombre de jours juliens  
**Accès** : privé  
**Voir** : [french_revolutionary_to_jd](fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| an | <code>Nombre</code> | Année républicaine |
| mois | <code>Nombre</code> | Mois républicain |
| decade | <code>Nombre</code> | Décade républicaine |
| jour | <code>Nombre</code> | Jour de la décade républicaine |

**Exemple** :  
```js
republicainVersJj(12, 2, 2, 6); // 2379902.5
```
<a name="reste"></a>

## reste(a, b) ⇒ <code>Nombre</code> ℗
Pour calculer les restes avec des nombres décimaux

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Reste de a par b  
**Accès** : privé  
**Voir** : [mod](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| a | <code>Nombre</code> | Nombre à diviser |
| b | <code>Nombre</code> | Diviseur |

**Exemple** :  
```js
reste(3,2); // 1
```
<a name="rjmcVersRdc"></a>

## rjmcVersRdc(rjmc) ⇒ <code>Nombre</code> ℗
Pour convertir le jour du mois républicain en décade

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - La décade républicaine  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| rjmc | <code>Nombre</code> | le jour du mois républicain |

**Exemple** :  
```js
rjmcVersRdc(28); // 3
```
<a name="rjmcVersRjdc"></a>

## rjmcVersRjdc(rjmc) ⇒ <code>Nombre</code> ℗
Pour convertir le jour du mois républicain en jour de la décade

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Le jour de la décade républicaine  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| rjmc | <code>Nombre</code> | le jour du mois républicain |

**Exemple** :  
```js
rjmcVersRjdc(28); // 8
```
<a name="romainVersArabe"></a>

## romainVersArabe(romain) ⇒ <code>Nombre</code> ℗
Pour convertir des chiffres romains en chiffres arabes

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Chiffre arabe  
**Accès** : privé  
**Voir** : [Blog](http://blog.stevenlevithan.com/?p=65#comment-16129)  
**Depuis** : 0.0.1  
**Auteur** : Iván Montes  
**Licence** : unknown  

| Paramètres | Type | Description |
| --- | --- | --- |
| romain | <code>Chaîne</code> | Chiffre romain |

**Exemple** :  
```js
romainVersArabe('MMXII'); // 2012
```
<a name="saisieValide"></a>

## saisieValide(saisie, regexp) ⇒ <code>Tableau</code> ℗
Pour obtenir une saisie valide

**Type** : Fonction  
**Résultat** : <code>Tableau</code> - La saisie valide  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| saisie | <code>Chaîne</code> | La saisie d'une date |
| regexp | <code>Objet</code> | Un objet regexpRepublicain ou regexpGregorien pour convertir les mois |

**Exemple** :  
```js
saisieValide(saisie, regexpRepublicain);
saisieValide(saisie, regexpGregorien);
```
<a name="sinus"></a>

## sinus(d) ⇒ <code>Nombre</code> ℗
Pour calculer le sinus d'un angle en degrés

**Type** : Fonction  
**Résultat** : <code>Nombre</code> - Sinus de l'angle en degrés  
**Accès** : privé  
**Voir** : [dsin](http://fourmilab.ch/documents/calendar/)  
**Depuis** : 0.0.1  
**Auteur** : John Walker  
**Licence** : Domaine public  

| Paramètres | Type | Description |
| --- | --- | --- |
| d | <code>Nombre</code> | Angle en degrés |

**Exemple** :  
```js
sinus(90); // 1
```
<a name="tabGregorien"></a>

## tabGregorien(saisie, limites) ⇒ <code>Tableau</code> ℗
Pour convertir la saisie grégorienne ou julienne en Objet Jour

**Type** : Fonction  
**Résultat** : <code>Tableau</code> - Les dates républicaines, grégoriennes et juliennes  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| saisie | <code>Chaîne</code> | Saisie d'une date |
| limites | <code>Booléen</code> | Par défaut, les résultats sont limités aux périodes d'utilisation des calendriers. Seule la valeur `false` permet de désactiver ces limites. |

**Exemple** :  
```js
tabGregorien(saisie, this.limites);
```
<a name="tabRepublicain"></a>

## tabRepublicain(saisie, limites) ⇒ <code>Tableau</code> ℗
Pour convertir la saisie républicaine en Objet Jour

**Type** : Fonction  
**Résultat** : <code>Tableau</code> - Les dates républicaines, grégoriennes et juliennes  
**Accès** : privé  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| saisie | <code>Chaîne</code> | Saisie d'une date |
| limites | <code>Booléen</code> | Par défaut, les résultats sont limités aux périodes d'utilisation des calendriers. Seule la valeur `false` permet de désactiver ces limites. |

**Exemple** :  
```js
tabRepublicain(saisie, this.limites);
```
* * *
Créé et maintenu par [@gtoubiana](https://github.com/gtoubiana/).<br>
Code sous licence [MIT](https://github.com/gtoubiana/acte/blob/master/LICENSE), documentation sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).
