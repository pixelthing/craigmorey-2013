var cmJs = cmJs || {};

cmJs.workNav = (function() {

  var touchNavOpen = false,

  init = function(){
    if (Modernizr.touch === true) {
      // click the nav button once to open, twice to close
      $('.cm-nav-button').click(function(ev) {
        ev.preventDefault();
        if (touchNavOpen === false) {
          $('.cm-nav').addClass('open');
          touchNavOpen = true;
          if (cmJs.workNav != undefined) {
            $('.cm-work-nav').addClass('open');
            cmJs.workNav.touchNavOpen = true;
          }
        } else {
          $('.cm-nav').removeClass('open');
          touchNavOpen = false;
          if (cmJs.workNav != undefined) {
            $('.cm-work-nav').removeClass('open');
            cmJs.workNav.touchNavOpen = false;
          }
        }
      })
    }
  }

  $(init);

  return {
    init: function() { $(init); }
  };
}(jQuery));