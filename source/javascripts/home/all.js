//= require vendor/jquery.fancybox.pack.js
//= require vendor/jquery.fancybox-media.js
//= require vendor/instafeed.js
//= require vendor/jquery.jfeed.js
//= require vendor/fastclick.js
//= require _nav.js
//= require home/_instafeed.js
//= require home/_blog.js
//= require home/_codepen.js

var cmJs = cmJs || {};

cmJs.home = (function() {
  
  var init = function() {
    setupFastClick();
    setupFancybox();
  },

  setupFancybox = function() {
    $(".fancybox").fancybox({
      afterLoad: function() {
        var figure = $(this.element[0].parentNode);
        var realDate = figure.find('.figure-date').text();
        var location = figure.attr('data-location');
        location = (location.length > 0 ? ' <span class="icon-location cm-icon"></span> ' + location : '');
        var likes = figure.attr('data-likes');
        likes = (parseInt(likes) > 0 ? ' <span class="icon-heart cm-icon"></span> ' + likes : '');
        var comments = figure.attr('data-comments');
        comments = (parseInt(likes) > 0 ? ' <span class="icon-bubble cm-icon"></span> ' + comments : '');
        var link = figure.attr('data-link');
        this.title = '<b>' + realDate + '</b> ' + this.title + '<br />' + location + likes + comments + ' <a href="' + link + '" target="_blank"><span class="icon-link cm-icon"></span> View on instagram</a>';
      },
      helpers : {
        title : {
          type : 'inside'
        }
      }
    });
  },

  setupFastClick = function() {
    $(function() {
      FastClick.attach(document.body);
    });
  }

  $(init);

  return {
    init: function() { $(init); }
  };
}(jQuery));