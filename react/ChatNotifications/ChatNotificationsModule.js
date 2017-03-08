const React = require('react');
const $ = require('jquery');
const MaterialDesignMixin = require('../mixins/MaterialDesignMixin');
const TimeOut = 1000; 
const ChatThread = require('./components/ChatThread');
const NotificationLoadMore = require("../FriendRequests/components/NotificationLoadMore");
const NotificationErrorMessage = require('../FriendRequests/components/NotificationErrorMessage');

var ChatNotificationsModule = React.createClass({
	mixins: [MaterialDesignMixin],

	//Functions
	loadData: function(pageNumber = 1, onLoadingDone, cleanTheList = false) {
    var getMessageThreadsUrl = this.props.webserviceBase + this.props.servicePaths.getMessageThreads;
    if(cleanTheList)
        pageNumber = 1;
    this.serverRequest = $.getJSON(getMessageThreadsUrl, {
      userId: this.props.userId,
      pageNumber: pageNumber,
      pageSize: this.props.pageSize
    }, function(result) {
      if (result.success) {
        var messageThreads;
        messageThreads = this.state.messageThreads;
        var userIds;
        userIds = this.state.userIds;

        if (cleanTheList) {
          messageThreads = [];
        }
        Array.prototype.push.apply(messageThreads, result.data.MessageThreads);

        $.each(result.data.MessageThreads, function( key, value ) {
				  	userIds.push(result.data.MessageThreads[key].ToUserId);
				});

        var newState;
        if (messageThreads.length < result.data.AllCount) {
          newState = "loadMore";
        } else {
          newState = "loaded";
        }

        this.setState({currentState: newState, unseenMessagesCount: result.data.UnseenMessagesCount, userIds: userIds, messageThreads: messageThreads, threadsCount: result.data.AllCount});
				
				this.updateChatUsersStatus();
				if (onLoadingDone) {
          onLoadingDone();
        }

      } else {
        var error = null;
        if (result)
          error = result.data;
        this.setState({currentState: "error", errorMessage: error});
      }
    }.bind(this)).fail(function(jqXHR, textStatus, errorThrown) {
      this.setState({currentState: "error", errorMessage: textStatus});
    }.bind(this));
  },
  onReload: function() {
    this.setState({unseenMessagesCount: null, messageThreads: [], userIds: [], currentState: "initLoading"});
    this.loadData();
  },
  onLoadMore: function(onLoadingDone) {
    // calculate the pageNumber, which needs to be loaded
    var currentCount = this.state.messageThreads.length;
    var pageSize = this.props.pageSize;
    var currentPageNumber = currentCount / pageSize;
    var loadPageNumber = currentPageNumber + 1;

    //loadData. Call the function onLoadingDone after Loading is done
    this.loadData(loadPageNumber, onLoadingDone);
  },
  updateChatUsersStatus: function(){
    var updateChatUserOnlineStatuses = this.props.webserviceBase + this.props.servicePaths.chatService;
    var data = "";
    if(this.state.userIds.length>0){
    	data = "userIds=" + this.state.userIds.join("&userIds=");
    
  		$.ajax({
  		  url: updateChatUserOnlineStatuses,
  		  data: data, 
  	    type: 'POST',
  	    contentType: "application/x-www-form-urlencoded",
  	    dataType: "json"
  		}).done(function(result) {
  			if(result.length > 0){
  				var chatThreads = [];
  				$.each(this.state.messageThreads, function(key, value) {
  					var userObject = $.grep(result, function(e){ return e.userId == value.ToUserId; }.bind(this));
  					if(userObject.length > 0){
  						value.isOnline = userObject[0].online ;
  						chatThreads.push(value);
  					}
  				}.bind(this));
  				this.state.messageThreads= chatThreads;
  				this.forceUpdate();
  			}
  		}.bind(this)).fail(function(jqXHR, textStatus, errorThrown) {
        this.setState({currentState: "error", errorMessage: textStatus});
      }.bind(this));
    }
  },
  updateUnseenCount: function(sessionId, unseenCount){
  	var messagesArray = this.state.messageThreads;
  	$.each(messagesArray, function(){
  		if(this.SessionId == sessionId){
  			this.IsSeen = true;
  		}
  	});

  	this.state.messageThreads = messagesArray;
  	this.state.threadsCount = result.data.AllCount;
  	this.forceUpdate();
  },

  setSeenUser: function(userId){
    var chatThreads = [];
    $.each(this.state.messageThreads, function(key, value) {
      if(value.ToUserId == userId){
        if(!value.IsSeen)
          this.state.unseenMessagesCount = this.state.unseenMessagesCount - value.CountOfUnreadMessages;
        value.CountOfUnreadMessages = 0;
        value.IsSeen = true;
      }
      chatThreads.push(value);
    }.bind(this));
    this.state.messageThreads= chatThreads;
    this.forceUpdate();
  },

	//Events and callbacks
  getInitialState: function() {
    return {unseenMessagesCount: null, messageThreads: [], userIds: [], currentState: "initLoading", threadsCount: 0}
  },
  componentWillMount: function() {
    this.loadData();
    var updateUser = this.updateChatUsersStatus;
    setInterval(function () {
      updateUser();
    }, 60000);
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() {
  	var notifications;
    var badge;

    switch (this.state.currentState) {
    	case "error":
        {
          var errorMessage = "error";
          if (this.state.errorMessage)
            errorMessage = this.state.errorMessage;
          notifications = <NotificationErrorMessage errorMessage={errorMessage} onReload={this.onReload}/>;
          badge = "!";
        }
        break;

      case "initLoading":
        {
          notifications = <NotificationLoadMore/>;
          badge = null;
        }
        break;

      case "loaded":
        {
          notifications = this.state.messageThreads.map(function(data) {
            if (data.dateAccepted) {
              return;
            }
            return (<ChatThread webserviceBase={this.props.webserviceBase} servicePaths={this.props.servicePaths} data={data} key={data.ChatSessionId} />);
          }.bind(this));
          if (this.state.messageThreads.length == 0) {
            notifications = <NotificationErrorMessage errorMessage="Keine Anfragen"/>
          }
          badge = this.state.unseenMessagesCount;
        }
        break;

      case "loadMore":
      	{
      		notifications = this.state.messageThreads.map(function(data) {
            if (data.dateAccepted) {
              return;
            }
            return (<ChatThread webserviceBase={this.props.webserviceBase} servicePaths={this.props.servicePaths} data={data} key={data.ChatSessionId} />);
          }.bind(this));
          if (this.state.messageThreads.length == 0) {
            notifications = <NotificationErrorMessage errorMessage="Keine Anfragen"/>;
          }
          if (Array.isArray(notifications)) {
            notifications.push(<NotificationLoadMore key="loadMore" onLoadMore={this.onLoadMore}/>);
          } else {
            notifications = (<NotificationLoadMore/>);
          }
          badge = this.state.unseenMessagesCount;
      	}
      	break;
    }

    if (badge == 0) {
	    badge = null;
	  }

  	return (
      <div className="navbar-notification">
        <a href='javascript:void(0)' className="navbar-notification__toggle-button" data-toggle="collapse" id="chat-notifications-toggle-btn" data-target="#chat-notifications" aria-expanded="false" onClick={this.mainIconClicked}>
          <i className="material-icons mdl-badge mdl-badge--overlap" data-badge={badge}>
            chat_bubble_outline
          </i>
        </a>
        <div className="notification-container scrollable-notifications collapse" id="chat-notifications">
        	{notifications}
        </div>
      </div>
    );
  }
});

module.exports = ChatNotificationsModule;
