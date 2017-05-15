const React = require('react')
const WallWidget = require('./components/WallWidget')
const Conversations = require('./components/Conversations')
const ConversationMessages = require('./components/ConversationMessages')
const conversationStore = require('./stores/ConversationStore').default
const currentConversationStore = require('./stores/CurrentConversationStore').default
const InputArea = require('./components/InputArea')
const ContactInfos = require('./components/ContactInfos')
const conversationActions = require('./actions/ConversationActions')
const withScreenSize = require('../mixins/withScreenSize')
const screenSizes = require('./styles/screenSizes').default
const currentViewStore = require('./stores/CurrentViewStore').default

var MessagesModule = React.createClass({

  getInitialState: function () {
    return this.getStateFromStore()
  },

  getStateFromStore: function () {
    return {
      conversations: conversationStore.getAll(),
      activeConversation: currentConversationStore.getConversation(),
      currentView: currentViewStore.get()
    }
  },

  refreshStateFromStore: function () {
    this.setState(this.getStateFromStore())
  },

  componentWillMount: function () {
    conversationActions.loadList()
    currentConversationStore.on('change', this.refreshStateFromStore)
    conversationStore.on('change', this.refreshStateFromStore)
    currentViewStore.on('change', this.refreshStateFromStore)
  },

  componentWillUnmount: function () {
    currentConversationStore.removeListener('change', this.refreshStateFromStore)
    conversationStore.removeListener('change', this.refreshStateFromStore)
  },

  render: function () {
    var sectionLeft = (
      <div className='section-left section-left--msg'>
        <WallWidget
          title='Nachrichten'
          symbol='mail_outline'
          contentScrollable
          contentFull
        >
          <Conversations
            conversationsData={this.state.conversations}
            currentLanguage={this.props.currentLanguage}
          />
        </WallWidget>
      </div>
    )

    var sectionCenter = (
      <div className='section-center section-center--msg'>
        <ConversationMessages {...this.props} />
        <InputArea />
      </div>
    )

    var sectionRight = (
      <div className='section-right--msg'>
        <WallWidget
          title='Kontaktinfo'
          symbol='info_outline'
          contentScrollable
          contentFull={false}
          withContactDetailsButtons
        >
          <ContactInfos />
        </WallWidget>
      </div>
    )

    if (this.props.screenSize == 'xs') {
      if (this.state.currentView == 'CONTACT_LIST') {
        return (
          <div className='container-fluid msg-container'>
            {sectionLeft}
          </div>
        )
      } else if (this.state.currentView == 'MESSAGES') {
        return (
          <div className='container-fluid msg-container'>
            {sectionCenter}
          </div>
        )
      } else if (this.state.currentView == 'CONTACT_DETAILS') {
        return (
          <div className='container-fluid msg-container'>
            {sectionRight}
          </div>
        )
      }
    }

    if (this.props.screenSize == 'sm' || this.props.screenSize == 'md') {
      if (this.state.currentView == 'CONTACT_LIST' || this.state.currentView == 'MESSAGES') {
        return (
          <div className='container-fluid msg-container'>
            {sectionLeft}
            {sectionCenter}
          </div>
        )
      }

      if (this.state.currentView == 'CONTACT_DETAILS') {
        return (
          <div className='container-fluid msg-container'>
            {sectionLeft}
            {sectionRight}
          </div>
        )
      }
    }

    if (this.props.screenSize == 'lg') {
      if (this.state.currentView == 'CONTACT_LIST' || this.state.currentView == 'MESSAGES') {
        return (
          <div className='container-fluid msg-container'>
            {sectionLeft}
            {sectionCenter}
          </div>
        )
      }

      if (this.state.currentView == 'CONTACT_DETAILS') {
        return (
          <div className='container-fluid msg-container'>
            {sectionLeft}
            {sectionCenter}
            {sectionRight}
          </div>

        )
      }
    }
  }
})

module.exports = withScreenSize(MessagesModule, screenSizes)
