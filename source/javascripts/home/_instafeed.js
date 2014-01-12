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
      template: '<figure data-type="{{model.type}}" data-likes="{{likes}}" data-image="{{id}}" data-video="{{model.videos.standard_resolution.url}}" data-hires="{{model.images.standard_resolution.url}}" data-created="{{model.created_time}}"><a href="{{link}}"><img src="{{image}}" /><figcaption>{{caption}} <span class="figure-location">{{location}}</figcaption></a></figure>',
      error: function(){
        alert('oops, instagram isn\'t playing nice today.');
      },
      after: pictureInit
    });
    feed.run();
  },

  pictureInit = function() {
    var pics = $('#instafeed figure');
    $.each(pics,function(index,el){
      var elJQ = $(el)
      var type = elJQ.data('type');
      var timestamp = elJQ.data('created');
      var date = new Date(timestamp * 1000);
      var dateReal = date.toUTCString();
      var dateBreak = dateReal.indexOf(' ',14);
      dateReal = dateReal.substring(0,dateBreak);
      if (type=='video') {
        elJQ.addClass('instagram-video');
      }
      elJQ.find('a').append('<div class="figure-date">' + dateReal + '</div>');
    })
  }

  return {
    init: function() { $(init); }
  };
}(jQuery));

cmJs.instafeed.init();