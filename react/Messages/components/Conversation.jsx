const React = require('react');

var Conversation = React.createClass({
  render: function() {
    var user = this.props.user;
    var conversation = this.props.conversation;
    var conversationClass = conversation.isActive ?
      "msg-conversation msg-conversation--active" :
      "msg-conversation";
    return (
      <div
        className={conversationClass}
      >
        <div className="msg-conversation__left">
          <img
            src={user.profileImage}
            alt={"Profilbild von " + user.name}
            className="msg-conversation__avatar"
          />
        </div>
        <div className="msg-conversation__center">
          <h4 className="msg-conversation__name">{user.name}</h4>
          <p className="msg-conversation__preview">{conversation.preview}</p>
        </div>
        <div className="msg-conversation__right">
          <div className="msg-conversation__time">{conversation.time}</div>
        </div>
      </div>
    );
  }
})

module.exports = Conversation;
