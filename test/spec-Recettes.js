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
          const [semaine, an] = obj.S === 0 ? [52, obj.A - 1] : [
            acte.prefixeZero(obj.S), obj.A,
          ];

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
        .gregorien('', 0, (res, obj) => {
          const saints = [
            ['Sainte Marie', 'Saint Basile', 'Sainte Geneviève',
              'Saint Odilon', 'Saint Edouard', 'Saint Mélaine',
              'Saint Raymond', 'Saint Lucien', 'Sainte Alix',
              'Saint Guillaume', 'Saint Paulin', 'Sainte Tatiana',
              'Sainte Yvette', 'Sainte Nina', 'Saint Rémi',
              'Saint Marcel', 'Sainte Roseline', 'Sainte Prisca',
              'Saint Marius', 'Saint Sébastien', 'Sainte Agnès',
              'Saint Vincent', 'Saint Barnard',
              'Saint François de Sales', 'Saint Ananie',
              'Sainte Paule', 'Sainte Angèle',
              'Saint Thomas d\'Aquin', 'Saint Gildas',
              'Sainte Martine', 'Sainte Marcelle',
            ],
            ['Sainte Ella', 'Présentation', 'Saint Blaise',
              'Sainte Véronique', 'Sainte Agathe', 'Saint Gaston',
              'Sainte Eugènie', 'Sainte Jacqueline',
              'Sainte Apolline',
              'Saint Arnaud', 'Notre Dame de Lourdes',
              'Saint Félix',
              'Sainte Béatrice', 'Saint Valentin', 'Saint Claude',
              'Sainte Julienne', 'Saint Alexis',
              'Sainte Bernadette',
              'Saint Gabin', 'Sainte Aimée',
              'Saint Pierre-Damien',
              'Sainte Isabelle', 'Saint Lazare', 'Saint Modeste',
              'Saint Roméo',
              'Saint Nestor', 'Sainte Honorine', 'Saint Romain',
              'Saint Auguste',
            ],
            ['Saint Aubin', 'Saint Charles le Bon',
              'Saint Guénolé',
              'Saint Casimir', 'Sainte Olive', 'Sainte Colette',
              'Sainte Félicité', 'Saint Jean de Dieu',
              'Sainte Françoise',
              'Saint Vivien', 'Sainte Rosine', 'Sainte Justine',
              'Saint Rodrigue', 'Sainte Mathilde',
              'Sainte Louise',
              'Sainte Bénédicte', 'Saint Patrick',
              'Saint Cyrille',
              'Saint Joseph', 'Saint Herbert', 'Sainte Clémence',
              'Sainte Léa',
              'Saint Victorien', 'Sainte Catherine de Suède',
              'Annonciation',
              'Sainte Larissa', 'Saint Habib', 'Saint Gontran',
              'Sainte Gwladys', 'Saint Amédée', 'Saint Benjamin',
            ],
            ['Saint Hugues', 'Sainte Sandrine', 'Saint Richard',
              'Saint Isidore', 'Sainte Irène', 'Saint Marcellin',
              'Saint Jean-Baptiste de la Salle', 'Sainte Julie',
              'Saint Gautier', 'Saint Fulbert', 'Saint Stanislas',
              'Saint Jules', 'Sainte Ida', 'Saint Maxime',
              'Saint Paterne',
              'Saint Benoît-Joseph', 'Saint Anicet',
              'Saint Parfait',
              'Sainte Emma', 'Sainte Odette', 'Saint Anselme',
              'Saint Alexandre', 'Saint Georges', 'Saint Fidèle',
              'Saint Marc',
              'Sainte Alida', 'Sainte Zita', 'Sainte Valérie',
              'Sainte Catherine de Sienne', 'Saint Robert',
            ],
            ['Saint Jérémie', 'Saint Boris',
              'Saints Philippe, Jacques',
              'Saint Sylvain', 'Sainte Judith', 'Sainte Prudence',
              'Sainte Gisèle', 'Saint Désiré', 'Saint Pacôme',
              'Sainte Solange',
              'Sainte Estelle / Saint Mamert',
              'Saint Achille / Saint Pancrace',
              'Sainte Rolande / Saint Servais', 'Saint Matthias',
              'Sainte Denise', 'Saint Honoré', 'Saint Pascal',
              'Saint Éric',
              'Saint Yves', 'Saint Bernardin', 'Saint Constantin',
              'Saint Émile', 'Saint Didier', 'Saint Donatien',
              'Sainte Sophie',
              'Saint Béranger', 'Saint Augustin', 'Saint Germain',
              'Saint Aymard', 'Saint Ferdinand',
              'Visitation de la Sainte Vierge',
            ],
            ['Saint Justin', 'Sainte Blandine', 'Saint Kévin',
              'Sainte Clotilde', 'Saint Igor', 'Saint Norbert',
              'Saint Gilbert',
              'Saint Médard', 'Sainte Diane', 'Saint Landry',
              'Saint Barnabé',
              'Saint Guy', 'Saint Antoine de Padoue',
              'Saint Elisée',
              'Sainte Germaine', 'Saint Jean-François Régis',
              'Saint Hervé',
              'Saint Léonce', 'Saint Romuald', 'Saint Silvère',
              'Saint Louis de Gonzague', 'Saint Alban',
              'Sainte Audrey',
              'Saint Jean-Baptiste', 'Saint Prosper',
              'Saint Anthelme',
              'Saint Fernand', 'Sainte Irénée',
              'Saints Pierre, Paul',
              'Saint Martial',
            ],
            ['Saint Thierry', 'Saint Martinien', 'Saint Thomas',
              'Saint Florent', 'Saint Antoine', 'Sainte Mariette',
              'Saint Raoul', 'Saint Thibault', 'Sainte Amandine',
              'Saint Ulrich', 'Saint Benoît', 'Saint Olivier',
              'Saints Henri, Joël', 'Saint Camille',
              'Saint Donald',
              'Notre Dame du Mont Carmel', 'Sainte Charlotte',
              'Saint Frédéric',
              'Saint Arsène', 'Sainte Marina', 'Saint Victor',
              'Sainte Marie-Madeleine', 'Sainte Brigitte',
              'Sainte Christine',
              'Saint Jacques', 'Saints Anne, Joachin',
              'Sainte Nathalie',
              'Saint Samson', 'Sainte Marthe', 'Sainte Juliette',
              'Saint Ignace de Loyola',
            ],
            ['Saint Alphonse', 'Saint Julien Eymard',
              'Sainte Lydie',
              'Saint Jean-Marie Vianney', 'Saint Abel',
              'Transfiguration',
              'Saint Gaétan', 'Saint Dominique', 'Saint Amour',
              'Saint Laurent',
              'Sainte Claire', 'Sainte Clarisse',
              'Saint Hippolyte', 'Saint Evrard',
              'Assomption', 'Saint Armel', 'Saint Hyacinthe',
              'Sainte Hélène',
              'Saint Jean-Eudes', 'Saint Bernard',
              'Saint Christophe',
              'Saint Fabrice', 'Sainte Rose de Lima',
              'Saint Barthélémy',
              'Saint Louis', 'Sainte Natacha', 'Saint Monique',
              'Saint Augustin',
              'Sainte Sabine', 'Saint Fiacre', 'Saint Aristide',
            ],
            ['Saint Gilles', 'Sainte Ingrid', 'Saint Grégoire',
              'Sainte Rosalie',
              'Sainte Raïssa', 'Saint Bertrand', 'Sainte Reine',
              'Saint Nativité',
              'Saint Alain', 'Sainte Inès', 'Saint Adelphe',
              'Saint Apollinaire',
              'Saint Aimé', 'La Sainte-Croix', 'Saint Roland',
              'Sainte Edith',
              'Saint Renaud', 'Sainte Nadège', 'Sainte Émilie',
              'Saint Davy',
              'Saint Matthieu', 'Saint Maurice', 'Saint Constant',
              'Sainte Thècle',
              'Saint Hermann', 'Saints Côme, Damien',
              'Saint Vincent de Paul',
              'Saint Venceslas',
              'Saints Michel, Gabriel, Raphaël', 'Saint Jérôme',
            ],
            ['Sainte Thérèse de l\'Enfant Jésus', 'Saint Léger',
              'Saint Gérard',
              'Saint François d\'Assise', 'Sainte Fleur',
              'Saint Bruno',
              'Saint Serge', 'Sainte Pélagie', 'Saint Denis',
              'Saint Ghislain',
              'Saint Firmin', 'Saint Wilfried', 'Saint Géraud',
              'Saint Juste',
              'Sainte Thérèse d\'Avila', 'Sainte Edwige',
              'Saint Baudoin',
              'Saint Luc', 'Saint René', 'Sainte Adeline',
              'Sainte Céline',
              'Sainte Élodie', 'Saint Jean de Capistran',
              'Saint Florentin',
              'Saint Crépin', 'Saint Dimitri', 'Sainte Émeline',
              'Saints Simon, Jude', 'Saint Narcisse',
              'Saint Bienvenu',
              'Saint Quentin',
            ],
            ['Toussaint', 'Jour des défunts', 'Saint Hubert',
              'Saint Charles', 'Sainte Sylvie', 'Sainte Bertille',
              'Sainte Carine',
              'Saint Geoffroy', 'Saint Théodore', 'Saint Léon',
              'Saint Martin',
              'Saint Christian', 'Saint Brice', 'Saint Sidoine',
              'Saint Albert',
              'Sainte Marguerite', 'Sainte Élisabeth',
              'Sainte Aude',
              'Saint Tanguy', 'Saint Edmond', 'Saint Rufus',
              'Sainte Cécile',
              'Saint Clément', 'Sainte Flore', 'Sainte Catherine',
              'Sainte Delphine', 'Saint Sévrin',
              'Saint Jacques de la Marche',
              'Saint Saturnin', 'Saint André',
            ],
            ['Sainte Florence', 'Sainte Viviane',
              'Saint François-Xavier',
              'Sainte Barbara', 'Saint Gérald', 'Saint Nicolas',
              'Saint Ambroise',
              'Immaculée Conception', 'Saint Pierre Fourier',
              'Saint Romaric',
              'Saint Daniel',
              'Sainte Jeanne-Françoise de Chantal',
              'Sainte Lucie',
              'Sainte Odile', 'Sainte Ninon', 'Sainte Alice',
              'Saint Gaël',
              'Saint Gatien', 'Saint Urbain', 'Saint Théophile',
              'Saint Pierre',
              'Sainte Françoise-Xavière', 'Saint Armand',
              'Sainte Adèle',
              'Nativité du Christ', 'Saint Etienne',
              'Saint Jean l\'évangile',
              'Saints Innocents', 'Saint David', 'Saint Roger',
              'Saint Sylvestre / Sainte Famille',
            ],
          ];
          const resultat = saints[obj.M - 1][obj.J - 1];

          return resultat;
        })
      ).toEqual('Saint Gilles');
    }
  );
});
