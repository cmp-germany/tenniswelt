var React = require('react');
var CVM = require("react-component-visibility");
var TimerMixin = require('react-timer-mixin');
var TimeAgo = require('react-timeago').default;
var languages = {
  'de-DE': require('react-timeago/lib/language-strings/de-short').default,
  'en-US': require('react-timeago/lib/language-strings/en-short.js').default
};
var buildFormatter = require('react-timeago/lib/formatters/buildFormatter').default;

var ChatThread = React.createClass({
  mixins: [ CVM, TimerMixin ],

  onThreadClick: function(userId){
    //this.props.openChatSession(userId);
  },

  render: function() {
    var data = this.props.data;
    var containerClassName = "notification notification--chat";

    //Highlight, if not seen
    if (!data.IsSeen) {
      containerClassName += " notification--unread";
    }

    //when there is no time value, ignore it
    var timeAgo = "";
    if (data.LastMessageDate) {
      timeAgo = (<TimeAgo date={data.LastMessageDate} formatter={this.state.formatter} />);
    }

    var count;
    if (data.CountOfUnreadMessages > 0){
      count = <div className="notification__unread-messages-number">&nbsp;&nbsp;({data.CountOfUnreadMessages})</div>;
    }
    var onlineStatus = data.isOnline == true ? "notification__online-status material-icons online-status online-status--online" : "notification__online-status material-icons online-status online-status--offline";

    return (
      <div className={containerClassName} onClick={() => { startSession(data.ToUserId) }}>
        <div className="notification__left">
          <img src={this.props.webserviceBase + data.ToUserAvatar} alt="Profilbild" className="notification__avatar" />
        </div>
        <div className="notification__right">
          <div className="notification__top">
            <h4 className="notification__name">{data.ToFirstName + " " + data.ToLastName}</h4>
            <i className={onlineStatus} >radio_button_checked</i>
            <div className="notification__time">{timeAgo}</div>
          </div>
          <div className="notification__bottom">
            <div className="notification__message-preview">
              {data.LastMessage}
            </div>
            {count}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ChatThread;
