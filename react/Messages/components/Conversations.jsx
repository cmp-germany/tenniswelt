const React = require('react');
const Conversation = require('./Conversation');


var Conversations = React.createClass({

  render: function() {

    var conversationsData = this.props.conversationsData;
    var currentLanguage = this.props.currentLanguage;

    var renderedConversations = conversationsData.map(function(conversationData, index){
      return (
        <Conversation
          key={conversationData.id}
          conversation={conversationData}
          currentLanguage={currentLanguage}
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
