describe('Recettes', () => {
  it(
    'Recette 1 : Afficher l\'année sur 2 chiffres',
    () => {
      expect(
        new acte.Jour('3 avril 1605')
        .gregorien('%Jz/%Mz', 0, (res, obj) => {
          const result = `${res}/${acte.prefixeZero(obj.A % 100)}`;

          return result;
        })
      ).toEqual('03/04/05');
    }
  );
  it(
    'Recette 2 : Afficher le siècle',
    () => {
      expect(
        new acte.Jour('8 décembre 2016')
        .gregorien('', 0, (res, obj) => {
          const result =
            `${acte.nombreOrdinal(acte.arabeVersRomain(
            parseInt(obj.A / 100, 10) + 1), 'er', 'e')}`;

          return `${result} siècle`;
        })
      ).toEqual('XXIe siècle');
    }
  );
  it(
    'Recette 3 : Afficher Mil plutôt que Mille',
    () => {
      expect(
        new acte.Jour('28/7/1910')
        .gregorien('%Jl %Mlb de l\'an %Avb', 0, (res, obj) => {
          const result = res.replace(/(M|m)(ille)(\s|-|$)/gm,
            '$1il$3');

          return result;
        })
      ).toEqual('Vingt-huit juillet de l\'an mil neuf cent dix');
    }
  );
  it(
    'Recette 4 : Date complète hebdomadaire ISO',
    () => {
      expect(
        new acte.Jour('1/1/2006')
        .gregorien('', 0, (res, obj) => {
          const jour = obj.JS === 0 ? 7 : obj.JS;

          const semaine = obj.S === 0 ? 52 : acte.prefixeZero(obj.S);
          const an = obj.S === 0 ? obj.A - 1 : obj.A;

          return `${an}-W${semaine}-${jour}`;
        })
      ).toEqual('2005-W52-7');
    }
  );
  it(
    'Recette 5 : Saints du jour',
    () => {
      expect(
          new acte.Jour('1/9/2016')

          // voir acte.saintChretien en fin de ce fichier
          .gregorien('{saintChretien}', 0, acte.saintChretien))
        .toEqual('Saint Gilles');
    }
  );
  it(
    'Recette 6 : Jour républicain',
    () => {
      expect(
          new acte.Jour('4 brumaire an V')

          // voir acte.jourRepublicain en fin de ce fichier
          .republicain('Jour {jourRepublicain}', 0, acte.jourRepublicain)
        )
        .toEqual('Jour de la Betterave');
    }
  );
});

/**
 * Nouvelles fonctions
 */

