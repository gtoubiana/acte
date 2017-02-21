![logo](docs/img/logo-violet.png "Logo de la librairie acte.js")<br>
[![NPM version](https://img.shields.io/npm/v/acte.svg)](https://www.npmjs.com/package/acte)
[![Build Status](https://img.shields.io/travis/gtoubiana/acte.svg)](https://travis-ci.org/gtoubiana/acte)
[![devDependency Status](https://img.shields.io/david/dev/gtoubiana/acte.svg?maxAge=2592000)](https://david-dm.org/gtoubiana/acte?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/gtoubiana/acte/badge.svg?branch=master&bust=1)](https://coveralls.io/github/gtoubiana/acte?branch=master)
> Une librairie JavaScript qui simplifie la recherche généalogique.

## Table des matières
-   [Installation](#installation)
  -   [Options disponibles](#options)
  -   [Structure des fichiers](#structure)
  -   [Compatibilité](#compatibilite)
-   [Utilisation](#utilisation)
  -   [Exemples](#exemples)
  -   [Documentation](#documentation)
-   [Membres actifs](#membres)
-   [Contribuer](#contributing)
-   [Licence](#licence)

<a name="installation"></a>
## Installation

<a name="options"></a>
#### Options disponibles
-   Télécharger la dernière archive ([acte-0.0.18-dist.zip](https://github.com/gtoubiana/acte/blob/master/dist/acte-0.0.18-dist.zip?raw=true))
-   Installer avec [npm](https://www.npmjs.com/) : `npm install acte --save`

<a name="structure"></a>
#### Structure des fichiers
L'archive `.zip` contient le script dans sa version minifiée, une source map pour déboguer et un fichier README écrit en markdown, contenant la documentation pour les développeurs.
```
acte
└── dist
    ├── acte-0.0.18-dist.zip
    ├── acte.min.js
    ├── acte.min.js.map
    └── README.md
```

<a name="compatibilite"></a>
#### Compatibilité
[![Sauce Test Status](https://saucelabs.com/browser-matrix/gtoubiana.svg)](https://saucelabs.com/u/gtoubiana)
Dans sa version actuelle, le script fonctionne sous Internet Explorer 8.

<a name="utilisation"></a>
## Utilisation

<a name="exemples"></a>
#### Exemples
-   Essayez la librairie dans votre navigateur avec [RunKit](https://runkit.com/gtoubiana/fonctionnement-de-la-librairie-acte-js).
-   [Autres exemples d'utilisation avec RunKit](https://runkit.com/gtoubiana/recettes-pour-la-librairie-acte-js).

<a name="documentation"></a>
#### Documentation
-   [Documentation](https://github.com/gtoubiana/acte/blob/master/dist/README.md#documentation-de-acte) générée par jsdoc-to-markdown.
-   [Tests unitaires](https://github.com/gtoubiana/acte/blob/master/test/jasmine/acteSpec.js) rédigés pour Node et Jasmine.

<a name="membres"></a>
## Membres actifs
-   [Gilles Toubiana](https://github.com/gtoubiana/)

<a name="contributing"></a>
## Contribuer
Ce script respecte les recommandations [airbnb](http://nerds.airbnb.com/our-javascript-style-guide/) pour l'écriture du code JavaScript.<br>
Le code est évalué par [eslint](https://www.npmjs.com/package/eslint-config-airbnb) et certifié par codeclimate et codacy.
[![Code Climate](https://codeclimate.com/github/gtoubiana/acte/badges/gpa.svg)](https://codeclimate.com/github/gtoubiana/acte)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9410c94facba45d8ab9c2c2e44de68a7)](https://www.codacy.com/app/gilles-toubiana/acte?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gtoubiana/acte&amp;utm_campaign=Badge_Grade)

<a name="licence"></a>
## Licence
acte est une création de [Gilles Toubiana](https://github.com/gtoubiana/) - 2015-Présent.<br>
[Code](https://github.com/gtoubiana/acte) sous licence [MIT](https://github.com/gtoubiana/acte/blob/master/LICENSE), [documentation](https://github.com/gtoubiana/acte/blob/master/dist/README.md) sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).
