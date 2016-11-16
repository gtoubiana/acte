$(document).ready(() => {
  // Bootstrap init
  $(() => {
    $('[data-toggle="popover"]').popover();
  });

  // Parallax effect
  $(window).scroll(() => {
    $('.jumbotron').css('background-position', `0px ${(0 -
      (Math.max(document.documentElement.scrollTop, document.body.scrollTop) /
      4))}px`);
  });

  // Acte - Convertir une date
  $('#jour_debrider').bind('keyup change mousemove', () => {
    const deb = $('#debrider').prop('checked');
    const jr = new acte.Jour($('#jour').val(), !deb);

    $('#affichage_de_jour table tbody').html(`<tr>
<th scope="row">Date grégorienne</th>
${jr.gregorien('<td class="success"><strong>%JSl %JMp %Mlb %A</strong></td>',
'<td class="active">Pas de correspondances</td>')}</tr>
<tr><th scope="row">Date républicain</th>
${jr.republicain(
'<td class="success"><strong>%JSl %JMp %Mlb an %Ar</strong></td>',
'<td class="active">Pas de correspondances</td>')}</tr>
<tr><th scope="row">Date julienne</th>
${jr.julien('<td class="success"><strong>%JSl %JMp %Mlb %A</strong></td>',
'<td class="active">Pas de correspondances</td>')}</tr>`);
  });

  // Jquery-ui Autocomplete
  const availableTags = [
    'août',
    'avril',
    'brumaire',
    'décembre',
    'février',
    'floréal',
    'frimaire',
    'fructidor',
    'germinal',
    'janvier',
    'juillet',
    'juin',
    'mai',
    'mars',
    'messidor',
    'nivôse',
    'novembre',
    'octobre',
    'pluviôse',
    'prairial',
    'septembre',
    'thermidor',
    'vendémiaire',
    'ventôse',
  ];

  const split = (val) => {
    const result = val.split(/ \s*/);

    return result;
  };

  /* eslint-disable no-invalid-this,func-names */
  /* eslint-disable object-shorthand, prefer-arrow-callback */
  $('#jour')
  .on('keydown', function (event) {
    $('#jour').autocomplete((event.keyCode === 32) ? 'disable' : 'enable');
    if (event.keyCode === $.ui.keyCode.TAB &&
    $(this).autocomplete('instance').menu.active) {
      event.preventDefault();
    }
  })
  .autocomplete({
    minLength: 1,
    source: function (request, response) {
      const allterms = request.term.split(/[\s]+/);
      const lastone = allterms[allterms.length - 1];
      const matcher = new RegExp(`^${$.ui.autocomplete.escapeRegex(lastone)}`,
      'i');

      response($.grep(availableTags, function (item) {
        return matcher.test(item);
      }));
    },

    focus: function () {
      return false;
    },

    select: function (event, ui) {
      const terms = split(this.value);

      terms.pop();
      terms.push(ui.item.value);
      terms.push('');
      this.value = terms.join(' ');

      /* eslint-enable no-invalid-this,func-names */
      /* eslint-enable object-shorthand, prefer-arrow-callback */
      return false;
    },
  });
});
