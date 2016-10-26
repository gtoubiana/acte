$(document).ready(() => {
  // Bootstrap init
  $(() => {
    $('[data-toggle="popover"]').popover();
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
});
