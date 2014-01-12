var cmJs = cmJs || {};

cmJs.workNav = (function() {

  var slotNav = $('.cm-work-nav'),
  slotLinks = slotNav.find('a'),

  init = function () {
    initNav();
    initPrevNext();
    loadImages();
    mainNavHover();
    postClick();
  },

  /* on page load, move the portfolio nav to the right place, then set the transition up */
  initNav = function() {
    setTimeout(function(){
      $('.cm-work-header').addClass('ready');
    },500)
    var page = window.location.pathname;
    var pageFrags = page.split('/');
    var pagePath = pageFrags[(pageFrags.length - 2)];
    var foundNode = $('a[href="../' + pagePath + '/"]');
    var newSlot = foundNode.attr('class').replace('slot-','open-');
    moveMenu(newSlot);
    setTimeout(function(){
      slotNav.addClass('ready');
    },0)
  },

  initPrevNext = function() {
    $('.cm-work-nav-prev,.cm-work-nav-next').click(function(){
      var slotsVisible = ($(window).width()/150);
      var slotsToMove = Math.round((slotsVisible - 1)/2);
      var currentPos = parseInt(slotNav.data('slot').replace('open-',''));
      var newSlotPos = 'open-' + currentPos;
      if ($(this).hasClass('cm-work-nav-prev')) {
        newSlotPos = currentPos - slotsToMove;
        if (newSlotPos < 1) {
          newSlotPos = 1;
        }
      } else {
        newSlotPos = currentPos + slotsToMove;
        if (newSlotPos > slotLinks.length) {
          newSlotPos = slotLinks.length;
        }
      }
      moveMenu('open-' + newSlotPos);
      $("img.lazy").trigger('workNavMove');
    })
  },

  checkPrevNext = function() {
    var firstSlotLeft = slotLinks.first().offset().left;
    var lastSlotRight = slotLinks.last().offset().left + slotLinks.last().width();
    if (firstSlotLeft < 0) {
      $('.cm-work-nav-prev').addClass('ready');
    } else {
      $('.cm-work-nav-prev').removeClass('ready');
    }
    console.log(slotLinks.last());
    console.log(lastSlotRight);
    console.log($(window).width());
    if (lastSlotRight > $(window).width()) {
      $('.cm-work-nav-next').addClass('ready');
    } else {
      $('.cm-work-nav-next').removeClass('ready');
    }
  },

  moveMenu = function(slotClass) {
    slotNav.removeClass(function (index, css) {
      return (css.match (/\bopen-\S+/g) || []).join(' ');
    }).addClass(slotClass).data('slot',slotClass);
    setTimeout(function(){
      checkPrevNext();
    },301)
  },

  mainNavHover = function() {
    $('.cm-nav-in-work').hover(function(){
      $('.cm-work-header').addClass('open');
    },function(){
      $('.cm-work-header').removeClass('open');
    })
  },

  loadImages = function() {
    $("img.lazy").lazyload({
      event : "workNavMove",
      effect : "fadeIn"
    });
  },

  postClick = function() {
    slotLinks.click(function(ev){
      // stop the menu from rolling back if your mouse rolls off it
      $('.cm-work-header').removeClass('ready');
      ev.preventDefault();
      var href = this.href;
      var newSlot = $(this).attr('class').replace('slot-','open-');
      moveMenu(newSlot);
      setTimeout(function(){
        self.location = href;
      },300);
    })
  }
  
  $(init);

  return {
    init: function() { $(init); }
  };
}(jQuery));