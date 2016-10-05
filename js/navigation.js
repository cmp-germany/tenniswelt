var FriendRequestsModule = require('../react/FriendRequests/FriendRequestsModule');
//var React = require('react-lite');
//var ReactDOM = require('react-dom');
var $ = require('jquery');
var data = require('../data/notifications.json');
var webserviceBase = (require('../data/webserviceBase.json')).webserviceBase;

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
    //496E3F91-EDDE-4929-8A83-A5B800CB9397
    <FriendRequestsModule data={data} userId="496E3F91-EDDE-4929-8A83-A5B800CB9397" serviceBasePath={webserviceBase+'/api/Friend'} pageSize="5" />,
    document.getElementById('FriendRequestsModuleRoot')
  );
}
