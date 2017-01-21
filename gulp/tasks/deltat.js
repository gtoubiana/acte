/** TACHES PRINCIPALES DU FICHIER :
 * gulp delta.scrap
 * gulp delta.csv
 * gulp delta.json
 * gulp delta.js
 * gulp delta.clean
 *
 * npm run delta
 */

/* eslint-disable no-console,strict */
const csv2json = require('gulp-csv2json');
const del = require('del');
const fs = require('fs-extra');
const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const scraper = require('website-scraper');

/* TASK: copier les données dans ./src/data/deltat.csv */
gulp.task('delta.scrap', () => {
  const stream = scraper.scrape({
    urls: [
      {
        url: 'http://maia.usno.navy.mil/ser7/deltat.data',
        filename: 'deltat.csv',
      },
    ],
    directory: './src/data',
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; ' +
          'Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko)' +
          ' Chrome/52.0.2743.116 Safari/537.36',
      },
    },
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });

  return stream;
});

/* TASK: formater le fichier ./src/data/deltat.csv */
gulp.task('delta.csv', () => {
  gulp.src('./src/data/deltat.csv')
    .pipe(replace('\n ', '\n'))
    .pipe(replace('  ', ' '))
    .pipe(replace(' ', ','))
    .pipe(replace('\n,', '\n'))
    .pipe(replace(',1973,2,1', '"an","mois","jour","deltat"\n1973,2,1'))
    .pipe(gulp.dest('./src/data/'));
});

/* TASK: générer le fichier ./src/data/deltat.json */
gulp.task('delta.json', () => {
  // Based on options specified here : http://csv.adaltas.com/parse/
  const csvParseOptions = {
    auto_parse: true,
  };

  gulp.src('./src/data/deltat.csv')
    .pipe(csv2json(csvParseOptions))
    .pipe(rename({
      extname: '.json',
    }))
    .pipe(gulp.dest('./src/data/'));
});

/* TASK: générer le fichier ./src/js/private/constants/delta.js */
gulp.task('delta.js', () => {
  'use strict';
  const deltat = JSON.parse(fs.readFileSync('./src/data/deltat.json',
    'utf8'));

  const deltatAverageForOneYears = (current) => {
    'use strict';
    const currentYear = parseInt(current, 10);
    const test = deltat.filter((item) => {
      const result = parseInt(item.an, 10) === currentYear;

      return result;
    });
    let sum = 0;

    sum = test.reduce((temp, item) => {
      const result = temp + parseFloat(item.deltat);

      return result;
    }, 0);

    const moy = sum / test.length;

    return Number(moy.toFixed(2));
  };

  const arry = [];
  const an = new Date().getFullYear();

  // for (let i = 1973; i <= an; i++) {
  for (let i = 1974; i <= an; i += 2) {
    arry.push(deltatAverageForOneYears(i));
  }

  // jscs:disable maximumLineLength
  /* eslint-disable max-len */

  const deltatIERS =
    `/**
   * Tableau des Delta T différence entre Temps universel et temps terrestre
   * en secondes, observées pour les années paires de 1620 à ${an}.
   * @access private
   * @author F.R. Stephenson & L.V. Morrison & IERS & Gilles Toubiana
   * @since 0.0.15
   * @see {@link https://www.staff.science.uu.nl/~gent0113/deltat/deltat_modern.htm|Valeurs} |
   * {@link http://maia.usno.navy.mil/ser7/deltat.data|IERS} |
   * {@link http://maia.usno.navy.mil/ser7/deltat.preds|Predictions}
   * @constant {Array}
   */
  const delta = [124, 115, 106, 98, 91, 85, 79, 74, 70, 65, 62, 58, 55, 53, 50, 48, 46, 44, 42, 40, 37, 35, 33, 31, 28, 26, 24, 22, 20, 18, 16, 14, 13, 12, 11, 10, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 15, 14, 13.7, 13.1, 12.7, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.3, 12, 11.4, 10.6, 9.6, 8.6, 7.5, 6.6, 6, 5.7, 5.6, 5.7, 5.9, 6.2, 6.5, 6.8, 7.1, 7.3, 7.5, 7.7, 7.8, 7.88, 7.54, 6.4, 5.41, 2.92, 1.61, -1.02, -2.69, -3.64, -4.71, -5.4, -5.2, -5.46, -5.63, -5.8, -5.87, -6.19, -6.44, -6.09, -4.66, -2.72, -0.02, 2.64, 5.37, 7.75, 10.46, 13.36, 16.01, 18.24, 20.25, 21.16, 22.41, 23.49, 23.86, 24.34, 24.02, 23.87, 23.86, 23.73, 23.96, 24.33, 25.3, 26.24, 27.28, 28.25, 29.15, 29.97, 30.72, 31.35, 32.18, 33.15, 34, 35.03, 36.54, 38.29, 40.18, 42.23, ${arry},];
`;

  // fs.writeFile('./src/data/delta.js', deltatIERS,

  fs.writeFile('./src/js/private/constants/delta.js', deltatIERS,
    (err) => {
      if (err) {
        return console.log(err);
      }

      return console.log(
        `Le fichier delta.js pour 1620-${an} a été généré avec succès !`
      );
    });
});

// jscs:enable maximumLineLength
/* eslint-enable max-len */

/* TASK: supprimer le dossier ./src/data */
gulp.task('delta.clean', (done) => {
  const stream = del(['./src/data'], done);

  return stream;
});

/* eslint-enable no-console,strict */
