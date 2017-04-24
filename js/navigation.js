const FriendRequestsModule    = require('../react/FriendRequests/FriendRequestsModule');
const ChatNotificationsModule = require('../react/ChatNotifications/ChatNotificationsModule');
const React                   = require('react');
const ReactDOM                = require('react-dom');
const $                       = require('jquery');
const NotificationModule      = require('../react/Notification/NotificationModule');
const NavbarMenuModule        = require('../react/Navbar/NavbarMenuModule').default;
const navbarMenuData          = require('../data/navbarMenu.json');

$( document ).ready(function(){
  initReactComponents();
});

function initReactComponents() {

  ////////////////////////////// FRIEND REQUESTS //////////////////////////////
  window.reactFriendRequestsApp = ReactDOM.render(
    <FriendRequestsModule
      userId={window.currentUserId}
      currentLanguage={window.currentLanguage}
      webserviceBase={window.serverpaths.webserviceBase}
      servicePaths={window.serverpaths.friendRequestsPaths}
      pageSize="5"
    />,
    document.getElementById('FriendRequestsModuleRoot')
  );

  ////////////////////////////// NOTIFICATIONS ////////////////////////////////
  $('body').append('<div id="NotificationModuleRoot" />');
  window.reactNotificationApp = ReactDOM.render(
    <NotificationModule />,
    document.getElementById('NotificationModuleRoot')
  );
  //////////////////////////// CHAT NOTIFICATIONS /////////////////////////////
  window.reactMessageRequestsApp = ReactDOM.render(
    <ChatNotificationsModule
      userId={window.currentUserId}
      webserviceBase={window.serverpaths.webserviceBase}
      servicePaths={window.serverpaths.messageNotificationsPaths}
      pageSize="5"
    />,
    document.getElementById('ChatNotificationsModuleRoot')
  );

  //////////////////////////// NAVBAR MENU ////////////////////////////////////
  ReactDOM.render(
    <NavbarMenuModule data={navbarMenuData} />,
    document.getElementById('NavbarMenuModule')
  );
}
