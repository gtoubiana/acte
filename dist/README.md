# Documentation de Acte

## Installation :
```
$ npm install acte --save-dev
```

## API de référence :
<a name="acte"></a>

## acte : <code>Objet</code>
acte - Librairie Javascript pour manipuler des données généalogiques

**Type** : Espace de noms global  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Version** : 0.0.1  
**Licence** : MIT  
**Copyright** : 2015-2016, Gilles Toubiana  

* [acte](#acte) : <code>Objet</code>
    * [.Jour](#acte.Jour) ↩︎
        * [new acte.Jour(saisie, [limites])](#new_acte.Jour_new)

<a name="acte.Jour"></a>

### acte.Jour ↩︎
**Type** : Classe statique de <code>[acte](#acte)</code>  
**Fonction chainable**  
**Accès** : public  
**Voir** : [Projet sur GitHub](https://github.com/gtoubiana/acte)  
**Depuis** : 0.0.1  
**Version** : 0.0.1  
**Auteur** : Gilles Toubiana  
**Licence** : MIT  
<a name="new_acte.Jour_new"></a>

#### new acte.Jour(saisie, [limites])
Pour convertir une saisie en objet JavaScript


| Paramètres | Type | Par défaut | Description |
| --- | --- | --- | --- |
| saisie | <code>Chaîne</code> |  | Saisie d'une date grégorienne ou républicaine. |
| [limites] | <code>Booléen</code> | <code>true</code> | Par défaut, les résultats sont limités aux périodes d'utilisation des calendriers :<br> - une saisie de date grégorienne sera considérée comme julienne avant le 15/10/1582<br> - une saisie de date républicaine ne sera valide que du 22/9/1792 au 31/12/1805 (Période républicaine) et du 18/3/1871 au 28/5/1871 (Commune de Paris).<br> La valeur `false` permet de désactiver ces limitations. |

* * *
Créé et maintenu par [@gtoubiana](https://github.com/gtoubiana/).<br>
Code sous licence [MIT](https://github.com/gtoubiana/acte/blob/gh-pages/LICENSE), documentation sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).
