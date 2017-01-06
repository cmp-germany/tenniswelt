const React                    = require('react');
const WallWidget               = require('./components/WallWidget');
const Conversations            = require('./components/Conversations');
const ConversationMessages     = require('./components/ConversationMessages');
const conversationStore        = require('./stores/ConversationStore').default;
const currentConversationStore = require('./stores/CurrentConversationStore').default;
const InputArea                = require('./components/InputArea');
const ContactInfos             = require('./components/ContactInfos');
const conversationActions      = require('./actions/ConversationActions');
const withScreenSize           = require('../mixins/withScreenSize');
const screenSizes              = require('./styles/screenSizes').default;
const currentViewStore         = require('./stores/currentViewStore').default;


var MessagesModule = React.createClass({

  getInitialState: function() {
    return this.getStateFromStore();
  },

  getStateFromStore: function() {
    return {
      conversations: conversationStore.getAll(),
      activeConversation: currentConversationStore.getConversation(),
      currentView: currentViewStore.get(),
    };
  },

  refreshStateFromStore: function() {
    this.setState(this.getStateFromStore());
  },

  componentWillMount: function() {
    conversationActions.loadList();
    currentConversationStore.on("change", this.refreshStateFromStore);
    conversationStore.on("change", this.refreshStateFromStore);
    currentViewStore.on("change", this.refreshStateFromStore);
  },

  componentWillUnmount: function() {
    currentConversationStore.removeListener("change", this.refreshStateFromStore);
    conversationStore.removeListener("change", this.refreshStateFromStore);
  },

  render: function() {
    var conversationMessages;
    if (this.state.activeConversation) {
      conversationMessages = <ConversationMessages
        messages={this.state.activeConversation.messages}
        currentLanguage={this.props.currentLanguage}
      />
    } else {
      conversationMessages = <ConversationMessages
        currentLanguage={this.props.currentLanguage}
      />
    }

    if (this.props.screenSize == "xs") {

      if (this.state.currentView == "CONTACT_LIST") {
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
          </div>
        )
      } else if (this.state.currentView == "MESSAGES") {
        return (
          <div className="container-fluid msg-container">
            <div className="section-center section-center--msg">
              {conversationMessages}
              <InputArea />
            </div>
          </div>
        )
      } else if (this.state.currentView == "CONTACT_DETAILS") {
        return (
          <div className="container-fluid msg-container">
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
    }

    if (this.props.screenSize == "sm" || this.props.screenSize == "md") {

      if (this.state.currentView == "CONTACT_LIST" || this.state.currentView == "MESSAGES") {
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
              {conversationMessages}
              <InputArea />
            </div>

          </div>
        )
      }

      if (this.state.currentView == "CONTACT_DETAILS") {
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

    }

    if (this.props.screenSize == "lg") {

      if (this.state.currentView == "CONTACT_LIST" || this.state.currentView == "MESSAGES") {
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
              {conversationMessages}
              <InputArea />
            </div>

          </div>
        )
      }

      if (this.state.currentView == "CONTACT_DETAILS") {
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
              {conversationMessages}
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

    }
  }
})

module.exports = withScreenSize(MessagesModule, screenSizes);
