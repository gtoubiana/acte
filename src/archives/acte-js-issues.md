Créer un logo pour Acte.js
--
Voir http://www.fontspace.com/sam-wang :
- http://www.fontspace.com/sam-wang/argos-a-nouveau
- http://www.fontspace.com/sam-wang/gismonda
- http://www.fontspace.com/sam-wang/harrington

-----

Configurer testling & tape OU open sauce lab
--
- https://ci.testling.com/
- https://saucelabs.com/beta/dashboard/manual

-----

acte.jour({string}).gregorien({template}, {fallback}, {callback})
--
- {string} : exemple "Jeudi 5 juillet 2056"
- {template} : exemple "%jdsc %jdmc %mc %ac"
- {fallback} : exemple "Pas de correspondance"
- {callback} : exemple "function () { return this.variables.julien.njj; }"

exemple de callback : http://jsfiddle.net/toubia95/y11p6smu/
Pour l'exemple jsdoc, permettre par exemple d'afficher l'année sur 2 chiffres, ce qui n'est pas prévu par défaut...

exemple de remplacements multiples : http://jsfiddle.net/toubia95/19om2mz0/

-----

Page de démo
--
- gros champ de saisie pour date - (i) pour en savoir plus sur les formats acceptés
- zone d'affichage des dates grégoriennes, républicaines et juliennes
- (a) avancé pour modifier l'affichage en sortie avec une explication des différents arguments

-----

acte.jour().julien()
--
- incorporer les script de conversion en date julienne
- limiter les calculs à la date de mise en utilisation de ce calendrier (calendrier introduit en -46 av JC)
- = new acte.jour("20 octobre 2015").jour("julien.od").gregorien();

-----

acte.jour().republicain()
--
Vérifier les erreurs en grégorien:
- date hors de la période républicaine
- jour plus grand que 40 ?
- année plus grande que XV ?

-----

acte.jour().gregorien() 
--
**Proposition qui comprends tous les cas de figure:**
- Insérer une date : `%`
- `j`our de la semaine (grégorien/julien) / `j`our de la décade (républicain) : `j` (ex: `%j`)
- `J`our du mois : `J` (ex: `%J`)
- `M`ois : `M` (ex: `%M`)
- `A`nnée : `A` (ex: `%A`)
- `D`écade : `D` (républicain) (ex: `%D`)
- en `c`hiffres arabes : `c` (ex: `%Jc`)
- en chiffres `r`omains : `r` (ex: `%Ar`)
- avec un préfixe `z`éro : `z` (ex: `%Jz`)
- en toutes `l`ettres : `l` (ex: `%jl`)
- tout en `m`ajuscules / capitales : `m` (ex: `%Arm`)
- tout en `b`as-de-casse / minuscules : `b` (ex: `%Arb`)
- la `p`remière lettre en majuscule : `p` (ex: `%jlp`)
- `a`bréviation courante (jour/mois) : `a` (ex: `%jla`)
- code / abréviation sur `u`n caractère (jour/mois) : `u` (ex: `%jlu`)
- code / abréviation sur `d`eux caractères (jour/mois) : `d` (ex: `%jld`)
- code / abréviation sur `t`rois caractères (jour/mois) : `t` (ex: `%jlt`)
- pourcentage : `%` (ex : `%%`)

exemples de script:
```
acte.Jour.prototype.gregorien = function (format, erreur, rappel) {
  erreur = erreur || "Pas de correspondances.";
  format = format.replace(/%[JMAmb]+/g, function(result) {
    var min,maj;
    if (result.match(/m/)) { maj = "m" } ;
    if (result.match(/b/)) { min = "b" } ;
    if (result.match(/J/)) { result = "Jour"; };
    if (result.match(/M/)) { result = "Mois"; };
    if (result.match(/A/)) { result = "Année"; };
    if (maj) { result = result.toUpperCase(); } ;
    if (min) { result = result.toLowerCase(); } ;
    return result;
  });
  if (rappel) {rappel();}
  return format;
};
```
1. Commencer par récupérer les labels de modification
2. Modification des valeurs valeurs (ex : J, M, A...)
    1. Modifications en fonction du type de valeur (ex: a, d, t...)
3. Modifications globales (ex: m, b, r...)

Voir : http://jsfiddle.net/toubia95/19om2mz0/

Tableaux: 
```
var GREGORIEN_MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
var GREGORIEN_MOIS_ABBR = ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juill", "Août", "Sept", "Oct", "Nov", "Déc"];
var GREGORIEN_MOIS_ABBR_TROIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
var GREGORIEN_MOIS_ABBR_DEUX = ["Jr", "Fr", "Ms", "Al", "Mi", "Jn", "Jt", "At", "Se", "Oe", "Ne", "De"];
var GREGORIEN_MOIS_ABBR_UN = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

var GREGORIEN_JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
var GREGORIEN_JOURS_ABBR = ["Lundi", "Mardi", "Mercr", "Jeudi", "Vendr", "Sam", "Dim"];
var GREGORIEN_JOURS_ABBR_TROIS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
var GREGORIEN_JOURS_ABBR_DEUX = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
var GREGORIEN_JOURS_ABBR_UN = ["L", "M", "M", "J", "V", "S", "D"];
```

-----