var cmJs = cmJs || {};

cmJs.blogFeed = (function() {

  var init = function () {
    fetchFeed();
  },

  fetchFeed = function() {
    var feedUrl = '/blog/?feed=rss2';
    jQuery.getFeed({
      url: feedUrl,
      success: formatFeed 
    });
  },

  formatFeed = function(feed) { 
    var buffer = '';
    var maxItems = 3;
    maxItems = (maxItems > feed.items.length ? feed.items.length : maxItems );
    for(var i = 0; i < maxItems; i++) {
      var item = feed.items[i];
      var dateBreak = item.updated.indexOf(' ',14);
      var itemDate = item.updated.substring(0,dateBreak);
      buffer += '<article><a href="' + item.link + '"><h3>' + itemDate + '</h3><h2>' + item.title + '</h2><p>' + item.description + '</p></a></article>';
    }
    $('.posts').html(buffer);
  }

  return {
    init: function() { $(init); }
  };

}(jQuery));

cmJs.blogFeed.init();