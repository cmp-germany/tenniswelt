$( document ).ready(function(){
  navbar();
  $( window ).resize(function() {
    navbar();
  });

  $('.navbar__tab').click(function(){
    var ariaExpanded = $(this).attr('aria-expanded');
    $(".navbar__section").collapse('hide');
    $(".navbar.grand-navbar").collapse('hide');
    $('.navbar__tab').removeClass('navbar__tab--active');

    $(this).addClass('navbar__tab--active');

    if(ariaExpanded === 'true') {
      $('.navbar__tab').removeClass('navbar__tab--active');
      $('.navbar__tab--wall').addClass('navbar__tab--active');
    }
  });


  $('.navbar__matching-button').click(function(){
    $('.navbar__matching-button').removeClass('navbar__matching-button--active');
    $(this).addClass('navbar__matching-button--active');
  });

  $('#navbar__matching-button--matching').click(function(){
    $('#navbar-filter--matching').css( "display", "block" );
    $('#navbar-filter--gruppen-matching').css( "display", "none" );
    $('#navbar-resultate--matching').css( "display", "block" );
    $('#navbar-resultate--gruppen-matching').css( "display", "none" );
  });

  $('#navbar__matching-button--gruppenmatching').click(function(){
    $('#navbar-filter--gruppen-matching').css( "display", "block" );
    $('#navbar-filter--matching').css( "display", "none" );
    $('#navbar-resultate--gruppen-matching').css( "display", "block" );
    $('#navbar-resultate--matching').css( "display", "none" );
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

function tab() {

}
