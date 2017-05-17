const React = require('react')
const withConversationButtons = require('../mixins/withConversationButtons')
const currentViewActions = require('../actions/CurrentViewActions')

var ConversationMessagesContainer = React.createClass({
  componentWillUpdate: function () {
    var node = ReactDOM.findDOMNode(this.messagesDiv)
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
  },

  componentDidUpdate: function () {
    if (this.shouldScrollBottom) {
      var node = ReactDOM.findDOMNode(this.messagesDiv)
      node.scrollTop = node.scrollHeight
    }
  },

  componentDidMount: function () {
    var node = ReactDOM.findDOMNode(this.messagesDiv)
    node.scrollTop = node.scrollHeight
  },

  render: function () {
    return (
      <div className='msg-messages-container'>
        <div className='msg-messages-header'>
          <div className='msg-messages-header__back-button'>{this.props.backButton}</div>
          <div className='msg-messages-header__title' onClick={() => { currentViewActions.navigateTo('CONTACT_DETAILS') }}>{this.props.title}</div>
          <div className='msg-messages-header__buttons'>
            {this.props.conversationButtons}
          </div>
        </div>
        <div className='msg-messages' ref={(div) => { this.messagesDiv = div }} >
          {this.props.children}
        </div>
      </div>

    )
  }
})

module.exports =
  withConversationButtons(
    ConversationMessagesContainer
  )
