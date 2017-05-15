const React = require('react')
const conversationActions = require('../actions/ConversationActions')
const TimeAgo = require('react-timeago').default

const languages = {
  'de-DE': require('react-timeago/lib/language-strings/de-short').default,
  'en-US': require('react-timeago/lib/language-strings/en-short').default
}
var buildFormatter = require('react-timeago/lib/formatters/buildFormatter').default

var Conversation = React.createClass({

  getInitialState: function () {
    return {
      formatter: buildFormatter(languages[this.props.currentLanguage])
    }
  },

  onClick: function () {
    conversationActions.select(this.props.conversation.id)
  },

  render: function () {
    var user = this.props.conversation.user
    var conversation = this.props.conversation
    var conversationClass = this.props.conversation.isActive
      ? 'msg-conversation msg-conversation--active'
      : 'msg-conversation'
    return (
      <div onClick={this.onClick}
        className={conversationClass}
      >
        <div className='msg-conversation__left'>
          <img
            src={user.avatar}
            alt={'Profilbild von ' + user.name}
            className='msg-conversation__avatar'
          />
        </div>
        <div className='msg-conversation__center'>
          <h4 className='msg-conversation__name'>{user.name}</h4>
          <p className='msg-conversation__preview'>{conversation.preview}</p>
        </div>
        <div className='msg-conversation__right'>
          <div className='msg-conversation__time'>
            <TimeAgo date={conversation.time} formatter={this.state.formatter} />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Conversation
