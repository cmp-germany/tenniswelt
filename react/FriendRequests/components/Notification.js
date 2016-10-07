var React = require('react');
var CVM = require("react-component-visibility");
var TimeAgo = require('react-timeago').default;
import germanStrings from 'react-timeago/lib/language-strings/de-short';
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
    if (visible && !this.props.data.isSeen) {
      $.post(
        this.props.webserviceBase + this.props.servicePaths.postIsSeen,
        {
          friendRequestId: this.props.data.Id,
          seen: true
        }
      ).fail(function (result){
        console.error(result);
      });
    }
  },

  errorHandler: function(notificationId, errorMessage, functionName){
      if(this.props.onError)
        if(typeof this.props.onError == "function"){
          if(notificationId === 0)
            errorMessage += ", notificationId doesn\'t have an ID!";
          if(functionName)
            errorMessage = "in function: " + functionName + " " + errorMessage;
          this.props.onError(this.props.data.Id, errorMessage);
          return;
        }
      console.log('Can\'t send the error!')
  },

  acceptHandler: function(){
    try{
      this.props.onAccept(this.props.data.Id);
    }
    catch(err){
      var id = 0;
      if(this.props.data)
        if(this.props.data.Id)
          id = this.props.data.Id;
      this.errorHandler(id, err, 'acceptHandler');
    }
  },
  
  declineHandler: function(){
    try{
      this.props.onDecline(this.props.data.Id); 
    }
    catch(err){
      var id = 0;
      if(this.props.data)
        if(this.props.data.Id)
          id = this.props.data.Id;
      this.errorHandler(id, err, 'declineHandler');
    }
  },

  errorRetryHandler: function(){
    try{
      this.props.onErrorRetry(this.props.data.Id);
    }
    catch(err){
      var id = 0;
      if(this.props.data)
        if(this.props.data.Id)
          id = this.props.data.Id;
      this.errorHandler(id, err, 'errorRetryHandler');
    }
  },

  render: function() {
    var data = this.props.data;

    var containerClassName = "notification";
    var notificationBottom = (
      <div className="notification__bottom">
        <a href="#1" className="notification__action notification__action--accept" onClick={this.acceptHandler}>Annehmen</a>
        <a href="#1" className="notification__action notification__action--decline" onClick={this.declineHandler}>Ablehnen</a>
      </div>
    );

    //Highlight, if not seen
    if (!this.state.IsSeen) {
      containerClassName += " notification--unread";
    }

    var isRendered = false;

    //Show Loading Bar, if it is loading
    if (data.isLoading && !isRendered) {
      containerClassName += " notification--is-loading";
      notificationBottom = (

        <div className="notification__bottom">
          <div>
            <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
          </div>
        </div>
      );
      isRendered = true;
    }

    if(data.isAccepted && !isRendered){
      notificationBottom = (
      <div className="notification__bottom">
          <div className="notification__message notification__message--success">Angenommen</div>
      </div>
      );
      isRendered = true;
    }

    if(data.isDeleted && !isRendered){
      notificationBottom = (
      <div className="notification__bottom">
          <div className="notification__message notification__message--success">Abgelehnt</div>
      </div>
      );
      isRendered = true;
    }

    if(data.isError && !isRendered){
      notificationBottom = (
      <div className="notification__bottom">
          <div className="notification__message notification__message--error">Fehler | <a onClick={this.errorRetryHandler}>Erneut</a> </div>
          {/*<div className="notification__message notification__message--error">{data.errorMessage}</div>*/}
      </div>
      );
      isRendered = true;
    }

    //when there is no time value, ignore it
    var timeAgo = "";
    if (data.DateCreatedUtc) {
      timeAgo = (<TimeAgo date={data.DateCreatedUtc} formatter={formatter} />);
    }

    return (
      <div className={containerClassName}>
        <div className="notification__left">
          <img src={this.props.webserviceBase + data.ProfilePicture} alt="Profilbild" className="notification__avatar" />
        </div>
        <div className="notification__right">
          <div className="notification__top">
            <h4 className="notification__name">{data.ShownName}</h4>
            <div className="notification__time">{timeAgo}</div>
          </div>
          {notificationBottom}
        </div>
      </div>
    )
  }
});

module.exports = Notification;
