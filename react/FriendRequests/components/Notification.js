var React = require('react');
var CVM = require("react-component-visibility");
var TimerMixin = require('react-timer-mixin');
var TimeAgo = require('react-timeago').default;
var languages = {
  'de-DE': require('react-timeago/lib/language-strings/de-short').default,
  'en-US': require('react-timeago/lib/language-strings/en-short.js').default
};
var buildFormatter = require('react-timeago/lib/formatters/buildFormatter').default;

var Notification = React.createClass({
  mixins: [ CVM, TimerMixin ],

  getInitialState: function() {
    return {
      formatter: buildFormatter(languages[this.props.currentLanguage])
    }
  },

  componentDidMount: function() {
    this.setInterval(this.checkComponentVisibility, 500);
  },

  componentVisibilityChanged: function() {
    var visible = this.state.visible;
    if (visible && !this.props.data.isSeen) {
      var url = this.props.webserviceBase + this.props.servicePaths.postIsSeen;
      if (window.LOCALDATA) {
        url = "data/example/setSeenState.example.json"
      }
      if (typeof updateFriendrequestsCount === "function") {
          updateFriendrequestsCount(this.props.data.id);
        }
      $.post(
        url,
        {
          friendRequestId: this.props.data.id,
          seen: true
        },
        function(result){
          if (result.success) {
            this.props.onSeen(this.props.data.id);
          } else {
            console.error("error POST on ", url);
          }
        }.bind(this),
        "json"
      ).fail(function (jqXHR, textStatus, errorThrown){
        console.error("error POST on ", url);
        console.error("jqXHR: ", jqXHR);
        console.error("textStatus: ", textStatus);
        console.error("errorThrown: ", errorThrown);
      }.bind(this));
    }
  },

  errorHandler: function(notificationId, errorMessage, functionName){
      if(this.props.onError)
        if(typeof this.props.onError == "function"){
          if(notificationId === 0)
            errorMessage += ", notificationId doesn\'t have an ID!";
          if(functionName)
            errorMessage = "in function: " + functionName + " " + errorMessage;
          this.props.onError(this.props.data.id, errorMessage);
          return;
        }
      console.log('Can\'t send the error!')
  },

  acceptHandler: function(){
    try{
      this.props.onAccept(this.props.data.id);
    }
    catch(err){
      var id = 0;
      if(this.props.data)
        if(this.props.data.id)
          id = this.props.data.id;
      this.errorHandler(id, err, 'acceptHandler');
    }
  },

  declineHandler: function(){
    try{
      this.props.onDecline(this.props.data.id);
    }
    catch(err){
      var id = 0;
      if(this.props.data)
        if(this.props.data.id)
          id = this.props.data.id;
      this.errorHandler(id, err, 'declineHandler');
    }
  },

  errorRetryHandler: function(){
    try{
      this.props.onErrorRetry(this.props.data.id);
    }
    catch(err){
      var id = 0;
      if(this.props.data)
        if(this.props.data.id)
          id = this.props.data.id;
      this.errorHandler(id, err, 'errorRetryHandler');
    }
  },

  getTranslation: function(word){
    if(!word)return "";
    try{
      return this.props.languageResource(word);
    }
    catch(err){
      var id = 0;
      if(this.props.data)
        if(this.props.data.id)
          id = this.props.data.id;
      this.errorHandler(id, err, 'getTranslation');
    }
  },

  render: function() {
    var data = this.props.data;
    var containerClassName = "notification";
    var notificationBottom = (
      <div className="notification__bottom">
        <a href="#1" className="notification__action notification__action--accept" onClick={this.acceptHandler}>{this.getTranslation("acceptFriend")}</a>
        <a href="#1" className="notification__action notification__action--decline" onClick={this.declineHandler}>{this.getTranslation("declineFriend")}</a>
      </div>
    );

    //Highlight, if not seen
    if (!this.props.data.isSeen) {
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
          <div className="notification__message notification__message--success">{this.getTranslation("friendRequestAccepted")}</div>
      </div>
      );
      isRendered = true;
    }

    if(data.isDeleted && !isRendered){
      notificationBottom = (
      <div className="notification__bottom">
          <div className="notification__message notification__message--success">{this.getTranslation("friendRequestDeclined")}</div>
      </div>
      );
      isRendered = true;
    }

    if(data.isError && !isRendered){
      notificationBottom = (
      <div className="notification__bottom">
          <div className="notification__message notification__message--error">{this.getTranslation("friendRequestErrorHappened")} | <a onClick={this.errorRetryHandler}>{this.getTranslation("retry")}</a> </div>
          {/*<div className="notification__message notification__message--error">{data.errorMessage}</div>*/}
      </div>
      );
      isRendered = true;
    }

    //when there is no time value, ignore it
    var timeAgo = "";
    if (data.dateCreatedUtc) {
      timeAgo = (<TimeAgo date={data.dateCreatedUtc} formatter={this.state.formatter} />);
    }

    return (
      <div className={containerClassName}>
        <div className="notification__left">
          <a href={data.profileUrl}>
            <img src={this.props.webserviceBase + data.profilePicture} alt="Profilbild" className="notification__avatar" />
          </a>
        </div>
        <div className="notification__right">
          <div className="notification__top">
            <h4 className="notification__name"><a href={data.profileUrl}>{data.shownName}</a></h4>
            <div className="notification__time">{timeAgo}</div>
          </div>
          {notificationBottom}
        </div>
      </div>
    )
  }
});

module.exports = Notification;
