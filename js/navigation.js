var FriendRequestsModule = require('../react/FriendRequests/FriendRequestsModule');
//var React = require('react-lite');
//var ReactDOM = require('react-dom');
var $ = require('jquery');

var data = {
   "success":true,
   "data":[
      {
         "Id":"00000000-0000-0000-0000-000000000000",
         "ShownName": "Uwe Müller",
         "ProfilePicture": "gfx/profilbilder/p1.jpg",
         "UserId":"1065b80c-06ff-46bb-af2c-809f5c885ac0",
         "FriendUserId":"496e3f91-edde-4929-8a83-a5b800cb9397",
         "DateCreated":"12. Okt",
         "DateAccepted":"123",
         "IsSeen":true,
         "IsAccepted":false
      },
      {
         "Id":"3ceb27d0-e996-4131-997d-a673010587f9",
         "ShownName": "Uwe Müller",
         "ProfilePicture": "gfx/profilbilder/p1.jpg",
         "UserId":"cc901955-2cf4-4f67-bd23-e46c85bbc986",
         "FriendUserId":"496e3f91-edde-4929-8a83-a5b800cb9397",
         "DateCreated":"1. Jan",
         "DateAccepted":null,
         "IsSeen":false,
         "IsAccepted":false
      },
      {
         "Id":"1ab24ddc-b1a5-4653-b325-a54500bcc15e",
         "ShownName": "Uwe Müller",
         "ProfilePicture": "gfx/profilbilder/p1.jpg",
         "UserId":"ad505676-71b0-46d2-84ec-a464013c5344",
         "FriendUserId":"496e3f91-edde-4929-8a83-a5b800cb9397",
         "DateCreated":"gestern",
         "DateAccepted":null,
         "IsSeen":true,
         "IsAccepted":false
      }
   ]
};


$( document ).ready(function(){
  navbar();
  initReactComponents();
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

    if ($( window ).width() <= 767) {
      $( "body > .container" ).css( "display", "none" );
    }

    if ($( ".navbar__tab--wall" ).hasClass("navbar__tab--active")) {
      $( "body > .container" ).css( "display", "block" );
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

function initReactComponents() {
  ReactDOM.render(
    <FriendRequestsModule data={data} />,
    document.getElementById('FriendRequestsModuleRoot')
  );
}
