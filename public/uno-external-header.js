!function($) {
  'use strict';

  if (!window.Drupal) {
    window.Drupal = {
      behaviors: {},
      t: function(str) {
        return str;
      },
      settings: {
        uno_minside: {}
      }
    };
  }

  if (window.unoExternalConfig && !window.unoExternalConfig.modules) {
    window.unoExternalConfig.modules = [
      'header'
    ];
  }
  else if (!window.unoExternalConfig) {
    window.unoExternalConfig = {
      modules: [
        'header'
      ],
      search: true
    };
  }

  var host = location.host;
  var urlBase = 'https://utdanning.no';
  if (host.indexOf('dev.') == 0 || host == 'localhost') {
    // Hack so that I don't need utdanning.no locally
    urlBase = 'https://beta.utdanning.no';
    //urlBase = 'https://dev.utdanning.no';
  }
  else if (host.indexOf('alfa.') == 0) {
    urlBase = 'https://alfa.utdanning.no';
  }
  else if (host.indexOf('beta.') == 0) {
    urlBase = 'https://beta.utdanning.no';
  }

  var newStyle = document.createElement('style');
  newStyle.appendChild(document.createTextNode("\
@font-face {\
    font-family: uno-font;\
    src: url('" + urlBase + "/sites/all/themes/utdanning/fonts/uno-font/uno-font.eot?1487160411') format('embedded-opentype'), url('" + urlBase + "/sites/all/themes/utdanning/fonts/uno-font/uno-font.ttf?1487160411') format('truetype'), url('" + urlBase + "/sites/all/themes/utdanning/fonts/uno-font/uno-font.woff?1487160411') format('woff');\
}\
@font-face {\
  font-family: FontAwesome;\
  src: url('" + urlBase +  "/sites/all/themes/utdanning/fonts/font-awesome/fontawesome-webfont.eot');\
  src: url('" + urlBase +  "/sites/all/themes/utdanning/fonts/font-awesome/fontawesome-webfont.eot?#iefix') format('embedded-opentype'), url('" + urlBase +  "/sites/all/themes/utdanning/fonts/font-awesome/fontawesome-webfont.woff') format('woff'), url('" + urlBase +  "/sites/all/themes/utdanning/fonts/font-awesome/fontawesome-webfont.ttf') format('truetype'), url('" + urlBase +  "/sites/all/themes/utdanning/fonts/font-awesome/fontawesome-webfont.svg#fontawesomeregular') format('svg');\
  font-weigth: normal;\
  font-style: normal;\
}\
"));
  document.head.appendChild(newStyle);

  var scripts = [
    // urlBase + '/sites/all/modules/custom/uno_solrwidgets/autocomplete-init.js',
    urlBase + '/sites/all/modules/custom/uno_hackz/jquery.once.js',
    urlBase + '/sites/all/themes/utdanning/bootstrap/js/tab.js',
    urlBase + '/sites/all/modules/contrib/bootstrap_panels_horizontal_tabs/plugins/styles/bootstrap_panels_horizontal_tabs.js',
    urlBase + '/sites/all/modules/custom/uno_minside/js/uno_minside.js'];

  var styles = [
    'dist/minipanels.css',
    urlBase + '/sites/all/modules/custom/uno_solrwidgets/autocomplete.css',
    urlBase + '/sites/all/themes/uno/css/minside.css'
  ];


  $(function() {
    styles.forEach(function(style) {
      var $element = $('<link>');
      $element.attr({
        rel: 'stylesheet',
        href: style
      });
      $('head').append($element);
    });

    if (window.unoExternalConfig.search) {
	    scripts.unshift('//utdanning.no/solrservice/js-min/solr-search-full-min.js?ver=12');
    }

    loadScript(0);
  });

  function loadScript(index) {
    $.getScript(scripts[index], function() {
      index++;
      if (index < scripts.length) {
        loadScript(index);
      }
      else {
        loaded();
      }
    });
  }

  function loaded() {
    if (unoExternalConfig.modules.indexOf('header') != -1) {
      $.get(urlBase + '/minipanels/header', function(html) {

        var urlExtra = '';
        if (host.indexOf('dev.') == 0 || host == 'localhost') {
          urlExtra = 'dev.';
        }
        else if (host.indexOf('alfa.') == 0) {
          urlExtra = 'alfa.';
        }
        else if (host.indexOf('beta.') == 0) {
          urlExtra = 'beta.';
        }

        //var pattern = /a href=\"\/\" rel=\"home\"/;
        html = html.replace(/a href=\"\/\" rel=\"home\"/, "a href=\"//"+ urlExtra +"utdanning.no\" rel=\"home\"");

        // if ($("#page-header").length) {
        //   $("#page-header").after(html);
        // } else if ($("#zone-header-wrapper").length) {
        //   $("#zone-header-wrapper").after(html);
        // } else if ($("#skip-link").length) {
        //   $("#skip-link").after(html);
        // } else {
        //   $('body').prepend(html);
        // }
        $("#section-header").replaceWith(html);
        headerLoaded();
      });
    }

    if (unoExternalConfig.modules.indexOf('footer') != -1) {
      $.get(urlBase + '/minipanels/footer', function(html) {
        $('body').append('<footer><div id="footer"><div class="container">' + html + '</div></div></footer>');
      });
    }
  }

  function headerLoaded() {
    var $header = $('.section-header');

    if (typeof Drupal.behaviors.uno_minside != 'undefined') {
      Drupal.behaviors.uno_minside.attach();
    }

    // $('.tab-pane.minsidemeny').attachSideToggle();
    $('.minsidemeny').hide();
    $('.minsidemeny').remove();

    $header.find('.bootstrap-panels-horizontal-tabs[data-close-all-tabs="true"]').bootstrapSetup();
    $header.find('.bootstrap-panels-horizontal-tabs[data-close-all-tabs="true"]').addBootstrapTimeout();
    $header.find('.bootstrap-panels-horizontal-tabs[data-animate="true"]').bootstrapAnimate();
    $header.find('.language > .dropDown > a').once('languageselector').each(function() {
      $(this).click(function(event) {
        event.preventDefault();
        var $target = $(event.target);
        var $list = $target.parent().next();
        $list.slideToggle('fast');
      });
    });
    $header.find('.nav-pills a').click(function(event) {
      event.preventDefault();
    });


    // Get current domain
    // var l_href = location.href;
    // var l_domain = l_href.match(/:\/\/(www\.)?(.[^/:]+)/)[2]; // override to double check
    var l_domain = urlBase.match(/:\/\/(www\.)?(.[^/:]+)/)[2]; // override to double check
    //l_domain = l_domain.replace('dev.', 'beta.');

    if (window.unoExternalConfig.search) {
      $header.find('#search-block-form, #mobilesearch').each(function() {
        $(this).submit(function(event) {
          event.preventDefault();
          var action = $(this).attr('action');
          var $input = $(event.target).find('[name=q]');
          location.href = action + '#q=' + $input.val();
        });
      });
      jQuery.ajax({
        dataType: "jsonp",
        cache: true,
        jsonpCallback: 'ajaxSolrConfigCallback',
        url: "https://" + l_domain + "/solrservice/" + l_domain + "/config/autocomplete.php?callback=?",
        success: function (uno_config) {
          // Getting ajax-solr manager
          window.Manager = AjaxSolr.auxiliary('manager', uno_config);

          // Connecting search box to ajax-solr autocomplete search
          Manager.addAutocomplete(uno_config);

          Manager.setStore(new AjaxSolr.ParameterStore());
          Manager.init();

        } // End loading config
      });
    }
    else {
      var $search_li = $header.find('li.search.search-widget');
      $search_li.detach();
      var $forms = $header.find('#mini-panel-header_2015 #search-block-form, #mobile-search-pane');
      $forms.detach();
    }
  }

}(jQuery);
