var React = require('react');
var CVM = require("react-component-visibility");
var webserviceBase = (require('../../../data/webserviceBase.json')).webserviceBase;
var TimeAgo = require('react-timeago').default;
import germanStrings from 'react-timeago/lib/language-strings/de';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(germanStrings);

var Notification = React.createClass({
  mixins: [ CVM ],

  getInitialState: function() {
    return {
      IsSeen: this.props.data.IsSeen
    }
  },

  componentVisibilityChanged: function() {
    var visible = this.state.visible;
    console.log(webserviceBase + this.props.servicePaths.postIsSeen);
    if (visible && !this.props.data.isSeen) {
      $.post(
        webserviceBase + this.props.servicePaths.postIsSeen,
        {
          friendRequestId: this.props.data.Id,
          seen: true
        },
        function(result) {
          console.log(result);
        }
      );
    }
  },

  accept: function(){
    alert('accept!')
  },
  
  decline: function(){
    alert('decline!')
  },

  render: function() {
    var data = this.props.data;

    var containerClassName = "notification";
    var notificationBottom = (
      <div className="notification__bottom">
        <a href="#1" className="notification__action notification__action--accept" onClick="{this.accept()}">Annehmen</a>
        <a href="#1" className="notification__action notification__action--decline" onClick="{this.decline()">Ablehnen</a>
      </div>
    );

    //Highlight, if not seen
    if (!this.state.IsSeen) {
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
    console.log(data.TimeUtc);

    return (
      <div className={containerClassName}>
        <div className="notification__left">
          <img src={webserviceBase + data.ProfilePicture} alt="Profilbild" className="notification__avatar" />
        </div>
        <div className="notification__right">
          <div className="notification__top">
            <h4 className="notification__name">{data.ShownName}</h4>
            <div className="notification__time"><TimeAgo date={data.TimeUtc} formatter={formatter} /></div>
          </div>
          {notificationBottom}
        </div>
      </div>
    )
  }
});

module.exports = Notification;
