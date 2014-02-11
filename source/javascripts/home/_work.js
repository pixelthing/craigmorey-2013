var cmJs = cmJs || {};

cmJs.work = (function() {

  var init = function () {
    chooseArticles();
  },

  chooseArticles = function(){
    var allArticles = $('.work li').clone();
    var slicedArticles = allArticles.slice(0,15); // only select from the most recent 15
    var shuffledArticles = _.shuffle(slicedArticles); // shuffle
    var sixArticles = _.toArray(shuffledArticles).slice(0,6); // first 6
    $(sixArticles).addClass('on');
    $('.work ul').text('').append(sixArticles);
    setTimeout(function(){
      $("img.lazy").lazyload({
        effect : "fadeIn"
      });
    },1000)

    
  }

  return {
    init: function() { $(init); }
  };
}(jQuery));

cmJs.work.init();