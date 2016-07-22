/**
 * Nombre de jours juliens correspondants à l'an 1 républicain.
 * @access private
 * @author John Walker
 * @since 0.0.1
 * @see {@link fourmilab.ch/documents/calendar/|FRENCH_REVOLUTIONARY_EPOCH}
 * @constant {Number}
 * @example
 * jjVersGregorien(2375839.5); // [1792, 9, 22]
 * jjVersGregorien(jjDebutRepublicain); // [1792, 9, 22]
 * jjVersRepublicain(2375839.5); // [1, 1, 1, 1]
 * jjVersRepublicain(jjDebutRepublicain); // [1, 1, 1, 1]
 */
const jjDebutRepublicain = 2375839.5;
