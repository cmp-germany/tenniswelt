const React               = require('react');
const TimeAgo             = require('react-timeago').default;
const MaterialDesignMixin = require('../../mixins/MaterialDesignMixin.js');

const languages = {
  'de-DE': require('react-timeago/lib/language-strings/de').default,
  'en-US': require('react-timeago/lib/language-strings/en').default
};
var buildFormatter = require('react-timeago/lib/formatters/buildFormatter').default;

var ConversationMessage = React.createClass({

  getInitialState: function() {
    return {
      formatter: buildFormatter(languages[this.props.currentLanguage])
    }
  },

  render: function() {

    const user = this.props.user;
    const currentUser = this.props.currentUser;
    const message = this.props.message;

    var msgMessageModifier = "";
    msgMessageModifier += (user.id == currentUser.id) ? "msg-message--self" : "msg-message--other";

    var msgStati = {
      loading: <div className="msg-message__status msg-message__status--loading" />,
      sent: <div className="msg-message__status msg-message__status--sent" />,
      read: <div className="msg-message__status msg-message__status--read" />
    }
    var msgStatus = msgStati[message.status];


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
