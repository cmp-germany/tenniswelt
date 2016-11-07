var FriendRequestsModule = require('../react/FriendRequests/FriendRequestsModule');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

$( document ).ready(function(){
  initReactComponents();
});

function initReactComponents() {
  ReactDOM.render(
    <FriendRequestsModule
      userId={window.currentUserId}
      currentLanguage={window.currentLanguage}
      webserviceBase={window.serverpaths.webserviceBase}
      servicePaths={window.serverpaths.friendRequestsPaths}
      pageSize="2"
    />,
    document.getElementById('FriendRequestsModuleRoot')
  );
}
