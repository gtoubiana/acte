$(document).ready(function () {
  // Parallax effect
  $(window).scroll(function () {
    $('.jumbotron').css('background-position', '0px ' + (0 - Math.max(
      document.documentElement.scrollTop, document.body.scrollTop
    ) / 4) + 'px');
  });

  // Acte - Convertir une date
  var convertirJour = function () {
    function convertirJour() {
      var deb = $('#debrider').prop('checked');
      var jr = new acte.Jour($('#jour').val(), !deb);

      $('#affichage_de_jour table tbody').html(
        '<tr>\n<th scope="row">Date gr\xE9gorienne</th>\n' + jr.gregorien(
          '<td class="success"><strong>%JSl %JMp %Mlb %A</strong></td>',
          '<td class="active">Pas de correspondances</td>') +
        '</tr>\n<tr><th scope="row">Date r\xE9publicain</th>\n' + jr.republicain(
          '<td class="success"><strong>%JSl %JMp %Mlb an %Ar</strong></td>',
          '<td class="active">Pas de correspondances</td>') +
        '</tr>\n<tr><th scope="row">Date julienne</th>\n' + jr.julien(
          '<td class="success"><strong>%JSl %JMp %Mlb %A</strong></td>',
          '<td class="active">Pas de correspondances</td>') + '</tr>');
    }

    return convertirJour;
  }();

  // Arrêter les animations CSS3 sur un élément
  var stopAnimation = function () {
    function stopAnimation(element) {
      $(element).css('-webkit-animation', 'none');
      $(element).css('-moz-animation', 'none');
      $(element).css('-o-animation', 'none');
      $(element).css('animation', 'none');
    }

    return stopAnimation;
  }();

  $('#jour_debrider').bind('keyup change mousemove', function () {
    convertirJour();
    stopAnimation('#jour');
  });

  // Jquery-ui Autocomplete
  var availableTags = ['août', 'avril', 'brumaire', 'décembre', 'février',
    'floréal', 'frimaire', 'fructidor', 'germinal', 'janvier', 'juillet',
    'juin', 'mai', 'mars', 'messidor', 'nivôse', 'novembre', 'octobre',
    'pluviôse', 'prairial', 'septembre', 'thermidor', 'vendémiaire',
    'ventôse'
  ];

  var split = function () {
    function split(val) {
      var result = val.split(/ \s*/);

      return result;
    }

    return split;
  }();

  /* eslint-disable no-invalid-this,func-names */
  /* eslint-disable object-shorthand, prefer-arrow-callback */
  $('#jour').on('keydown', function (event) {
    $('#jour').autocomplete(event.keyCode === 32 ? 'disable' : 'enable');
    if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete(
        'instance').menu.active) {
      event.preventDefault();
    }
  }).autocomplete({
    minLength: 1,
    source: function () {
      function source(request, response) {
        var allterms = request.term.split(/[\s]+/);
        var lastone = allterms[allterms.length - 1];
        var matcher = new RegExp('^' + $.ui.autocomplete.escapeRegex(
          lastone), 'i');

        response($.grep(availableTags, function (item) {
          return matcher.test(item);
        }));
      }

      return source;
    }(),

    focus: function () {
      function focus() {
        return false;
      }

      return focus;
    }(),

    select: function () {
      function select(event, ui) {
        var terms = split(this.value);

        terms.pop();
        terms.push(ui.item.value);
        terms.push('');
        this.value = terms.join(' ');

        /* eslint-enable no-invalid-this,func-names */
        /* eslint-enable object-shorthand, prefer-arrow-callback */
        return false;
      }

      return select;
    }()
  });

  /* Afficher/Masque les aides */
  $('.description').hide();

  /* eslint-disable no-invalid-this, func-names */
  $('.exemples, .explications').on('click', function () {
    $(this).toggleClass('fermer');
    if ($(this).hasClass('fermer')) {
      $(this).text('Masquer ' + $(this).attr('data-link-text'));
      $(this).closest('.parent').find('.description').show();
    } else {
      $(this).text($(this).attr('data-link-text'));
      $(this).closest('.parent').find('.description').hide();
    }
  });

  $('.btn-exemple').on('click', function () {
    $('#jour').val($(this).text());
    convertirJour();
    stopAnimation('#jour');
  });

  /* eslint-enable no-invalid-this, func-names */
});
