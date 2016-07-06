/**
 * HERE GOES THE JSDOC COMMENTS
 */
const periodeEnJours = ([j1, m1, a1], [j2, m2, a2]) => {
  const date1 = dateValide(j1, m1, a1);
  const date2 = dateValide(j2, m2, a2);
  const debut = (date2 > date1) ? date1 : date2;
  const fin = (date2 > date1) ? date2 : date1;

  return Math.ceil((fin - debut) / (1000 * 60 * 60 * 24)) + 1;
};
