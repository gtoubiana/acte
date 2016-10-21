$(document).ready(() => {
  $('#jour_debrider').bind('keyup change', () => {
    const deb = $('#debrider').prop('checked');
    const jr = new acte.Jour($('#jour').val(), !deb);

    if (jr.variables.gregorien.od) {
      $('#validation_de_jour').addClass('has-success');
    } else {
      $('#validation_de_jour').removeClass('has-success');
    }

    $('.gregorien').html(`<h4>Grégorien</h4>
<strong><span id=\"gregorien\">
${jr.gregorien('%JSl %JMp %Mlb %A' +
'</span> <span class="glyphicon glyphicon-triangle-right fleche" ' +
'aria-hidden="true">', 'Pas de correspondances')}
</span></strong><div id=\"detail-gregorien\"
class=\"detail\">
${jr.gregorien(
  '%JSo jour de la semaine<br>%JMo jour du mois' +
  '<br>%JAo jour de l\'année<br>%SMof semaine du mois' +
  '<br>%SAof semaine de l\'année<br>%MAo mois de l\'année<br>',
  '<br>')}<br></div>`);

    $('.republicain').html(`<h4>Républicain</h4>
<strong><span id=\"republicain\">
${jr.republicain('%JSl %JMp %Mlb an %Ar' +
'</span> <span class="glyphicon glyphicon-triangle-right fleche" ' +
'aria-hidden="true">', 'Pas de correspondances')}
</span></strong><div id=\"detail-republicain\"
class=\"detail\">
${jr.republicain(
  '%JSo jour de la décade<br>%JMo jour du mois' +
  '<br>%JAo jour de l\'année<br>%SMof décade du mois' +
  '<br>%SAof décade de l\'année<br>%MAo mois de l\'année<br>',
  '<br>')}<br></div>`);

    $('.julien').html(`<h4>Julien</h4>
<strong><span id=\"julien\">
${jr.julien('%JSl %JMp %Mlb %A' +
'</span> <span class="glyphicon glyphicon-triangle-right fleche" ' +
'aria-hidden="true">', 'Pas de correspondances')}
</span></strong><div id=\"detail-julien\" class=\"detail\">
${jr.julien(
  '%JSo jour de la semaine<br>%JMo jour du mois' +
  '<br>%JAo jour de l\'année<br>%SMof semaine du mois' +
  '<br>%SAof semaine de l\'année<br>%MAo mois de l\'année<br>',
  '<br>')}<br></div>`);
  });

  $('#affichage_de_jour').on('click', '.gregorien', function () {
    /* eslint-disable no-invalid-this */
    $(this).find('.detail').toggle('fast');
    $(this).find('.glyphicon').toggleClass('glyphicon-triangle-bottom');

    /* eslint-enable no-invalid-this */
  });

  $('#affichage_de_jour').on('click', '.republicain', function () {
    /* eslint-disable no-invalid-this */
    $(this).find('.detail').toggle('fast');
    $(this).find('.glyphicon').toggleClass('glyphicon-triangle-bottom');

    /* eslint-enable no-invalid-this */
  });

  $('#affichage_de_jour').on('click', '.julien', function () {
    /* eslint-disable no-invalid-this */
    $(this).find('.detail').toggle('fast');
    $(this).find('.glyphicon').toggleClass('glyphicon-triangle-bottom');

    /* eslint-enable no-invalid-this */
  });
});
