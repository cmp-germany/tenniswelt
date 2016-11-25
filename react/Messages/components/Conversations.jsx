const React = require('react');
const Conversation = require('./Conversation');

var conversationsData = require('../../../data/example/conversationsData');

var Conversations = React.createClass({
  conversationsData: conversationsData,

  render: function() {

    var conversations = this.conversationsData.map(function(conversationData, index){
      return (
        <Conversation
          key={index}
          user={conversationData.user}
          conversation={conversationData.conversation}
        />
      );
    });

    return (
      <div>
        {conversations}
      </div>
    );
  }
});

module.exports = Conversations;
