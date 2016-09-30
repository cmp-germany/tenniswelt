var React = require('react');
var Notification = require('./components/Notification');


var FriendRequestsModule = React.createClass({
  getInitialState: function(){
    return {
      data: this.props.data
    }
  },

  render: function(){
    var data = this.state.data;

    var notifications = data.data.map(function(data){
      if (data.DateAccepted) {
        return;
      }
      return (
        <Notification data={data} key={data.Id} />
      );
    });

    var badgeNumber = 0;
    data.data.forEach(function(item){
      if (item.IsSeen) {
        return;
      }
      badgeNumber++;
    });

    if (badgeNumber == 0) {
      badgeNumber = null;
    }

    return (
      <div className="navbar-notification">
        <button className="navbar-notification__toggle-button" data-toggle="collapse" data-target="#friend-requests" aria-expanded="false">
          <i className="material-icons mdl-badge mdl-badge--overlap" data-badge={badgeNumber}>people_outline</i>
        </button>

        <div className="notification-container collapse" id="friend-requests">
          {notifications}
          <div className="notification">
            <div className="notification__left">
              <img src="gfx/profilbilder/p7.jpg" alt="Profilbild" className="notification__avatar" />
            </div>
            <div className="notification__right">
              <div className="notification__top">
                <h4 className="notification__name">Kai Gärtner</h4>
                <div className="notification__time">14:59</div>
              </div>
              <div className="notification__bottom">
                <a href="#1" className="notification__action notification__action--accept">Annehmen</a>
                <a href="#1" className="notification__action notification__action--decline">Ablehnen</a>
              </div>
            </div>
          </div>
          <div className="notification notification--is-loading">
            <div className="notification__left">
              <img src="gfx/profilbilder/p7.jpg" alt="Profilbild" className="notification__avatar" />
            </div>
            <div className="notification__right">
              <div className="notification__top">
                <h4 className="notification__name">Kai Gärtner</h4>
                <div className="notification__time">14:59</div>
              </div>
              <div className="notification__bottom">
                <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
              </div>
            </div>
          </div>
          <div className="notification notification--with-message">
            <div className="notification__left">
              <img src="gfx/profilbilder/p7.jpg" alt="Profilbild" className="notification__avatar" />
            </div>
            <div className="notification__right">
              <div className="notification__top">
                <h4 className="notification__name">Kai Gärtner</h4>
                <div className="notification__time">14:59</div>
              </div>
              <div className="notification__bottom">
                <div className="notification__message notification__message--success">Angenommen</div>
              </div>
            </div>
          </div>
          <div className="notification notification--with-message">
            <div className="notification__left">
              <img src="gfx/profilbilder/p7.jpg" alt="Profilbild" className="notification__avatar" />
            </div>
            <div className="notification__right">
              <div className="notification__top">
                <h4 className="notification__name">Kai Gärtner</h4>
                <div className="notification__time">14:59</div>
              </div>
              <div className="notification__bottom">
                <div className="notification__message notification__message--success">Abgelehnt</div>
              </div>
            </div>
          </div>
          <div className="notification notification--with-message">
            <div className="notification__left">
              <img src="gfx/profilbilder/p7.jpg" alt="Profilbild" className="notification__avatar" />
            </div>
            <div className="notification__right">
              <div className="notification__top">
                <h4 className="notification__name">Kai Gärtner</h4>
                <div className="notification__time">14:59</div>
              </div>
              <div className="notification__bottom">
                <div className="notification__message notification__message--error">Fehler</div>
              </div>
            </div>
          </div>
          <div className="notification">
            <div className="notification__left">
              <img src="gfx/profilbilder/p7.jpg" alt="Profilbild" className="notification__avatar" />
            </div>
            <div className="notification__right">
              <div className="notification__top">
                <h4 className="notification__name">Kai Gärtner</h4>
                <div className="notification__time">14:59</div>
              </div>
              <div className="notification__bottom">
                <a href="#1" className="notification__action notification__action--accept">Annehmen</a>
                <a href="#1" className="notification__action notification__action--decline">Ablehnen</a>
              </div>
            </div>
          </div>
          <div className="notification">
            <div className="notification__left">
              <img src="gfx/profilbilder/p7.jpg" alt="Profilbild" className="notification__avatar" />
            </div>
            <div className="notification__right">
              <div className="notification__top">
                <h4 className="notification__name">Kai Gärtner</h4>
                <div className="notification__time">14:59</div>
              </div>
              <div className="notification__bottom">
                <a href="#1" className="notification__action notification__action--accept">Annehmen</a>
                <a href="#1" className="notification__action notification__action--decline">Ablehnen</a>
              </div>
            </div>
          </div>
          <div className="notification">
            <div className="notification__left">
              <img src="gfx/profilbilder/p7.jpg" alt="Profilbild" className="notification__avatar" />
            </div>
            <div className="notification__right">
              <div className="notification__top">
                <h4 className="notification__name">Kai Gärtner</h4>
                <div className="notification__time">14:59</div>
              </div>
              <div className="notification__bottom">
                <a href="#1" className="notification__action notification__action--accept">Annehmen</a>
                <a href="#1" className="notification__action notification__action--decline">Ablehnen</a>
              </div>
            </div>
          </div>
          <div className="notification">
            <div className="notification__left">
              <img src="gfx/profilbilder/p7.jpg" alt="Profilbild" className="notification__avatar" />
            </div>
            <div className="notification__right">
              <div className="notification__top">
                <h4 className="notification__name">Kai Gärtner</h4>
                <div className="notification__time">14:59</div>
              </div>
              <div className="notification__bottom">
                <a href="#1" className="notification__action notification__action--accept">Annehmen</a>
                <a href="#1" className="notification__action notification__action--decline">Ablehnen</a>
              </div>
            </div>
          </div>
          <div className="notification notification--load-more">
            <div className="notification__spinner mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
          </div>
        </div>
      </div>


    );
  },
});

module.exports = FriendRequestsModule;
