var cmJs = cmJs || {};

cmJs.codepen = (function() {

  var init = function () {
    fetchJson();
  },

  fetchJson = function() {

    var buffer = '';
    var maxItems = 4;

    $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp',
        url: 'http://codepen-awesomepi.timpietrusky.com/pixelthing/?callback=jsonp'
      })
      .error(function(data){
        buffer = '<div class="error">Sorry - codepen could not be reached.</div>';
        $('.pens').html(buffer);
      }).success(function(data){
        // invalid response
        if (!data.content) {
          buffer = '<div class="error">Sorry - codepen could not be reached.</div>'
        } else {
          var pensArray = data.content.pens;
          maxItems = (maxItems > pensArray.length ? pensArray.length : maxItems );
          for(var i = 0; i < maxItems; i++) {
            var item = pensArray[i];
            buffer += '<article>';
            buffer += '<a href="' + item.url.pen + '" target="_blank"><h3>' + item.title + '</h3><dl>';
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
        }
        $('.pens').html(buffer);
      })

  }

  return {
    init: function() { $(init); }
  };
}(jQuery));

cmJs.codepen.init();