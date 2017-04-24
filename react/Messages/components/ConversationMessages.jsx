const React                         = require('react');
const ConversationMessagesContainer = require('./ConversationMessagesContainer');
const ConversationMessage           = require('./ConversationMessage');
const WallWidget                    = require('./WallWidget');
const currentConversationStore      = require('../stores/CurrentConversationStore').default;
const userStore                     = require('../stores/UserStore').default;
const currentUserStore              = require('../stores/CurrentUserStore').default;
const conversationActions           = require('../actions/ConversationActions');
const _                             = require('lodash');


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

  getStateFromStore: function() {
    var currentConversation = currentConversationStore.getConversation();
    var messages = currentConversation ? currentConversation.messages : null;

    // collect all different userIds, which are appearing in this Conversation.
    var userIds = [];
    if (messages) {
      _.forEach(messages, function(element){
        if (!_.find(userIds, function(u){return u == element.user})) {
          userIds.push(element.user);
        }
      });
    }

    // load the users of the collected userIds
    var users = {};
    _.forEach(userIds, function(userId) {
      users[userId] = userStore.getUser(userId);
    });

    return {
      messages,
      users,
      currentUser: currentUserStore.getCurrentUser(),
      isLoaded: currentConversationStore.isLoaded(),
      isLoading: currentConversationStore.isLoading(),
      title: currentConversation ? currentConversation.user.name : null,
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
      renderedConversationMessages = this.state.messages.map(function(element){
        var user = users[element.user];
        var key = element.id;
        if (!key) {
          key = element.localId;
        }
        return (
          <ConversationMessage
            message={element}
            key={key}
            user={user}
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
      <ConversationMessagesContainer title={this.state.title} >
        {renderedConversationMessages}
      </ConversationMessagesContainer>
    )
  }
});


module.exports = ConversationMessages;
