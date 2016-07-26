/*Chat im Responsive*/
var chatQuickFixes = function () {
  console.log("chatQuickFixes is called!");
  $('.chat-sessions').on("click", ".chat-session-header", function(){
    $('.chat-users-body').css('display', 'block');
  });

  // chat is appearing later than document.onLoad.
  // So, we need to get an event listener for
  // future things.
  // see http://api.jquery.com/live/ (which is deprecated)
  // so, better, proper use of on():
  // http://stackoverflow.com/questions/8021436/turning-live-into-on-in-jquery

  $('.main-chat-container').on("click", ".chat-user-holder", function(){
    $('.chat-users-body').css('display', 'none');
  });
}



var replaceElements = function() {
  $('.navbar-brand, .navbar__section__title').html('<span class="navbar-brand__title">starters.</span><span class="navbar-brand__subtitle">koeln</span>');
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
