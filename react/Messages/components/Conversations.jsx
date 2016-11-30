const React = require('react');
const Conversation = require('./Conversation');


var Conversations = React.createClass({

  render: function() {

    var conversationsData = this.props.conversationsData;

    var renderedConversations = conversationsData.map(function(conversationData, index){
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
        {renderedConversations}
      </div>
    );
  }
});

module.exports = Conversations;
