$(document).ready(() => {
  $('#jour').keyup(() => {
    const jr = new acte.Jour($('#jour').val());

    if (jr.variables.gregorien.od) {
      $('#validation_de_jour').addClass('has-success');
    } else {
      $('#validation_de_jour').removeClass('has-success');
    }

    $('.gregorien').html(`<h4>Grégorien</h4>
<p><strong><span id=\"gregorien\">
${jr.gregorien('%JSl %JMp %Mlb %A', 'Pas de correspondances')}
</span> <span class=\"glyphicon glyphicon glyphicon-triangle-bottom fleche\"
aria-hidden=\"true\"></span></strong><span id=\"detail-gregorien\">
${jr.gregorien(
  '<br>%JSo jour de la semaine<br>%JMo jour du mois' +
  '<br>%JAo jour de l\'année<br>%SMof semaine du mois (*)' +
  '<br>%SAof semaine de l\'année (*)<br>%MAo mois de l\'année<br>',
  '<br>')}<br></span></p>`);
    $('.republicain').html(`<h4>Républicain</h4>
<p><strong><span id=\"republicain\">
${jr.republicain('%JSl %JMp %Mlb an %Ar', 'Pas de correspondances')}
</span> <span class=\"glyphicon glyphicon glyphicon-triangle-right fleche\"
aria-hidden=\"true\"></span></strong><span id=\"detail-republicain\">
${jr.republicain(
  '<br>%JSo jour de la décade<br>%JMo jour du mois' +
  '<br>%JAo jour de l\'année<br>%SMof décade du mois (*)' +
  '<br>%SAof décade de l\'année (*)<br>%MAo mois de l\'année<br>',
  '<br>')}<br></span></p>`);
    $('.julien').html(`<h4>Julien</h4>
<p><strong><span id=\"julien\">
${jr.julien('%JSl %JMp %Mlb %A', 'Pas de correspondances')}
</span> <span class=\"glyphicon glyphicon glyphicon-triangle-top fleche\"
aria-hidden=\"true\"></span></strong><span id=\"detail-julien\">
${jr.julien(
  '<br>%JSo jour de la semaine<br>%JMo jour du mois' +
  '<br>%JAo jour de l\'année<br>%SMof semaine du mois (*)' +
  '<br>%SAof semaine de l\'année (*)<br>%MAo mois de l\'année<br>',
  '<br>')}<br></span></p>`);
  });
});
