const React               = require('react');
const TimeAgo             = require('react-timeago').default;
const MaterialDesignMixin = require('../../mixins/MaterialDesignMixin.js');
const userStore           = require('../stores/UserStore').default;

const languages = {
  'de-DE': require('react-timeago/lib/language-strings/de').default,
  'en-US': require('react-timeago/lib/language-strings/en').default
};
var buildFormatter = require('react-timeago/lib/formatters/buildFormatter').default;

var ConversationMessage = React.createClass({

  getInitialState: function() {
    this.formatter = buildFormatter(languages[this.props.currentLanguage]);
    return this.getStateFromStore();
  },

  getStateFromStore: function() {
    return {
      formatter: this.formatter,
    }
  },

  refreshStateFromStore: function() {
    this.setState(this.getStateFromStore());
  },

  render: function() {

    const user = this.props.user;
    const currentUser = this.props.currentUser;
    const message = this.props.message;

    const isSystemMessage = this.props.isSystemMessage;

    var msgMessageModifier = "";
    if (isSystemMessage) {
      msgMessageModifier += "msg-message--system-message";
    }
    if (user && currentUser) {
      msgMessageModifier += (user.id == currentUser.id) ? "msg-message--self" : "msg-message--other";
    }


    var msgStati = {
      sending: <div className="msg-message__status msg-message__status--loading" />,
      sent: <div className="msg-message__status msg-message__status--sent" />,
      seen: <div className="msg-message__status msg-message__status--read" />
    }
    var msgStatus = msgStati[message.status];

    if (isSystemMessage) {
      return (
        <div className={"msg-message " + msgMessageModifier}>
          <div className="msg-message__content">
            {message.content}
          </div>
        </div>
      );
    }

    return (
      <div className={"msg-message " + msgMessageModifier}>
        <img src={user.profileImage} alt={"Avatar von " + user.name} className="msg-message__avatar" />
        <header className="msg-message__meta">
          <a href={user.profilePage} className="msg-message__name">{user.name}</a>
          <div className="msg-message__time">
            <TimeAgo date={message.time} formatter={this.state.formatter} />
          </div>
        </header>
        <div className="msg-message__content">
          {message.content}
        </div>
        {msgStatus}
      </div>
    )
  }
});


module.exports = ConversationMessage;
