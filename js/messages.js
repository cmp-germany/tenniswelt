const React                = require('react');
const ReactDOM             = require('react-dom');
const $                    = require('jquery');
const MessagesModule       = require('../react/Messages/MessagesModule');

$( document ).ready(function(){
  initReactComponents();
});

function initReactComponents() {
  ////////////////////////////// MESSAGES //////////////////////////////
  window.reactMessagesApp = ReactDOM.render(
    <MessagesModule users={window.users} />,
  document.getElementById('MessagesModuleRoot')
  );
}
