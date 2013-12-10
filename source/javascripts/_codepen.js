var cmJs = cmJs || {};

cmJs.codepen = (function() {

  var init = function () {
    fetchJson();
  },

  fetchJson = function() {

    $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp',
        url: 'http://codepen-awesomepi.timpietrusky.com/pixelthing/?callback=jsonp'
      })
      .success(function(data){
        console.log( data )
      })

  }

  return {
    init: function() { $(init); }
  };
}(jQuery));

cmJs.codepen.init();