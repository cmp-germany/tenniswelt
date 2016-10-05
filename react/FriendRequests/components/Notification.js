var React = require('react');
var webserviceBase = (require('../../../data/webserviceBase.json')).webserviceBase;

var Notification = React.createClass({

  render: function() {
    var data = this.props.data;

    var containerClassName = "notification";
    var notificationBottom = (
      <div className="notification__bottom">
        <a href="#1" className="notification__action notification__action--accept">Annehmen</a>
        <a href="#1" className="notification__action notification__action--decline">Ablehnen</a>
      </div>
    );

    //Highlight, if not seen
    if (!data.IsSeen) {
      containerClassName += " notification--unread";
    }

    //Show Loading Bar, if it is loading
    if (data.isLoading) {
      containerClassName += " notification--is-loading";
      var notificationBottom = (
        <div className="notification__bottom">
          <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
        </div>
      );
    }

    return (
      <div className={containerClassName}>
        <div className="notification__left">
          <img src={webserviceBase + data.ProfilePicture} alt="Profilbild" className="notification__avatar" />
        </div>
        <div className="notification__right">
          <div className="notification__top">
            <h4 className="notification__name">{data.ShownName}</h4>
            <div className="notification__time">{data.DateCreated}</div>
          </div>
          {notificationBottom}
        </div>
      </div>
    )
  }
});

module.exports = Notification;
