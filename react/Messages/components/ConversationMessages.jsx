const React               = require('react');
const ConversationMessage = require('./ConversationMessage');


var ConversationMessages = React.createClass({

  componentWillUpdate: function() {
    var node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  },

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
