var cmJs = cmJs || {};

cmJs.instafeed = (function() {

  var init = function () {
    fetchInstagram();
  },

  fetchInstagram = function() {

    var feed = new Instafeed({
      get: 'user',
      userId: 62527,
      resolution: 'low_resolution',
      limit: 9,
      accessToken: '62527.467ede5.73ac26e776c149ff9f931d0534159963',
      template: '<figure><a href="{{link}}"><img src="{{image}}" /><figcaption>{{caption}} {{location}}</figcaption></a></figure>'
    });
    feed.run();

  }

  return {
    init: function() { $(init); }
  };
}(jQuery));

cmJs.instafeed.init();