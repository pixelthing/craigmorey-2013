var cmJs = cmJs || {};

cmJs.workNav = (function() {

  var slotNav = $('.cm-work-nav-shuttle'),
  slotLinks = slotNav.find('a'),
  touchNavOpen = false,
  currentSlot = false,

  init = function () {
    setupNav();
    setupPrevNext();
    loadImages();
    mainNavHover();
    if (Modernizr.touch === true) {
      setupTabletNav();
    } else {
      setupNavKey();
      setUpNavClick();
    }
  },

  /* on page load, move the portfolio nav to the right place, then set the transition up */
  setupNav = function() {
    if ($('.cm-work-nav').length < 1) {
      return;
    }
    setTimeout(function(){
      $('.cm-work-nav').addClass('ready');
    },500)
    var page = window.location.pathname;
    var pageFrags = page.split('/');
    var pagePath = pageFrags[(pageFrags.length - 2)];
    var foundNode = $('#' + pagePath);
    currentSlot = parseInt(foundNode.attr('class').replace('slot-',''));
    currentSlotClass = 'open-' + currentSlot;
    moveMenu(currentSlotClass);
    setTimeout(function(){
      slotNav.addClass('ready');
    },0)
  },

  setupNavKey = function() {
    var prevUrl = false;
    if (currentSlot > 1) {
      prevUrl = slotLinks[(currentSlot - 2)].href;
    }
    var nextUrl = false;
    if (currentSlot < (slotLinks.length)) {
      nextUrl = slotLinks[(currentSlot)].href;
    }
    key('left', function(){
      if (prevUrl) {
        $('.cm-work-nav').addClass('open');
        self.location = prevUrl;
      } else {
        flashWorkNav();
      }
    });
    key('right', function(){
      if (nextUrl) {
        $('.cm-work-nav').addClass('open');
        self.location = nextUrl;
      } else {
        flashWorkNav();
      }
    });
  },

  flashWorkNav = function() {
    var workNavJQ = $('.cm-work-nav');
    workNavJQ.addClass('open flash');
    setTimeout(function(){
      workNavJQ.removeClass('flash');
    },200);
  },

  setupTabletNav = function() {
    $('.cm-work-nav a').click(function(ev){
      if (cmJs.workNav.touchNavOpen === false) {
        ev.preventDefault();
        $('.cm-work-nav').addClass('open');
        cmJs.workNav.touchNavOpen = true;
      } else {
        $('.cm-work-featured').addClass('hidden');
      }
    })
  },

  setupPrevNext = function() {
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
      $("img.lazy").trigger('appear');
    })
  },

  checkPrevNext = function() {
    var firstSlotLeft = slotLinks.first().offset().left;
    var lastSlotRight = slotLinks.last().offset().left + 150;
    if (firstSlotLeft < 0) {
      $('.cm-work-nav-prev').addClass('ready');
    } else {
      $('.cm-work-nav-prev').removeClass('ready');
    }
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
      $('.cm-work-nav').addClass('open');
    },function(){
      $('.cm-work-nav').removeClass('open');
    })
  },

  loadImages = function() {
    $("img.lazy").lazyload();
  },

  setUpNavClick = function() {
    slotLinks.click(function(ev){
      // stop the menu from rolling back if your mouse rolls off it
      $('.cm-work-nav').addClass('open');
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
    init: function() { $(init); },
    touchNavOpen: touchNavOpen
  };
}(jQuery));