const React               = require('react');
const ConversationMessage = require('./ConversationMessage');


var ConversationMessages = React.createClass({
  render: function() {

    const users = this.props.users;
    const currentUser = this.props.currentUser;
    const currentLanguage = this.props.currentLanguage;

    var renderedConversationMessages = this.props.messages.map(function(element, index){
      return (
        <ConversationMessage
          message={element}
          key={index}
          user={users[element.user]}
          currentUser={currentUser}
          currentLanguage={currentLanguage}
        />
      );
    });

    return (
      <div className="msg-messages">
        {renderedConversationMessages}
      </div>
    )
  }
});


module.exports = ConversationMessages;
