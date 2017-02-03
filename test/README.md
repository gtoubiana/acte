# Dossier des tests

**Ce dossier contient :**
-   tous les fichiers de tests par constructeurs et prototypes (`spec-*.js`)
-   Dossier `/jasmine` contenant :
  - `SpecRunner.html` pour visualiser les tests dans le navigateur
  -  Dossier `/lib` contenant :
    -  les librairies css/js pour jasmine :
      -  `boot.js`
      -  `jasmine-html.js`
      -  `jasmine.css`
      -  `jasmine.js`
      -  `json2.js`
      -  `node_boot.js`
    -   le script `acte.js` non minifié
    -   `acteSpec.js` - le fichier des tests concaténés
-   Dossier `/karma` contenant :
  -  `krama.conf-ci.js` pour configurer les tests karma lancés depuis Travis
  -  `krama.conf.js` pour configurer les tests karma en local
-   Dossier `/coverage` contenant le rapport en html `/coverage/lcov-report/index.html` un fois que la tâche de coverage a été réalisée.
