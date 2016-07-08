$( document ).ready(function(){
  navbar();
  $( window ).resize(function() {
    navbar();
  });
  $('.navbar__tab').click(function(){
    $(".navbar__section").collapse('hide');
    $(".navbar.grand-navbar").collapse('hide');

  });
});

function navbar() {
  if( $(window).width() > 767 ) {
    var docked = false;
    var menu = $('#navbar-collapse-1');
    var init = menu.offset().top;

    $(window).scroll(function()
      {
        if (!docked && (menu.offset().top - $("body").scrollTop() < 50))
        {
            menu.css({
                position : "fixed",
                top: 50,
            });
            docked = true;
        }
        else if(docked && ($("body").scrollTop()+50) <= init)
        {
            menu.css({
                position : "absolute",
                top: init + 'px',
            });

            docked = false;
          }
      });
  }
}
