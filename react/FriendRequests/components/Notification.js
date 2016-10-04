var React = require('react');

var Notification = React.createClass({

  render: function() {
    var data = this.props.data;

    var containerClassName = "notification";

    //Highlight, if not seen
    if (!data.IsSeen) {
      containerClassName += " notification--unread";
    }




    return (
      <div className={containerClassName}>
        <div className="notification__left">
          <img src={data.ProfilePicture} alt="Profilbild" className="notification__avatar" />
        </div>
        <div className="notification__right">
          <div className="notification__top">
            <h4 className="notification__name">{data.ShownName}</h4>
            <div className="notification__time">{data.DateCreated}</div>
          </div>
          <div className="notification__bottom">
            <a href="#1" className="notification__action notification__action--accept">Annehmen</a>
            <a href="#1" className="notification__action notification__action--decline">Ablehnen</a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Notification;
