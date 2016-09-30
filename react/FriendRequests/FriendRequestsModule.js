var React = require('react');
var Notification = require('./components/Notification');

var data = {
   "success":true,
   "data":[
      {
         "Id":"00000000-0000-0000-0000-000000000000",
         "ShownName": "Uwe Müller",
         "ProfilePicture": "gfx/profilbilder/p1.jpg",
         "UserId":"1065b80c-06ff-46bb-af2c-809f5c885ac0",
         "FriendUserId":"496e3f91-edde-4929-8a83-a5b800cb9397",
         "DateCreated":"2016-09-29T16:41:09.527",
         "DateAccepted":null,
         "IsSeen":false,
         "IsAccepted":false
      },
      {
         "Id":"3ceb27d0-e996-4131-997d-a673010587f9",
         "ShownName": "Uwe Müller",
         "ProfilePicture": "gfx/profilbilder/p1.jpg",
         "UserId":"cc901955-2cf4-4f67-bd23-e46c85bbc986",
         "FriendUserId":"496e3f91-edde-4929-8a83-a5b800cb9397",
         "DateCreated":"2016-08-31T14:16:59.12",
         "DateAccepted":null,
         "IsSeen":false,
         "IsAccepted":false
      },
      {
         "Id":"1ab24ddc-b1a5-4653-b325-a54500bcc15e",
         "ShownName": "Uwe Müller",
         "ProfilePicture": "gfx/profilbilder/p1.jpg",
         "UserId":"ad505676-71b0-46d2-84ec-a464013c5344",
         "FriendUserId":"496e3f91-edde-4929-8a83-a5b800cb9397",
         "DateCreated":"2015-11-03T10:18:30.817",
         "DateAccepted":null,
         "IsSeen":false,
         "IsAccepted":false
      }
   ]
};

var FriendRequestsModule = React.createClass({
  render: function(){

    var notifications = data.data.map(function(data){
      return (
        <Notification data={data} key={data.Id} />
      );
    });

    return (
      <div className="navbar-notification">
        <button className="navbar-notification__toggle-button" data-toggle="collapse" data-target="#friend-requests" aria-expanded="false">
          <i className="material-icons mdl-badge mdl-badge--overlap" data-badge={5}>people_outline</i>
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
