var ChatTab = React.createClass({
  getInitialState: function () {
    return {
      conversation: [
        {
          user: "me",
          message: "Hi"
        },
        {
          user: "volker-miller",
          message: "Hey"
        },
        {
          user: "volker-miller",
          message: "Schön, dass Sie sich melden!"
        },
        {
          user: "me",
          message: "Hatte ich doch versprochen ;-)"
        },
        {
          user: "me",
          message: "Ich bereite gerade die Dokumente vor ... einen Moment"
        }
      ]
    };
  },

  addMessage: function (message) {
    var tempConversation = this.state.conversation;
    tempConversation.push(message);
    this.setState({conversation: tempConversation});
  },

  sendMessage: function (messageString) {
    addMessage({user: "me", message: messageString});
  },

  render: function() {

    var chatMessages = this.state.conversation.map(function (message, index) {
      var chatClasses;
      if (message.user == "me") {
        chatClasses = "chat__message chat__message--user";
      } else {
        chatClasses = "chat__message chat__message--partner";
      }

      return (
        <li className={chatClasses} key={index}>
          <img src={this.users[message.user].profileImage} className="chat__image" alt="chat-image" />
          <p className="chat__text">
            {message.message}
          </p>
        </li>
      );
    }, {users: users});


    return (
      <div className="chat__tab">
        <header className="chat__header online-status--chat online-status--chat-header online-status--online">
          <button data-toggle="collapse" data-target="#chat-2" className="chat__title-button">Max Mustermann <i className="material-icons"></i></button>
          <button className="button--close-chat" type="button" name="chat-2-close"><i className="material-icons mdl-icon-close-color"></i></button>
        </header>
        <div id="chat-2" className="collapse chat__content">
          <ul className="chat__dialogue">
            {chatMessages}
          </ul>
          <div className="chat__actions">
            <textarea placeholder="Nachricht" className="form-chat form-chat--messagebox" name="chat-message" defaultValue={""} />
            <button className="btn btn-important button--chat" type="button" name="chat-send-button"><span className="glyphicon glyphicon-menu-right" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    );
  }
});

var ChatApp = React.createClass({
  render: function() {
    return (
      <div>
        <div className="col-xs-12 col-sm-9 col-md-9 col-lg-10 nopadding">
          <div className="chat-tabs">
            <div className="chat__tab">
              <header className="chat__header online-status--chat online-status--chat-header">
                <button data-toggle="collapse" data-target="#chat-1" className="chat__title-button">Maxi Mustermann <i className="material-icons"></i></button>
                <button className="button--close-chat" type="button" name="chat-1-close"><i className="material-icons mdl-icon-close-color"></i></button>
              </header>
              <div id="chat-1" className="collapse chat__content">
                <ul className="chat__dialogue">
                  <li className="chat__message chat__message--bot">Noch keine Konversation geführt.</li>
                </ul>
                <div className="chat__actions">
                  <textarea placeholder="Nachricht" className="form-chat form-chat--messagebox" name="chat-message" defaultValue={""} />
                  <button className="btn btn-important button--chat" type="button" name="chat-send-button"><span className="glyphicon glyphicon-menu-right" aria-hidden="true" /></button>
                </div>
              </div>
            </div>
            <ChatTab />
          </div>
        </div>
        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-2 nopadding">
          <div className="chat-window">
            <header className="chat__header">
              <button data-toggle="collapse" data-target="#chat-list" className="chat__title-button">CHAT (2)</button>
            </header>
            <div id="chat-list" className="collapse chat__content">
              <div className="chat__actions alignment--center">
                <input className="form-chat" type="text" name="chat-search" placeholder="Suche..." />
                <button className="btn btn-important button--chat button--chat-search" type="button" name="chat-search-button"><span className="glyphicon glyphicon-menu-right" aria-hidden="true" /></button>
              </div>
              <ul className="chat__list">
                <li className="chat__list-item online-status--chat online-status--online"><a href="#"><img className="chat__image" src="gfx/profilbilder/p1.jpg" alt="profilbild" /><label className="chat__name">Viktor Mustermann</label></a><i className="material-icons"></i></li>
                <li className="chat__list-item online-status--chat "><a href="#"><img className="chat__image" src="gfx/profilbilder/p1.jpg" alt="profilbild" /><label className="chat__name">Max Mustermann</label></a><i className="material-icons"></i></li>
                <li className="chat__list-item online-status--chat online-status--online"><a href="#"><img className="chat__image" src="gfx/profilbilder/p1.jpg" alt="profilbild" /><label className="chat__name">Max Mustermann</label></a><i className="material-icons"></i></li>
                <li className="chat__list-item online-status--chat "><a href="#"><img className="chat__image" src="gfx/profilbilder/p1.jpg" alt="profilbild" /><label className="chat__name">Max Mustermann</label></a><i className="material-icons"></i></li>
              </ul>
              <div className="chat__filter">
                <button className="btn btn-important button--filter-switch button--filter-switch--active" type="button" name="button-all">Alle (4)</button>
                <button className="btn btn-important button--filter-switch button--filter-switch--deactive" type="button" name="button-online">Online (2)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <ChatApp />,
  document.getElementById('chat-app')
);
