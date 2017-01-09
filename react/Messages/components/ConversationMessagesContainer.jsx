const React                   = require('react');
const withConversationButtons = require('../mixins/withConversationButtons');
const currentViewActions      = require('../actions/CurrentViewActions');

var ConversationMessagesContainer = React.createClass({
  render: function() {
    return (
      <div className="msg-messages-container">
        <div className="msg-messages-header">
          <div className="msg-messages-header__back-button">{this.props.backButton}</div>
          <div className="msg-messages-header__title" onClick={() => {currentViewActions.navigateTo("CONTACT_DETAILS")}}>{this.props.title}</div>
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