acte.saintChretien = (res, obj) => {
  const saints = [
    ['Sainte Marie', 'Saint Basile', 'Sainte Geneviève', 'Saint Odilon',
      'Saint Edouard', 'Saint Mélaine', 'Saint Raymond', 'Saint Lucien',
      'Sainte Alix', 'Saint Guillaume', 'Saint Paulin', 'Sainte Tatiana',
      'Sainte Yvette', 'Sainte Nina', 'Saint Rémi', 'Saint Marcel',
      'Sainte Roseline', 'Sainte Prisca', 'Saint Marius',
      'Saint Sébastien', 'Sainte Agnès', 'Saint Vincent', 'Saint Barnard',
      'Saint François de Sales', 'Saint Ananie', 'Sainte Paule',
      'Sainte Angèle', 'Saint Thomas d\'Aquin', 'Saint Gildas',
      'Sainte Martine', 'Sainte Marcelle',
    ],
    ['Sainte Ella', 'Présentation', 'Saint Blaise', 'Sainte Véronique',
      'Sainte Agathe', 'Saint Gaston', 'Sainte Eugènie',
      'Sainte Jacqueline', 'Sainte Apolline', 'Saint Arnaud',
      'Notre Dame de Lourdes', 'Saint Félix', 'Sainte Béatrice',
      'Saint Valentin', 'Saint Claude', 'Sainte Julienne', 'Saint Alexis',
      'Sainte Bernadette', 'Saint Gabin', 'Sainte Aimée',
      'Saint Pierre-Damien', 'Sainte Isabelle', 'Saint Lazare',
      'Saint Modeste', 'Saint Roméo', 'Saint Nestor', 'Sainte Honorine',
      'Saint Romain', 'Saint Auguste',
    ],
    ['Saint Aubin', 'Saint Charles le Bon', 'Saint Guénolé',
      'Saint Casimir', 'Sainte Olive', 'Sainte Colette',
      'Sainte Félicité', 'Saint Jean de Dieu', 'Sainte Françoise',
      'Saint Vivien', 'Sainte Rosine', 'Sainte Justine', 'Saint Rodrigue',
      'Sainte Mathilde', 'Sainte Louise', 'Sainte Bénédicte',
      'Saint Patrick', 'Saint Cyrille', 'Saint Joseph', 'Saint Herbert',
      'Sainte Clémence', 'Sainte Léa', 'Saint Victorien',
      'Sainte Catherine de Suède', 'Annonciation', 'Sainte Larissa',
      'Saint Habib', 'Saint Gontran', 'Sainte Gwladys', 'Saint Amédée',
      'Saint Benjamin',
    ],
    ['Saint Hugues', 'Sainte Sandrine', 'Saint Richard', 'Saint Isidore',
      'Sainte Irène', 'Saint Marcellin',
      'Saint Jean-Baptiste de la Salle', 'Sainte Julie', 'Saint Gautier',
      'Saint Fulbert', 'Saint Stanislas', 'Saint Jules', 'Sainte Ida',
      'Saint Maxime', 'Saint Paterne', 'Saint Benoît-Joseph',
      'Saint Anicet', 'Saint Parfait', 'Sainte Emma', 'Sainte Odette',
      'Saint Anselme', 'Saint Alexandre', 'Saint Georges', 'Saint Fidèle',
      'Saint Marc', 'Sainte Alida', 'Sainte Zita', 'Sainte Valérie',
      'Sainte Catherine de Sienne', 'Saint Robert',
    ],
    ['Saint Jérémie', 'Saint Boris', 'Saints Philippe, Jacques',
      'Saint Sylvain', 'Sainte Judith', 'Sainte Prudence',
      'Sainte Gisèle', 'Saint Désiré', 'Saint Pacôme', 'Sainte Solange',
      'Sainte Estelle / Saint Mamert', 'Saint Achille / Saint Pancrace',
      'Sainte Rolande / Saint Servais', 'Saint Matthias', 'Sainte Denise',
      'Saint Honoré', 'Saint Pascal', 'Saint Éric', 'Saint Yves',
      'Saint Bernardin', 'Saint Constantin', 'Saint Émile',
      'Saint Didier', 'Saint Donatien', 'Sainte Sophie', 'Saint Béranger',
      'Saint Augustin', 'Saint Germain', 'Saint Aymard',
      'Saint Ferdinand', 'Visitation de la Sainte Vierge',
    ],
    ['Saint Justin', 'Sainte Blandine', 'Saint Kévin', 'Sainte Clotilde',
      'Saint Igor', 'Saint Norbert', 'Saint Gilbert', 'Saint Médard',
      'Sainte Diane', 'Saint Landry', 'Saint Barnabé', 'Saint Guy',
      'Saint Antoine de Padoue', 'Saint Elisée', 'Sainte Germaine',
      'Saint Jean-François Régis', 'Saint Hervé', 'Saint Léonce',
      'Saint Romuald', 'Saint Silvère', 'Saint Louis de Gonzague',
      'Saint Alban', 'Sainte Audrey', 'Saint Jean-Baptiste',
      'Saint Prosper', 'Saint Anthelme', 'Saint Fernand', 'Sainte Irénée',
      'Saints Pierre, Paul', 'Saint Martial',
    ],
    ['Saint Thierry', 'Saint Martinien', 'Saint Thomas', 'Saint Florent',
      'Saint Antoine', 'Sainte Mariette', 'Saint Raoul', 'Saint Thibault',
      'Sainte Amandine', 'Saint Ulrich', 'Saint Benoît', 'Saint Olivier',
      'Saints Henri, Joël', 'Saint Camille', 'Saint Donald',
      'Notre Dame du Mont Carmel', 'Sainte Charlotte', 'Saint Frédéric',
      'Saint Arsène', 'Sainte Marina', 'Saint Victor',
      'Sainte Marie-Madeleine', 'Sainte Brigitte', 'Sainte Christine',
      'Saint Jacques', 'Saints Anne, Joachin', 'Sainte Nathalie',
      'Saint Samson', 'Sainte Marthe', 'Sainte Juliette',
      'Saint Ignace de Loyola',
    ],
    ['Saint Alphonse', 'Saint Julien Eymard', 'Sainte Lydie',
      'Saint Jean-Marie Vianney', 'Saint Abel', 'Transfiguration',
      'Saint Gaétan', 'Saint Dominique', 'Saint Amour', 'Saint Laurent',
      'Sainte Claire', 'Sainte Clarisse', 'Saint Hippolyte',
      'Saint Evrard', 'Assomption', 'Saint Armel', 'Saint Hyacinthe',
      'Sainte Hélène', 'Saint Jean-Eudes', 'Saint Bernard',
      'Saint Christophe', 'Saint Fabrice', 'Sainte Rose de Lima',
      'Saint Barthélémy', 'Saint Louis', 'Sainte Natacha',
      'Saint Monique', 'Saint Augustin', 'Sainte Sabine', 'Saint Fiacre',
      'Saint Aristide',
    ],
    ['Saint Gilles', 'Sainte Ingrid', 'Saint Grégoire', 'Sainte Rosalie',
      'Sainte Raïssa', 'Saint Bertrand', 'Sainte Reine', 'Saint Nativité',
      'Saint Alain', 'Sainte Inès', 'Saint Adelphe', 'Saint Apollinaire',
      'Saint Aimé', 'La Sainte-Croix', 'Saint Roland', 'Sainte Edith',
      'Saint Renaud', 'Sainte Nadège', 'Sainte Émilie', 'Saint Davy',
      'Saint Matthieu', 'Saint Maurice', 'Saint Constant',
      'Sainte Thècle', 'Saint Hermann', 'Saints Côme, Damien',
      'Saint Vincent de Paul', 'Saint Venceslas',
      'Saints Michel, Gabriel, Raphaël', 'Saint Jérôme',
    ],
    ['Sainte Thérèse de l\'Enfant Jésus', 'Saint Léger', 'Saint Gérard',
      'Saint François d\'Assise', 'Sainte Fleur', 'Saint Bruno',
      'Saint Serge', 'Sainte Pélagie', 'Saint Denis', 'Saint Ghislain',
      'Saint Firmin', 'Saint Wilfried', 'Saint Géraud', 'Saint Juste',
      'Sainte Thérèse d\'Avila', 'Sainte Edwige', 'Saint Baudoin',
      'Saint Luc', 'Saint René', 'Sainte Adeline', 'Sainte Céline',
      'Sainte Élodie', 'Saint Jean de Capistran', 'Saint Florentin',
      'Saint Crépin', 'Saint Dimitri', 'Sainte Émeline',
      'Saints Simon, Jude', 'Saint Narcisse', 'Saint Bienvenu',
      'Saint Quentin',
    ],
    ['Toussaint', 'Jour des défunts', 'Saint Hubert', 'Saint Charles',
      'Sainte Sylvie', 'Sainte Bertille', 'Sainte Carine',
      'Saint Geoffroy', 'Saint Théodore', 'Saint Léon', 'Saint Martin',
      'Saint Christian', 'Saint Brice', 'Saint Sidoine', 'Saint Albert',
      'Sainte Marguerite', 'Sainte Élisabeth', 'Sainte Aude',
      'Saint Tanguy', 'Saint Edmond', 'Saint Rufus', 'Sainte Cécile',
      'Saint Clément', 'Sainte Flore', 'Sainte Catherine',
      'Sainte Delphine', 'Saint Sévrin', 'Saint Jacques de la Marche',
      'Saint Saturnin', 'Saint André',
    ],
    ['Sainte Florence', 'Sainte Viviane', 'Saint François-Xavier',
      'Sainte Barbara', 'Saint Gérald', 'Saint Nicolas', 'Saint Ambroise',
      'Immaculée Conception', 'Saint Pierre Fourier', 'Saint Romaric',
      'Saint Daniel', 'Sainte Jeanne-Françoise de Chantal',
      'Sainte Lucie', 'Sainte Odile', 'Sainte Ninon', 'Sainte Alice',
      'Saint Gaël', 'Saint Gatien', 'Saint Urbain', 'Saint Théophile',
      'Saint Pierre', 'Sainte Françoise-Xavière', 'Saint Armand',
      'Sainte Adèle', 'Nativité du Christ', 'Saint Etienne',
      'Saint Jean l\'évangile', 'Saints Innocents', 'Saint David',
      'Saint Roger', 'Saint Sylvestre / Sainte Famille',
    ],
  ];

  return res.replace(/{saintChretien}/g, saints[obj.M - 1][obj.J - 1]);
};
acte.jourRepublicain = (res, obj) => {
  const jours = [
    ['du Raisin', 'du Safran', 'de la Châtaigne', 'de la Colchique',
      'du Cheval', 'de la Balsamine', 'de la Carotte', 'de l\'Amarante',
      'du Panais', 'de la Cuve', 'de la Pomme de terre',
      'de l\'Immortelle', 'du Potiron', 'du Réséda', 'de l\'Âne',
      'de la Belle de nuit', 'de la Citrouille', 'du Sarrasin',
      'du Tournesol', 'du Pressoir', 'du Chanvre', 'de la Pêche',
      'du Navet', 'de l\'Amaryllis', 'du Bœuf', 'de l\'Aubergine',
      'du Piment', 'de la Tomate', 'de l\'Orge', 'du Tonneau',
    ],
    ['de la Pomme', 'du Céleri', 'de la Poire', 'de la Betterave',
      'de l\'Oie', 'de l\'Héliotrope', 'de la Figue', 'de la Scorsonère',
      'de l\'Alisier', 'de la Charrue', 'du Salsifis', 'de la Mâcre',
      'du Topinambour', 'de l\'Endive', 'du Dindon', 'du Chervis',
      'du Cresson', 'de la Dentelaire', 'de la Grenade', 'de la Herse',
      'de la Bacchante', 'de l\'Azerole', 'de la Garance', 'de l\'Orange',
      'du Faisan', 'de la Pistache', 'du Macjonc', 'du Coing',
      'du Cormier', 'du Rouleau',
    ],
    ['de la Raiponce', 'du Turneps', 'du Chicorée', 'de la Nèfle',
      'du Cochon', 'de la Mâche', 'du Chou-fleur', 'du Miel',
      'du Genièvre', 'de la Pioche', 'de la Cire', 'du Raifort',
      'du Cèdre', 'du Sapin', 'du Chevreuil', 'de l\'Ajonc', 'du Cyprès',
      'du Lierre', 'de la Sabine', 'du Hoyau', 'de l\'Érable sucré',
      'de la Bruyère', 'du Roseau', 'de l\'Oseille', 'du Grillon',
      'du Pignon', 'du Liège', 'de la Truffe', 'de l\'Olive',
      'de la Pelle',
    ],
    ['de la Tourbe', 'de la Houille', 'du Bitume', 'du Soufre',
      'du Chien', 'de la Lave', 'de la Terre végétale', 'du Fumier',
      'du Salpêtre', 'du Fléau', 'du Granit', 'de l\'Argile',
      'de l\'Ardoise', 'du Grès', 'du Lapin', 'du Silex', 'de la Marne',
      'de la Pierre à chaux', 'du Marbre', 'du Van',
      'de la Pierre à plâtre', 'du Sel', 'du Fer', 'du Cuivre', 'du Chat',
      'de l\'Étain', 'du Plomb', 'du Zinc', 'du Mercure', 'du Crible',
    ],
    ['de la Lauréole', 'de la Mousse', 'du Fragon', 'du Perce-neige',
      'du Taureau', 'du Laurier tin', 'de l\'Amadouvier', 'du Mézéréon',
      'du Peuplier', 'de la Cognée', 'de l\'Ellébore', 'du Brocoli',
      'du Laurier', 'de l\'Avelinier', 'de la Vache', 'du Buis',
      'du Lichen', 'de l\'If', 'de la Pulmonaire', 'de la Serpette',
      'du Thlaspi', 'du Thimele', 'du Chiendent', 'de la Trainasse',
      'du Lièvre', 'de la Guède', 'du Noisetier', 'du Cyclamen',
      'de la Chélidoine', 'du Traîneau',
    ],
    ['du Tussilage', 'du Cornouiller', 'du Violier', 'du Troène',
      'du Bouc', 'de l\'Asaret', 'de l\'Alaterne', 'de la Violette',
      'du Marceau', 'de la Bêche', 'de la Narcisse', 'de l\'Orme',
      'de la Fumeterre', 'du Vélar', 'de la Chèvre', 'de l\'Épinard',
      'du Doronic', 'du Mouron', 'du Cerfeuil', 'du Cordeau',
      'de la Mandragore', 'du Persil', 'de la Cochléaria',
      'de la Pâquerette', 'du Thon', 'du Pissenlit', 'de la Sylvie',
      'de la Capillaire', 'du Frêne', 'du Plantoir',
    ],
    ['de la Primevère', 'du Platane', 'de l\'Asperge', 'de la Tulipe',
      'de la Poule', 'de la Bette', 'du Bouleau', 'de la Jonquille',
      'de l\'Aulne', 'du Greffoir', 'de la Pervenche', 'du Charme',
      'de la Morille', 'du Hêtre', 'de l\'Abeille', 'de la Laitue',
      'du Mélèze', 'de la Ciguë', 'du Radis', 'de la Ruche', 'du Gainier',
      'de la Romaine', 'du Marronnier', 'de la Roquette', 'du Pigeon',
      'du Lilas (commun)', 'de l\'Anémone', 'de la Pensée',
      'de la Myrtille', 'du Couvoir',
    ],
    ['de la Rose', 'du Chêne', 'de la Fougère', 'de l\'Aubépine',
      'du Rossignol', 'de l\'Ancolie', 'du Muguet', 'du Champignon',
      'de l\'Hyacinthe', 'du Râteau', 'de la Rhubarbe', 'du Sainfoin',
      'du Bâton-d\'or', 'du Chamérisier', 'du Ver à soie',
      'de la Consoude', 'de la Pimprenelle', 'de la Corbeille d\'or',
      'de l\'Arroche', 'du Sarcloir', 'de la Statice',
      'de la Fritillaire', 'de la Bourrache', 'de la Valériane',
      'de la Carpe', 'du Fusain', 'de la Civette', 'de la Buglose',
      'du Sénevé', 'de la Houlette',
    ],
    ['de la Luzerne', 'de l\'Hémérocalle', 'du Trèfle', 'de l\'Angélique',
      'du Canard', 'de la Mélisse', 'de la Fromental', 'du Lis martagon',
      'du Serpolet', 'de la Faux', 'de la Fraise', 'de la Bétoine',
      'du Pois', 'de l\'Acacia', 'de la Caille', 'de l\'Œillet',
      'du Sureau', 'du Pavot', 'du Tilleul', 'de la Fourche',
      'du Barbeau', 'de la Camomille', 'du Chèvrefeuille',
      'du Caille-lait', 'de la Tanche', 'du Jasmin', 'de la Verveine',
      'du Thym', 'de la Pivoine', 'du Chariot',
    ],
    ['du Seigle', 'de l\'Avoine', 'de l\'Oignon', 'de la Véronique',
      'du Mulet', 'du Romarin', 'du Concombre', 'de l\'Échalote',
      'de l\'Absinthe', 'de la Faucille', 'de la Coriandre',
      'de l\'Artichaut', 'de la Girofle', 'de la Lavande', 'du Chamois',
      'du Tabac', 'de la Groseille', 'de la Gesse', 'de la Cerise',
      'du Parc', 'de la Menthe', 'du Cumin', 'du Haricot',
      'de l\'Orcanète', 'de la Pintade', 'de la Sauge', 'de l\'Ail',
      'de la Vesce', 'du Blé', 'du Chalemie',
    ],
    ['de l\'Épeautre', 'du Bouillon-blanc', 'du Melon', 'de l\'Ivraie',
      'du Bélier', 'de la Prêle', 'de l\'Armoise', 'du Carthame',
      'de la Mûre', 'de l\'Arrosoir', 'du Panic', 'de la Salicorne',
      'de l\'Abricot', 'du Basilic', 'de la Brebis', 'de la Guimauve',
      'du Lin', 'de l\'Amande', 'de la Gentiane', 'de l\'Écluse',
      'de la Carline', 'du Câprier', 'de la Lentille', 'de l\'Aunée',
      'de la Loutre', 'du Myrte', 'du Colza', 'du Lupin', 'du Coton',
      'du Moulin',
    ],
    ['de la Prune', 'du Millet', 'du Lycoperdon', 'de l\'Escourgeon',
      'du Saumon', 'de la Tubéreuse', 'du Sucrion', 'de l\'Apocyn',
      'de la Réglisse', 'de l\'Échelle', 'de la Pastèque', 'du Fenouil',
      'de l\'Épine vinette', 'de la Noix', 'de la Truite', 'du Citron',
      'de la Cardère', 'du Nerprun', 'du Tagette', 'de la Hotte',
      'de l\'Églantier', 'de la Noisette', 'du Houblon', 'du Sorgho',
      'de l\'Écrevisse', 'de la Bigarade', 'de la Verge d\'or', 'du Maïs',
      'du Marron', 'du Panier',
    ],
    ['de la Vertu', 'du Génie', 'du Travail', 'de l\'Opinion',
      'des Récompenses', 'de la Révolution',
    ],
  ];

  return res.replace(/{jourRepublicain}/g, jours[obj.M - 1][obj.J - 1]);
};
