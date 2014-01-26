//= require vendor/keymaster.min.js
//= require vendor/jquery.lazyload.min.js
//= require vendor/jquery.fancybox.pack.js
//= require vendor/jquery.fancybox-media.js
//= require work/_work-nav.js

var cmJs = cmJs || {};

cmJs.work = (function() {
  
  var init = function() {
    setupFancybox();
  },

  setupFancybox = function() {
    $(".fancybox").fancybox({
      helpers : {
        title : {
          type : 'inside'
        }
      }
    });
    $('.fancybox-media').fancybox({
      openEffect  : 'none',
      closeEffect : 'none',
      helpers : {
        media : {},
        title : {
          type : 'inside'
        }
      }
    });
  }

  $(init);

  return {
    init: function() { $(init); }
  };
}(jQuery));