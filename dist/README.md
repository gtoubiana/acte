# Documentation de Acte

## Installation :

```
$ npm install acte --save
```

## API de référence :
<a name="acte"></a>

## acte : <code>Objet</code>
acte - Une librairie JavaScript qui simplifie la recherche généalogique.

**Type** : Espace de noms global  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Version** : 0.0.17  
**Licence** : MIT  
**Copyright** : 2015-Present, Gilles Toubiana  

* [acte](#acte) : <code>Objet</code>
    * [.Jour](#acte.Jour) ↩︎
        * [new acte.Jour(saisie, [limites])](#new_acte.Jour_new)
        * [.gregorien](#acte.Jour+gregorien) ⇒ <code>Chaîne</code>
        * [.julien](#acte.Jour+julien) ⇒ <code>Chaîne</code>
        * [.republicain](#acte.Jour+republicain) ⇒ <code>Chaîne</code>
    * [.arabeVersRomain(arabe)](#acte.arabeVersRomain) ⇒ <code>Chaîne</code>
    * [.nombreEnLettres(n, [r])](#acte.nombreEnLettres) ⇒ <code>Chaîne</code>
    * [.nombreOrdinal(n, prem, exp)](#acte.nombreOrdinal) ⇒ <code>Chaîne</code>
    * [.ordinauxEnLettres(saisie, [genre])](#acte.ordinauxEnLettres) ⇒ <code>Chaîne</code>
    * [.prefixeZero(n)](#acte.prefixeZero) ⇒ <code>Chaîne</code>
    * [.premierOrdinalEnLettres(saisie, [genre])](#acte.premierOrdinalEnLettres) ⇒ <code>Chaîne</code>

<a name="acte.Jour"></a>

### acte.Jour ↩︎
**Type** : Classe statique de <code>[acte](#acte)</code>  
**Méthode chainable**  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

* [.Jour](#acte.Jour) ↩︎
    * [new acte.Jour(saisie, [limites])](#new_acte.Jour_new)
    * [.gregorien](#acte.Jour+gregorien) ⇒ <code>Chaîne</code>
    * [.julien](#acte.Jour+julien) ⇒ <code>Chaîne</code>
    * [.republicain](#acte.Jour+republicain) ⇒ <code>Chaîne</code>

<a name="new_acte.Jour_new"></a>

#### new acte.Jour(saisie, [limites])
Pour convertir une saisie en objet JavaScript.


| Paramètres | Type | Par défaut | Description |
| --- | --- | --- | --- |
| saisie | <code>Chaîne</code> |  | Saisie d'une date grégorienne ou républicaine. |
| [limites] | <code>Booléen</code> | <code>true</code> | Par défaut, les résultats sont limités aux périodes d'utilisation des calendriers :<br> - une saisie de date grégorienne sera considérée comme julienne avant le 15/10/1582<br> - une saisie de date républicaine ne sera valide que du 22/9/1792 au 31/12/1805 (Période républicaine) et du 18/3/1871 au 28/5/1871 (Commune de Paris).<br> La valeur `false` permet de désactiver ces limitations. |

**Exemple** :  
```js
new acte.Jour('15/10/1582').gregorien() // 15 octobre 1582
new acte.Jour('5 Xbre 1793').gregorien() // 5 décembre 1793
new acte.Jour('5 Jet 1793').gregorien() // 5 juillet 1793
new acte.Jour('10 nivôse an XIV').gregorien() // 31 décembre 1805
new acte.Jour('8 frimaire an XVIII').gregorien() // Pas de correspondances.
new acte.Jour('8 frimaire an XVIII', false).gregorien() // 29 novembre 1809
new acte.Jour('14/10/1582').gregorien() // Pas de correspondances.
new acte.Jour('14/10/1582', false).gregorien() // 14 octobre 1582
```
<a name="acte.Jour+gregorien"></a>

#### jour.gregorien ⇒ <code>Chaîne</code>
Pour formater une date grégorienne.

**Type** : Propriété d'instance de <code>[Jour](#acte.Jour)</code>  
**Résultat** : <code>Chaîne</code> - La date grégorienne formatée  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Par défaut | Description |
| --- | --- | --- | --- |
| [format] | <code>Chaîne</code> | <code>&#x27;%Jp %Mlb %A&#x27;</code> | Le modèle de formatage :<br><br> <strong>BALISES</strong><br> `%A` ou `%AN` - Année<br> `%D`, `%DM` ou `%SM` - Décade/Semaine dans le mois<br> `%J` ou `%JM` - Jour dans le mois<br> `%JA` - Jour dans l'année<br> `%JS` ou `%JD` - Jour de la Décade/Semaine<br> `%M` ou `%MA` - Mois dans l'année<br> `%S`, `%SA` ou `%DA` - Semaine/Décade dans l'année<br><br> <strong>FILTRES</strong><br> `1` - mois ou jour sur 1 caractère<br> `2` - mois ou jour sur 2 caractères<br> `3` - mois ou jour sur 3 caractères<br> `a` - mois ou jour en Abrégé<br> `b` - en Bas de casse (minuscules)<br> `c` ou `m` - en Capitales (Majuscules)<br> `f` - Féminin de p (première ou 1re)<br> `l` - chiffres en Lettres<br> `o` - lettres ou chiffres en Ordinaux<br> `p` - Premier ou 1er<br> `r` - chiffres en Romains<br> `v` - chiffres en lettres (Vieille notation)<br> `z` - Zéro devant le chiffre<br> |
| [erreur] | <code>Chaîne</code> | <code>&#x27;Pas de correspondances.&#x27;</code> | Le message d'erreur |
| [rappel] | <code>Fonction</code> |  | Une fonction de rappel |

**Exemple** :  
```js
new acte.Jour('1/1/1600').gregorien() // '1er janvier 1600'
new acte.Jour('').gregorien(0, 'Erreur.') // 'Erreur.'
new acte.Jour('3 avril 1605').gregorien('%Jz/%Mz', 0, ((res, obj) => {
  const an = (obj.A % 100) < 10 ? `0${obj.A % 100}` : obj.A % 100;
  return `${res}/${an}`;
}))) // '03/04/05'
```
<a name="acte.Jour+julien"></a>

#### jour.julien ⇒ <code>Chaîne</code>
Pour formater une date julienne.

**Type** : Propriété d'instance de <code>[Jour](#acte.Jour)</code>  
**Résultat** : <code>Chaîne</code> - La date julienne formatée  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Par défaut | Description |
| --- | --- | --- | --- |
| [format] | <code>Chaîne</code> | <code>&#x27;%Jp %Mlb %A&#x27;</code> | Le modèle de formatage.<br> Voir [.gregorien](#acte.Jour+gregorien) pour la syntaxe. |
| [erreur] | <code>Chaîne</code> | <code>&#x27;Pas de correspondances.&#x27;</code> | Le message d'erreur |
| [rappel] | <code>Fonction</code> |  | Une fonction de rappel |

**Exemple** :  
```js
new acte.Jour('1/1/1600').julien() // '22 décembre 1599'
new acte.Jour('').julien(0, 'Erreur.') // 'Erreur.'
new acte.Jour('3 avril 1605').julien('%Jz/%Mz', 0, ((res, obj) => {
  const an = (obj.A % 100) < 10 ? `0${obj.A % 100}` : obj.A % 100;
  return `${res}/${an}`;
}))) // '24/03/05'
```
<a name="acte.Jour+republicain"></a>

#### jour.republicain ⇒ <code>Chaîne</code>
Pour formater une date républicaine.

**Type** : Propriété d'instance de <code>[Jour](#acte.Jour)</code>  
**Résultat** : <code>Chaîne</code> - La date républicaine formatée  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Par défaut | Description |
| --- | --- | --- | --- |
| [format] | <code>Chaîne</code> | <code>&#x27;%Jp %Mlb %A&#x27;</code> | Le modèle de formatage.<br> Voir [.gregorien](#acte.Jour+gregorien) pour la syntaxe. |
| [erreur] | <code>Chaîne</code> | <code>&#x27;Pas de correspondances.&#x27;</code> | Le message d'erreur |
| [rappel] | <code>Fonction</code> |  | Une fonction de rappel |

**Exemple** :  
```js
new acte.Jour('1/1/1800').republicain() // '11 nivôse an VIII'
new acte.Jour('').republicain(0, 'Erreur.') // 'Erreur.'
new acte.Jour('3 avril 1805').republicain('%Jz/%Dz/%Mz', 0, ((r, o) => {
  const an = (o.A % 100) < 10 ? `0${o.A % 100}` : o.A % 100;
  return `${r}/${an}`;
}))) // '13/02/07/13'
```
<a name="acte.arabeVersRomain"></a>

### acte.arabeVersRomain(arabe) ⇒ <code>Chaîne</code>
Pour convertir des chiffres arabes en chiffres romains.

**Type** : Méthode statique de <code>[acte](#acte)</code>  
**Résultat** : <code>Chaîne</code> - Chiffre romain  
**Accès** : public  
**Voir** : [Blog](http://blog.stevenlevithan.com/?p=65#comment-16107)  
**Depuis** : 0.0.17  
**Auteur** : Iván Montes  
**Licence** : unknown  

| Paramètres | Type | Description |
| --- | --- | --- |
| arabe | <code>Nombre</code> | Chiffre arabe |

**Exemple** :  
```js
acte.arabeVersRomain(2012); // 'MMXII'
```
<a name="acte.nombreEnLettres"></a>

### acte.nombreEnLettres(n, [r]) ⇒ <code>Chaîne</code>
Pour convertir les nombres en toutes lettres.

**Type** : Méthode statique de <code>[acte](#acte)</code>  
**Résultat** : <code>Chaîne</code> - le nombre en toutes lettres  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.17  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| n | <code>Nombre</code> | le nombre en chiffres |
| [r] | <code>Chaîne</code> | par défaut, la réforme de 1990 est appliquée. Pour utiliser l'ancienne notation, il suffit d'ajouter un argument. |

**Exemple** :  
```js
acte.nombreEnLettres(2371); // 'Deux-mille-trois-cent-soixante-et-onze'
acte.nombreEnLettres(1799,1); // 'Mille sept cent quatre-vingt-dix-neuf'
```
<a name="acte.nombreOrdinal"></a>

### acte.nombreOrdinal(n, prem, exp) ⇒ <code>Chaîne</code>
Pour convertir les nombres en nombres ordinaux.

**Type** : Méthode statique de <code>[acte](#acte)</code>  
**Résultat** : <code>Chaîne</code> - le nombre ordinal  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.17  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| n | <code>Nombre</code> | le nombre en chiffres |
| prem | <code>Chaîne</code> | le suffixe pour le chiffre 1 |
| exp | <code>Chaîne</code> | le suffixe pour les chiffres différents de 1 |

**Exemple** :  
```js
acte.nombreOrdinal(1,'er','e'); // '1er'
acte.nombreOrdinal(1,'re','e'); // '1re'
acte.nombreOrdinal(2,'er','e'); // '2e'
```
<a name="acte.ordinauxEnLettres"></a>

### acte.ordinauxEnLettres(saisie, [genre]) ⇒ <code>Chaîne</code>
Pour convertir les nombres en toutes lettres en nombres ordinaux.

**Type** : Méthode statique de <code>[acte](#acte)</code>  
**Résultat** : <code>Chaîne</code> - le nombre ordinal en lettres  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.17  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| saisie | <code>Nombre</code> | le nombre en lettres |
| [genre] | <code>Chaîne</code> | par défaut, le genre masculin est appliqué. Pour utiliser le genre féminin, il suffit d'ajouter un argument. |

**Exemple** :  
```js
acte.ordinauxEnLettres('Un'); // 'Premier'
acte.ordinauxEnLettres('Un', 1); // 'Première'
acte.ordinauxEnLettres('Deux'); // 'Deuxième'
acte.ordinauxEnLettres('Vingt-trois'); // 'Vingt-troisième'
```
<a name="acte.prefixeZero"></a>

### acte.prefixeZero(n) ⇒ <code>Chaîne</code>
Pour ajouter un préfixe de 0 à un nombre compris entre 1 et 9.

**Type** : Méthode statique de <code>[acte](#acte)</code>  
**Résultat** : <code>Chaîne</code> - le nombre avec préfixe zéro  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.17  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| n | <code>Nombre</code> | le nombre à préfixer |

**Exemple** :  
```js
acte.prefixeZero(20); // 20
acte.prefixeZero(9); // '09'
acte.prefixeZero(0); // 0
acte.prefixeZero(-4); // -4
```
<a name="acte.premierOrdinalEnLettres"></a>

### acte.premierOrdinalEnLettres(saisie, [genre]) ⇒ <code>Chaîne</code>
Pour convertir uniquement 'un' en nombre ordinal.

**Type** : Méthode statique de <code>[acte](#acte)</code>  
**Résultat** : <code>Chaîne</code> - le nombre - ordinal ou non - en lettres  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.17  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Description |
| --- | --- | --- |
| saisie | <code>Nombre</code> | le nombre en lettres |
| [genre] | <code>Chaîne</code> | par défaut, le genre masculin est appliqué. Pour utiliser le genre féminin, il suffit d'ajouter un argument. |

**Exemple** :  
```js
acte.premierOrdinalEnLettres('Un'); // 'Premier'
acte.premierOrdinalEnLettres('Un', 1); // 'Première'
acte.premierOrdinalEnLettres('Deux'); // 'Deux'
acte.premierOrdinalEnLettres('Vingt-trois'); // 'Vingt-trois'
```

## API des constantes et fonctions privées :
- [Constantes privées](/blob/master/src/js/private/constants/README.md#constantes-privées-utilisées-dans-acte).
- [Fonctions privées](/blob/master/src/js/private/functions/README.md#fonctions-privées-utilisées-dans-acte).
* * *
Créé et maintenu par [Gilles Toubiana](https://github.com/gtoubiana/) - 2015-Présent.<br>
[Code](https://github.com/gtoubiana/acte) sous licence [MIT](https://github.com/gtoubiana/acte/blob/master/LICENSE), [documentation](https://github.com/gtoubiana/acte/blob/master/dist/README.md) sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).
