import React from 'react'
import ReactDOM from 'react-dom'

var conversations = {
  'volker-miller': [
    {
      user: 'me',
      message: 'Hi'
    },
    {
      user: 'volker-miller',
      message: 'Hey'
    },
    {
      user: 'volker-miller',
      message: 'Schön, dass Sie sich melden!'
    },
    {
      user: 'me',
      message: 'Hatte ich doch versprochen ;-)'
    },
    {
      user: 'me',
      message: 'Ich bereite gerade die Dokumente vor ... einen Moment'
    }
  ]
}

var ChatTab = React.createClass({
  getInitialState: function () {
    return {
      conversation: this.getConversation()
    }
  },

  getConversation: function () {
    var conversation = conversations[this.props.partnerId]
    if (conversation) {
      return conversation
    } else {
      return []
    }
  },

  getChatName: function () {
    return users[this.props.partnerId].name
  },

  addMessage: function (message) {
    var tempConversation = this.state.conversation
    tempConversation.push(message)
    this.setState({conversation: tempConversation})
    this.scrollDown()
  },

  scrollDown: function () {
    $(this.chatDialogue).scrollTop(function () { return this.scrollHeight })
  },

  sendMessage: function (messageString) {
    if (messageString == '') {
      return
    }
    this.addMessage({user: 'me', message: messageString})

    $.ajax({
      method: 'GET',
      url: 'http://www.botlibre.com/rest/botlibre/form-chat',
      data: {
        instance: 14025522,
        message: messageString,
        application: '7149688237721015638'
      }
    })
      .done(function (xml) {
        var messageString = xml.getElementsByTagName('message')['0'].childNodes['0'].data
        this.addMessage({user: this.props.partnerId, message: messageString})
      }.bind(this))
  },

  componentDidMount: function () {
    $(this.sendButton).click(function (event) {
      var message = $(this.textarea).val()
      this.sendMessage(message)
      $(this.textarea).val('')
    }.bind(this))

    $(this.textarea).keyup(function (event) {
      if (event.keyCode == 13) {
        $(this.sendButton).click()
      }
    }.bind(this))
  },

  render: function () {
    var chatMessages

    if (this.state.conversation.length > 0) {
      chatMessages = this.state.conversation.map(function (message, index) {
        var chatClasses
        if (message.user == 'me') {
          chatClasses = 'chat__message chat__message--user'
        } else {
          chatClasses = 'chat__message chat__message--partner'
        }

        return (
          <li className={chatClasses} key={index}>
            <img src={this.users[message.user].profileImage} className='chat__image' alt='chat-image' />
            <div className='chat__text-container'>
              <p className='chat__text'>
                {message.message}
              </p>
            </div>
          </li>
        )
      }, {users: users})
    } else {
      chatMessages = <li className='chat__message chat__message--bot'>Noch keine Konversation geführt.</li>
    }

    var headerClasses = 'chat__header online-status--chat online-status--chat-header'
    var user = users[this.props.partnerId]
    if (user) {
      if (user.isOnline) {
        headerClasses += ' online-status--online'
      }
    }

    var chatId = 'chat-' + this.props.partnerId

    var chatTabColClass = 'col-sm-4 col-chat'
    if (this.props.openChatTabs.length < 3) {
      chatTabColClass = 'col-sm-6 col-md-4 col-chat'
    }

    return (
      <div className={chatTabColClass}>
        <div className='chat__tab'>
          <header
            className={headerClasses}
            data-toggle='collapse'
            data-target={'#' + chatId}>
            <p className='chat__header-name'>
              {this.getChatName()}
            </p>
            <div className='chat__header-buttons'>
              <button
                className='button--isOnline'
                data-toggle='collapse'
                data-target={'#' + chatId}>
                <i className='material-icons'></i>
              </button>
              <button
                className='button--close-chat'
                type='button'
                onClick={function () { this.props.removeChat(this.props.partnerId) }.bind(this)}>
                <i className='material-icons mdl-icon-close-color'></i>
              </button>
            </div>
          </header>
          <div
            id={chatId}
            className='collapse chat__content'
            ref={function (c) { this.chatContent = c }.bind(this)}>
            <ul
              className='chat__dialogue'
              ref={function (chatDialogue) { this.chatDialogue = chatDialogue }.bind(this)}>
              {chatMessages}
            </ul>
            <div className='chat__actions'>
              <input
                type='text'
                placeholder='Nachricht'
                className='form-chat form-chat--messagebox'
                name='chat-message'
                defaultValue={''}
                ref={function (textarea) { this.textarea = textarea }.bind(this)} />
              <button
                className='btn btn-important button--chat'
                type='button'
                name='chat-send-button'
                ref={function (sendButton) {
                  this.sendButton = sendButton
                }.bind(this)}
                >
                <i className='material-icons'>send</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var ChatTabContacts = React.createClass({
  render: function () {
    var contacts = usersArray.map(function (user, index) {
      var classNames = 'chat__list-item online-status--chat'
      if (user.isOnline) {
        classNames += ' online-status--online'
      }

      return (
        <li
          className={classNames} key={index}
          onClick={function () {
            this.props.addChat(user.id)
          }.bind(this)}
        >
          <img className='chat__image' src={user.profileImage}
            alt='profilbild'
          />
          <label className='chat__name'>{user.name}</label>
          <i className='material-icons'></i>
        </li>
      )
    }.bind(this))

    return (
      <div className='col-xs-12 col-sm-3 col-md-3 col-lg-2 nopadding'>
        <div className='chat-window'>
          <header className='chat__header' data-toggle='collapse' data-target='#chat-list'>
            <p className='chat__header-name text-center'>
              CHAT (2)
            </p>
            <button className='chat__title-button' />
          </header>
          <div id='chat-list' className='collapse chat__content'>
            <div className='chat__actions'>
              <input className='form-chat form-chat--search' type='text' name='chat-search' placeholder='Suche...' />
              <button className='btn btn-important button--chat button--chat-search' type='button' name='chat-search-button'><i className='material-icons'>search</i></button>
            </div>
            <ul className='chat__list'>
              {contacts}
            </ul>
            <div className='chat__filter'>
              <button className='btn btn-important button--filter-switch button--filter-switch--active' type='button' name='button-all'>Alle (4)</button>
              <button className='btn btn-important button--filter-switch button--filter-switch--deactive' type='button' name='button-online'>Online (2)</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var ChatApp = React.createClass({
  getInitialState: function () {
    return {
      openChatTabs: [
        'volker-miller',
        'kai-gaertner'
      ]
    }
  },

  addChat: function (partnerId) {
    var tempOpenChatTabs = this.state.openChatTabs

    var index = tempOpenChatTabs.indexOf(partnerId)

    // If Chat is already there, remove the old one first
    if (index > -1) {
      tempOpenChatTabs.splice(index, 1)
    }

    // Add Chat
    tempOpenChatTabs.push(partnerId)

    // PopUp ChatTab
    this.popUpChatTab(partnerId)

    // Limit to 3 ChatTabs
    if (tempOpenChatTabs.length > 3) {
      tempOpenChatTabs.splice(0, 1)
    }

    // Save the State
    this.setState({openChatTabs: tempOpenChatTabs})
  },

  popUpChatTab: function (partnerId) {
    this.toPopUp.push(partnerId)
    // $('#chat-' + partnerId).collapse('show');
  },

  removeChat: function (partnerId) {
    var tempOpenChatTabs = this.state.openChatTabs
    var index = $.inArray(partnerId, tempOpenChatTabs)
    if (index > -1) {
      tempOpenChatTabs.splice(index, 1)
    }
    this.setState({openChatTabs: tempOpenChatTabs})
  },

  chatTabs: {},
  toPopUp: [],

  componentDidUpdate: function () {
    this.toPopUp.forEach(function (value, index, array) {
      if (this.chatTabs[value]) {
        $(this.chatTabs[value].chatContent).collapse('show')
        array.splice(index, 1)
      }
    }, this)
  },

  componentDidMount: function () {

  },

  render: function () {
    var spacingColumnsMd = (3 - this.state.openChatTabs.length) * 4
    var spacingColumnsSm = spacingColumnsMd
    if (this.state.openChatTabs.length < 3) {
      spacingColumnsSm = (2 - this.state.openChatTabs.length) * 6
    }
    var colMd = ' col-md-' + spacingColumnsMd
    var colSm = ' col-sm-' + spacingColumnsSm
    if (spacingColumnsSm == 0) {
      colSm = ' hidden-sm'
    }
    var spacing =
      <div
        className={colMd + colSm + ' chat-tabs-spacing'} />

    var chatTabs = this.state.openChatTabs.map(function (partnerId) {
      return (
        <ChatTab
          partnerId={partnerId}
          openChatTabs={this.state.openChatTabs}
          key={partnerId}
          removeChat={this.removeChat}
          ref={function (c) {
            this.component.chatTabs[this.partnerId] = c
          }.bind({component: this, partnerId: partnerId})}
        />
      )
    }.bind(this))

    return (
      <div
        className='navbar__section navbar__section--displayed collapse'
        id='tab__chat'>
        <div className='navbar__section__content'>
          <div className='chat'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-xs-12 col-sm-9 col-md-9 col-lg-10 nopadding'>
                  <div className='chat-tabs'>
                    {spacing}
                    {chatTabs}
                  </div>
                </div>
                <ChatTabContacts addChat={this.addChat} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

console.log('chat-test')

window.reactChatApp = ReactDOM.render(
  <ChatApp />,
  document.getElementById('chat-app')
)
