const React                   = require('react');
const withConversationButtons = require('../mixins/withConversationButtons');

var ConversationMessagesContainer = React.createClass({
  render: function() {
    return (
      <div className="msg-messages-container">
        <div className="msg-messages-header">
          <div className="msg-messages-header__back-button">{this.props.backButton}</div>
          <div className="msg-messages-header__title">THIS IS A HEADER</div>
          <div className="msg-messages-header__buttons">
            {this.props.conversationButtons}
          </div>
        </div>
        <div className="msg-messages">
          {this.props.children}
        </div>
      </div>

    );
  }
})

module.exports =
  withConversationButtons(
    ConversationMessagesContainer
  );
