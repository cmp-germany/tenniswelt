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
  ]
}

var ChatTab = React.createClass({
  getInitialState: function () {
    return {
      conversation: this.getConversation()
    };
  },

  getConversation: function() {
    var conversation = conversations[this.props.partnerId];
    if (conversation) {
      return conversation;
    } else {
      return [];
    }
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

    var chatMessages;


    if (this.state.conversation.length > 0) {
      chatMessages = this.state.conversation.map(function (message, index) {
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
    } else {
      chatMessages = <li className="chat__message chat__message--bot">Noch keine Konversation geführt.</li>;
    }

    var headerClasses = "chat__header online-status--chat online-status--chat-header";
    var user = users[this.props.partnerId];
    if (user) {
      if (user.isOnline) {
        headerClasses += " online-status--online";
      }
    }

    var chatId = "chat-" + this.props.partnerId;

    return (
      <div className="chat__tab">
        <header className={headerClasses}>
          <button data-toggle="collapse" data-target={"#" + chatId} className="chat__title-button">{this.getChatName()}<i className="material-icons"></i></button>
          <button className="button--close-chat" type="button" onClick={function(){this.props.removeChat(this.props.partnerId)}.bind(this)}><i className="material-icons mdl-icon-close-color"></i></button>
        </header>
        <div id={chatId} className="collapse chat__content">
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
          onClick={function(){
            this.props.addChat(user.id);
          }.bind(this)}
        >
          <img className="chat__image" src={user.profileImage}
            alt="profilbild"
          />
          <label className="chat__name">{user.name}</label>
          <i className="material-icons"></i>
        </li>
      )
    }.bind(this));

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
  getInitialState: function() {
    return {
      openChatTabs: [
        "volker-miller",
        "kai-gaertner"
      ]
    }
  },

  addChat: function(partnerId) {
    var tempOpenChatTabs = this.state.openChatTabs;
    tempOpenChatTabs.push(partnerId);
    this.setState({openChatTabs: tempOpenChatTabs});
  },

  removeChat: function(partnerId) {
    var tempOpenChatTabs = this.state.openChatTabs;
    var index = $.inArray(partnerId, tempOpenChatTabs);
    if (index > -1) {
      tempOpenChatTabs.splice(index, 1);
    }
    this.setState({openChatTabs: tempOpenChatTabs});
  },

  render: function() {
    var chatTabs = this.state.openChatTabs.map(function (partnerId){
      return (
        <ChatTab partnerId={partnerId} key={partnerId} removeChat={this.removeChat} />
      );
    }.bind(this));

    return (
      <div>
        <div className="col-xs-12 col-sm-9 col-md-9 col-lg-10 nopadding">
          <div className="chat-tabs">
            {chatTabs}
          </div>
        </div>
        <ChatTabContacts addChat={this.addChat} />
      </div>
    );
  }
});

ReactDOM.render(
  <ChatApp />,
  document.getElementById('chat-app')
);
