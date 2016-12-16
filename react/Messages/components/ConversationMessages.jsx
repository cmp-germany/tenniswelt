const React                    = require('react');
const ConversationMessage      = require('./ConversationMessage');
const currentConversationStore = require('../stores/CurrentConversationStore').default;
const userStore                = require('../stores/UserStore').default;
const currentUserStore         = require('../stores/CurrentUserStore').default;
const conversationActions      = require('../actions/ConversationActions');
const _                        = require('lodash');


var ConversationMessages = React.createClass({

  getInitialState: function() {
    return this.getStateFromStore();
  },


  componentWillMount: function() {
    currentConversationStore.on("change", this.refreshStateFromStore);
    userStore.on("change", this.refreshStateFromStore);
  },

  componentWillUnmount: function() {
    currentConversationStore.removeListener("change", this.refreshStateFromStore);
    userStore.removeListener("change", this.refreshStateFromStore);
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

    // Do I need to load new data?
    console.log("isLoading: ", this.state.isLoading);
    console.log("isLoaded: ", this.state.isLoaded);
    if (!this.state.isLoading && !this.state.isLoaded) {
      _.before(2, conversationActions.load);
    }
  },


  getStateFromStore: function() {
    var currentConversation = currentConversationStore.getConversation();
    var messages = currentConversation ? currentConversation.messages : null;
    return {
      messages,
      users: userStore.getUsers(),
      currentUser: currentUserStore.getCurrentUser(),
      isLoaded: currentConversationStore.isLoaded(),
      isLoading: currentConversationStore.isLoading(),
    };
  },

  refreshStateFromStore: function() {
    this.setState(this.getStateFromStore);
  },


  render: function() {

    const users = this.state.users;
    const currentUser = this.state.currentUser;
    const currentLanguage = this.props.currentLanguage;

    var renderedConversationMessages;
    if (this.state.messages) {
      renderedConversationMessages = this.state.messages.map(function(element, index){
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
    }

    if(!renderedConversationMessages) {
      renderedConversationMessages = (
        <ConversationMessage
          isSystemMessage={true}
          message={{content: "Diese Konversation hat noch keine Nachrichten."}}
          currentUser={currentUser}
          currentLanguage={currentLanguage}
        />
      );
    }

    return (
      <div className="msg-messages">
        {renderedConversationMessages}
      </div>
    )
  }
});


module.exports = ConversationMessages;
