/*Chat im Responsive*/
var chatQuickFixes = function () {
  $('.chat-sessions').on("click", ".chat-session-header", function(){
    if($( window ).width() < 767) $('.chat-users-body').css('display', 'block');
  });

  // chat is appearing later than document.onLoad.
  // So, we need to get an event listener for
  // future things.
  // see http://api.jquery.com/live/ (which is deprecated)
  // so, better, proper use of on():
  // http://stackoverflow.com/questions/8021436/turning-live-into-on-in-jquery

  $('.main-chat-container').on("click", ".chat-user-holder", function(){
    if($( window ).width() < 767) $('.chat-users-body').css('display', 'none');
  });

  //Check if we are on /companies
  if(window.location.href.indexOf("Companies") > -1) {
    $("body").addClass("noasides")
  }


  //Chat collapse when any tab is clickes
  $('.navbar-fixed-top').on("click", ".navbar__tab",function(){
    var ariaExpanded = $(this).attr('aria-expanded');
    $(".navbar__section").collapse('hide');
    $(".navbar.grand-navbar").collapse('hide');
    $(".main-chat-container").collapse('hide'); //<-- THIS
    $('.navbar__tab').removeClass('navbar__tab--active');

    $(this).addClass('navbar__tab--active');

    if(ariaExpanded === 'true') {
      $('.navbar__tab').removeClass('navbar__tab--active');
      $('.navbar__tab--wall').addClass('navbar__tab--active');
    }

    if ($( window ).width() <= 767) {
      $( "body > .container" ).css( "display", "none" );
    }

    if ($( ".navbar__tab--wall" ).hasClass("navbar__tab--active")) {
      $( "body > .container" ).css( "display", "block" );
    }
  });
};



var replaceElements = function() {
  // $('.navbar-brand, .navbar__section__title').html('<span class="navbar-brand__title">starters.</span><span class="navbar-brand__subtitle">koeln</span>');
};

// This waits for jQuery to be loaded
(function() {
  var checkReady = function(callback) {
    if (window.jQuery) {
      callback(jQuery);
    } else {
      window.setTimeout(function() {
        checkReady(callback);
      }, 20);
    }
  };

  // When jQuery is loaded, wait for document to be ready
  checkReady(function($) {
    $(document).ready(replaceElements);
    $(document).ready(chatQuickFixes);
  });
})();
