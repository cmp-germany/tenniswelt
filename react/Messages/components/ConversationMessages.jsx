const React                    = require('react');
const ConversationMessage      = require('./ConversationMessage');
const currentConversationStore = require('../stores/CurrentConversationStore').default;
const usersStore               = require('../stores/UsersStore').default;
const currentUserStore         = require('../stores/CurrentUserStore').default;


var ConversationMessages = React.createClass({

  getInitialState: function() {
    return this.getStateFromStore();
  },


  componentWillMount: function() {
    currentConversationStore.on("change", this.refreshStateFromStore);
    usersStore.on("change", this.refreshStateFromStore);
  },

  componentWillUnmount: function() {
    currentConversationStore.removeListener("change", this.refreshStateFromStore);
    usersStore.removeListener("change", this.refreshStateFromStore);
  },

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


  getStateFromStore: function() {
    return {
      messages: currentConversationStore.getConversation().messages,
      users: usersStore.getUsers(),
      currentUser: currentUserStore.getCurrentUser(),
    };
  },

  refreshStateFromStore: function() {
    this.setState(this.getStateFromStore);
  },


  render: function() {

    const users = this.state.users;
    const currentUser = this.state.currentUser;
    const currentLanguage = this.props.currentLanguage;

    var renderedConversationMessages = this.state.messages.map(function(element, index){
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
