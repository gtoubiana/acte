# Documentation de Acte

## Installation :

```
$ npm install acte --save
```

## API de référence :
<a name="acte"></a>

## acte : <code>Objet</code>
acte - Librairie Javascript pour manipuler des données généalogiques.

**Type** : Espace de noms global  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Version** : 0.0.15  
**Licence** : MIT  
**Copyright** : 2015-Present, Gilles Toubiana  

* [acte](#acte) : <code>Objet</code>
    * [.Jour](#acte.Jour) ↩︎
        * [new acte.Jour(saisie, [limites])](#new_acte.Jour_new)
        * [.gregorien](#acte.Jour+gregorien) ⇒ <code>Chaîne</code>

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

<a name="new_acte.Jour_new"></a>

#### new acte.Jour(saisie, [limites])
Pour convertir une saisie en objet JavaScript.


| Paramètres | Type | Par défaut | Description |
| --- | --- | --- | --- |
| saisie | <code>Chaîne</code> |  | Saisie d'une date grégorienne ou républicaine. |
| [limites] | <code>Booléen</code> | <code>true</code> | Par défaut, les résultats sont limités aux périodes d'utilisation des calendriers :<br> - une saisie de date grégorienne sera considérée comme julienne avant le 15/10/1582<br> - une saisie de date républicaine ne sera valide que du 22/9/1792 au 31/12/1805 (Période républicaine) et du 18/3/1871 au 28/5/1871 (Commune de Paris).<br> La valeur `false` permet de désactiver ces limitations. |

<a name="acte.Jour+gregorien"></a>

#### jour.gregorien ⇒ <code>Chaîne</code>
Pour formater une date grégorienne.

**Type** : instance property of <code>[Jour](#acte.Jour)</code>  
**Résultat** : <code>Chaîne</code> - La date grégorienne formatée  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.15  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  

| Paramètres | Type | Par défaut | Description |
| --- | --- | --- | --- |
| [format] | <code>Chaîne</code> | <code>&#x27;%J %Mlb %A&#x27;</code> | Le modèle de formatage :<br><br> <strong>BALISES</strong><br> `%A` ou `%AN` - Année<br> `%D`, `%DM` ou `%SM` - Décade/Semaine dans le mois<br> `%J` ou `%JM` - Jour dans le mois<br> `%JA` - Jour dans l'année<br> `%JS` ou `%JD` - Jour de la Décade/Semaine<br> `%M` ou `%MA` - Mois dans l'année<br> `%S`, `%SA` ou `%DA` - Semaine/Décade dans l'année<br><br> <strong>FILTRES</strong><br> `1` - mois ou jour sur 1 caractère<br> `2` - mois ou jour sur 2 caractères<br> `3` - mois ou jour sur 3 caractères<br> `a` - mois ou jour en Abrégé<br> `b` - en Bas de casse (minuscules)<br> `c` ou `m` - en Capitales (Majuscules)<br> `f` - Féminin de p (première ou 1re)<br> `l` - chiffres en Lettres<br> `o` - lettres ou chiffres en Ordinaux<br> `p` - Premier ou 1er<br> `r` - chiffres en Romains<br> `v` - chiffres en lettres (Vieille notation)<br> `z` - Zéro devant le chiffre<br> |
| [erreur] | <code>Chaîne</code> | <code>&#x27;Pas de correspondances.&#x27;</code> | Le message d'erreur |
| [rappel] | <code>Fonction</code> |  | Une fonction de rappel |

**Exemple** :  
```js
new acte.Jour('1/1/1600').gregorien('%J %Mlb %A'); // '1 janvier 1600'
```
* * *
Créé et maintenu par [@gtoubiana](https://github.com/gtoubiana/).<br>
Code sous licence [MIT](https://github.com/gtoubiana/acte/blob/master/LICENSE), documentation sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).
