$console.log('Dies ist ein Test');

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
  });
})();


var replaceElements = function() {
  $('.navbar-brand, .navbar__section__title').html('<span class="navbar-brand__title">starters.</span><span class="navbar-brand__subtitle">koeln</span>');

  chat();
};


/*Chat im Responsive*/
function chat() {
  $('.chat-sessions').on("click", ".chat-session-header", function(){
    console.log("he");
    $('.chat-users-body').css('display', 'block');
  });

  $('.chat-user-holder').click(function(){
    $('.chat-users-body').css('display', 'none');
  });
}
