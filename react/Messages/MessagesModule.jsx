const React                    = require('react');
const WallWidget               = require('./components/WallWidget');
const Conversations            = require('./components/Conversations');
const ConversationMessages     = require('./components/ConversationMessages');
const conversationStore        = require('./stores/ConversationStore').default;
const currentConversationStore = require('./stores/CurrentConversationStore').default;
const InputArea                = require('./components/InputArea');
const ContactInfos             = require('./components/ContactInfos');


var MessagesModule = React.createClass({

  getInitialState: function() {
    return this.getStateFromStore();
  },

  getStateFromStore: function() {
    console.log("activeConversation: ", currentConversationStore.getConversation());
    return {
      conversations: conversationStore.getAll(),
      activeConversation: currentConversationStore.getConversation(),
    };
  },

  refreshStateFromStore: function() {
    this.setState(this.getStateFromStore());
  },

  componentWillMount: function() {
    currentConversationStore.on("change", this.refreshStateFromStore);
  },

  componentWillUnmount: function() {
    currentConversationStore.removeListener("change", this.refreshStateFromStore);
  },

  render: function() {
    return (
      <div className="container-fluid msg-container">
        <div className="section-left section-left--msg">
          <WallWidget
            title="Nachrichten"
            symbol="mail_outline"
            contentScrollable={true}
            contentFull={true}
          >
            <Conversations
              conversationsData={this.state.conversations}
              currentLanguage={this.props.currentLanguage}
            />
          </WallWidget>
        </div>

        <div className="section-center section-center--msg">
          <ConversationMessages messages={this.state.activeConversation.messages} currentLanguage={this.props.currentLanguage} />
          <InputArea />
        </div>

        <div className="section-right--msg">
          <WallWidget
            title="Kontaktinfo"
            symbol="info_outline"
            contentScrollable={true}
            contentFull={false}
          >
            <ContactInfos />
          </WallWidget>
        </div>
      </div>

    );
  }
})

module.exports = MessagesModule;
