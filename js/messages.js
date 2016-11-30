const React                = require('react');
const ReactDOM             = require('react-dom');
const $                    = require('jquery');
const MessagesModule       = require('../react/Messages/MessagesModule');
const conversationsData    = require('../data/example/conversationsData');

$( document ).ready(function(){
  initReactComponents();
});

function initReactComponents() {
  ////////////////////////////// MESSAGES //////////////////////////////
  window.reactMessagesApp = ReactDOM.render(
    <MessagesModule
      users={window.users}
      currentUser={window.users['wolfgang-adams']}
      currentLanguage="de-DE"
      conversationsData={conversationsData}
    />,
    document.getElementById('MessagesModuleRoot')
  );
}
