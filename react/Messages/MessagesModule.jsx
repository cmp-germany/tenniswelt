const React                = require('react');
const WallWidget           = require('./components/WallWidget');
const Conversations        = require('./components/Conversations');
const ConversationMessages = require('./components/ConversationMessages');

var currentUserId = "wolfgang-adams";



var MessagesModule = React.createClass({

  getInitialState: function() {
    return ({
      conversations: this.props.conversationsData,
      activeConversation: this.props.conversationsData[5]
    });
  },

  render: function() {
    return (
      <div className="container-fluid msg-container">
        <div className="section-left section-left--msg">
          <WallWidget
            title="Nachrichten"
            symbol="mail_outline"
            contentScrollable={true}
            contentFull={true}
          >
            <Conversations conversationsData={this.state.conversations} />
          </WallWidget>
        </div>

        <div className="section-center section-center--msg">
          <ConversationMessages messages={this.state.activeConversation.messages} {...this.props} />
          <div className="msg-input-area">
            <textarea placeholder="Schreibe eine Nachricht" rows={1} name="msg-input-area__text" id="msg-input-area__text" className="msg-input-area__text" defaultValue={""} />
            <a className="msg-input-area__send-a" href="#1"><i className="material-icons">send</i></a>
          </div>
        </div>

        <div className="section-right--msg">
          <aside className="wall-widget wall-widget--side wall-widget--msg">
            <header>
              <i className="material-icons">info_outline</i><h3>Kontaktinfo</h3>
            </header>
            <div className="wall-widget__content--scrollable">
              <img src="gfx/profilbilder/mike-schnorr.jpg" alt className="img-responsive" />
              <div className="msg-contact-detail">
                <div className="msg-contact-detail__title">Name</div>
                <div className="msg-contact-detail__text">Mike Schnorr</div>
              </div>
              <div className="msg-contact-detail">
                <div className="msg-contact-detail__title">Status</div>
                <div className="msg-contact-detail__text">Auf der Arbeit...</div>
              </div>
              <div className="msg-contact-detail">
                <div className="msg-contact-detail__title">Online Status</div>
                <div className="msg-contact-detail__text">zuletzt online heute 15:21</div>
              </div>
              <div className="msg-contact-detail">
                <div className="msg-contact-detail__title">Telefon</div>
                <div className="msg-contact-detail__text">+49 1743 9847304</div>
              </div>
            </div>
          </aside></div>
      </div>

    );
  }
})

module.exports = MessagesModule;
