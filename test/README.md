# Dossier des tests

**Ce dossier contient :**
-   `spec-*.js` - tous les fichiers de tests par constructeurs et prototypes
-   Dossier `/jasmine`
    -   `SpecRunner.html` pour visualiser les tests dans le navigateur
    -   `/lib` - toutes les librairies css/js pour jasmine
        -   le script `acte.js` non minifié
        -   `acteSpec.js` - le fichier des tests concaténés
-   Dossier `/karma`
    -   `krama.conf-ci.js` pour configurer les tests karma lancés depuis Travis
    -   `krama.conf.js` pour configurer les tests karma en local
-   Dossier `/coverage` contenant le rapport en html `/coverage/lcov-report/index.html` un fois que la tâche de coverage a été réalisée.
