$(document).ready(() => {
  $('#jour').keyup(() => {
    const jr = new acte.Jour($('#jour').val());

    if (jr.variables.gregorien.od) {
      $('#validation_de_jour').addClass('has-success');
    } else {
      $('#validation_de_jour').removeClass('has-success');
    }

    $('#gregorien').html(jr.gregorien('%JSl %JMp %Mlb %A',
      'Pas de correspondances'));
    $('#detail-gregorien').html(jr.gregorien(
      '<br>%JSo jour de la semaine<br>%JMo jour du mois' +
      '<br>%JAo jour de l\'année<br>%SMof semaine du mois (*)' +
      '<br>%SAof semaine de l\'année (*)<br>%MAo mois de l\'année<br>',
      '<br>'));
    $('#republicain').html(jr.republicain('%JSl %JMp %Mlb an %Ar',
      'Pas de correspondances'));
    $('#detail-republicain').html(jr.republicain(
      '<br>%JSo jour de la décade<br>%JMo jour du mois' +
      '<br>%JAo jour de l\'année<br>%SMof décade du mois (*)' +
      '<br>%SAof décade de l\'année (*)<br>%MAo mois de l\'année<br>',
      '<br>'));
    $('#julien').html(jr.julien('%JSl %JMp %Mlb %A', 'Pas de correspondances'));
    $('#detail-julien').html(jr.julien(
      '<br>%JSo jour de la semaine<br>%JMo jour du mois' +
      '<br>%JAo jour de l\'année<br>%SMof semaine du mois (*)' +
      '<br>%SAof semaine de l\'année (*)<br>%MAo mois de l\'année<br>',
      '<br>'));
  });
});
