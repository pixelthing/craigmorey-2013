//= require vendor/jquery.lazyload.min.js
//= require vendor/jquery.fancybox.pack.js
//= require vendor/jquery.fancybox-media.js
//= require work/_work-nav.js

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