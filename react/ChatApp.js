var conversations = {
  "volker-miller": [
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
  ],
  "kai-gaertner": []
}

var ChatTab = React.createClass({
  getInitialState: function () {
    return {
      conversation: this.getConversation()
    };
  },

  getConversation: function() {
    return conversations[this.props.partnerId];
  },

  getChatName: function() {
    return users[this.props.partnerId].name;
  },

  addMessage: function (message) {
    var tempConversation = this.state.conversation;
    tempConversation.push(message);
    this.setState({conversation: tempConversation});
    this.scrollDown();
  },

  scrollDown: function() {
    $(this.chatDialogue).scrollTop(function() { return this.scrollHeight; });
  },

  sendMessage: function (messageString) {
    this.addMessage({user: "me", message: messageString});
  },

  componentDidMount: function() {

    $(this.sendButton).click(function(event){
      console.log(this);
      var message = $(this.textarea).val();
      this.sendMessage(message);
      $(this.textarea).val("");
    }.bind(this));

    $(this.textarea).keyup(function(event){
      if(event.keyCode == 13){
        $(this.sendButton).click();
      }
    }.bind(this));
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

    var headerClasses = "chat__header online-status--chat online-status--chat-header";
    var user = users[this.props.partnerId];
    if (user) {
      if (user.isOnline) {
        headerClasses += " online-status--online";
      }
    }


    return (
      <div className="chat__tab">
        <header className={headerClasses}>
          <button data-toggle="collapse" data-target="#chat-2" className="chat__title-button">{this.getChatName()}<i className="material-icons"></i></button>
          <button className="button--close-chat" type="button" name="chat-2-close"><i className="material-icons mdl-icon-close-color"></i></button>
        </header>
        <div id="chat-2" className="collapse chat__content">
          <ul className="chat__dialogue" ref={function(chatDialogue){this.chatDialogue=chatDialogue}.bind(this)}>
            {chatMessages}
          </ul>
          <div className="chat__actions">
            <input type="text" placeholder="Nachricht" className="form-chat form-chat--messagebox" name="chat-message" defaultValue={""} ref={function(textarea){this.textarea=textarea;}.bind(this)} />
            <button className="btn btn-important button--chat" type="button" name="chat-send-button"
              ref={function(sendButton){
                this.sendButton=sendButton;
              }.bind(this)}
            >
              <span className="glyphicon glyphicon-menu-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }
});

var ChatTabContacts = React.createClass({
  render: function () {

    var contacts = usersArray.map(function(user, index) {
      var classNames = "chat__list-item online-status--chat";
      if (user.isOnline) {
        classNames += " online-status--online";
      }

      return (
        <li
          className={classNames} key={index}
        >
          <a href="#">
            <img className="chat__image" src={user.profileImage}
              alt="profilbild"
            />
            <label className="chat__name">{user.name}</label>
          </a>
          <i className="material-icons"></i>
        </li>
      )
    });

    return (
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
              {contacts}
            </ul>
            <div className="chat__filter">
              <button className="btn btn-important button--filter-switch button--filter-switch--active" type="button" name="button-all">Alle (4)</button>
              <button className="btn btn-important button--filter-switch button--filter-switch--deactive" type="button" name="button-online">Online (2)</button>
            </div>
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
            <ChatTab partnerId="volker-miller" />
          </div>
        </div>
        <ChatTabContacts />
      </div>
    );
  }
});

ReactDOM.render(
  <ChatApp />,
  document.getElementById('chat-app')
);
