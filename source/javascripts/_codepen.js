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
        var pensArray = data.content.pens;
        var buffer = '';
        var maxItems = 4;
        maxItems = (maxItems > pensArray.length ? pensArray.length : maxItems );
        for(var i = 0; i < maxItems; i++) {
          var item = pensArray[i];
          buffer += '<article>';
          buffer += '<a href="' + item.url.pen + '" target="_blank"><h2>' + item.title + '</h2><p>' + item.description + '</p><dl>';
          if (parseInt(item.views) > 0) {
            buffer += '<dt class="pen-views">Views: </dt><dd>' + item.views + '</dd>'
          }
          if (parseInt(item.hearts) > 0) {
            buffer += '<dt class="pen-loves">Hearts: </dt><dd>' + item.hearts + '</dd>'
          }
          if (parseInt(item.comments) > 0) {
            buffer += '<dt class="pen-comments">Comments:: </dt><dd>' + item.comments + '</dd>'
          }
          buffer += '</dl></a></article>';
        }
        $('.pens').html(buffer);
      })

  }

  return {
    init: function() { $(init); }
  };
}(jQuery));

cmJs.codepen.init();