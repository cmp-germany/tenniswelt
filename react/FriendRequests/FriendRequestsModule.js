const React = require('react');
const $ = require('jquery');
const Notification = require('./components/Notification');
const NotificationErrorMessage = require('./components/NotificationErrorMessage');
const MaterialDesignMixin = require('../mixins/MaterialDesignMixin');
const NotificationLoadMore = require("./components/NotificationLoadMore");
const TimeOut = 1000; //milliseconds
var FriendRequestsModule = React.createClass({
  mixins: [MaterialDesignMixin],

  getInitialState: function(){
    return {
      unseenRequestsCount : null,
      friendRequests: [],
      currentState: "initLoading",
      allCount: 0
    }
  },

  componentDidMount: function(){
    this.loadData();
  },

  onReload: function() {
    this.setState({
      unseenRequestsCount: null,
      friendRequests: [],
      currentState: "initLoading"
    });
    this.loadData();
  },

  getTranslation: function(word){
    if(!word)return "";
    var languageResource = this.state.languageResource;
    if(!languageResource[word]){
      console.log("Word (" + word + ") is not translated!");
      return "";
    }
    else
      return languageResource[word];
  },

  loadData: function(pageNumber = 1, onLoadingDone) {
    var getAllFriendRequestsUrl = this.props.webserviceBase + this.props.servicePaths.getActive;
    this.serverRequest = $.get(
      getAllFriendRequestsUrl,
      {
        userid: this.props.userId,
        currentLanguage: this.props.currentLanguage,
        pageNumber: pageNumber,
        pageSize: this.props.pageSize
      },
      function (result) {
        if(result.success){

          var friendRequests;
          friendRequests = this.state.friendRequests;
          Array.prototype.push.apply(friendRequests, result.data.friendRequests);

          var newState;
          if (friendRequests.length < result.data.allCount) {
            newState = "loadMore";
          } else {
            newState = "loaded";
          }
          this.setState({
            currentState: newState,
            unseenRequestsCount: result.data.unseenRequestsCount,
            friendRequests: friendRequests,
            allCount: result.data.allCount,
            languageResource: result.data.languageResource
          });

          if (onLoadingDone) {
            onLoadingDone();
          }

        }
        else{
          var error = null;
          if(result)
            error = result.data;
          this.setState({currentState: "error", errorMessage: error });
        }
      }.bind(this)
    ).fail(function(jqXHR, textStatus, errorThrown){
      this.setState({currentState: "error", errorMessage: textStatus });
    }.bind(this));
  },

  onLoadMore: function(onLoadingDone) {
    // calculate the pageNumber, which needs to be loaded
    var currentCount = this.state.friendRequests.length;
    var pageSize = this.props.pageSize;
    var currentPageNumber = currentCount / pageSize;
    var loadPageNumber = currentPageNumber + 1;

    // loadData. Call the function onLoadingDone after Loading is done
    this.loadData(loadPageNumber, onLoadingDone);
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  removeWithTimeout: function(friendRequestId, timeOut){
    setTimeout(function() {
      var allData = this.state.friendRequests;
      var index = allData.findIndex(x => x.Id===friendRequestId);
      allData.splice(index, 1);
      this.setState({allData});
    }.bind(this), timeOut);
  },

  acceptFriendRequest: function(friendRequestId){
    var allData = this.state.friendRequests;
    var index = allData.findIndex(x => x.Id===friendRequestId);
    allData[index].isLoading = true;
    this.setState({friendRequests:allData});
    var acceptFriendRequestUrl = this.props.webserviceBase + this.props.servicePaths.accept;
    $.post(
      acceptFriendRequestUrl,
      {
        friendRequestId: friendRequestId
      },
      function(result){
        if(result.success){
          allData[index].isLoading = false;
          allData[index].isAccepted = true;
          this.setState({friendRequests:allData});
          this.removeWithTimeout(friendRequestId, TimeOut);
          if(typeof refreshChatUserList === "function"){
            refreshChatUserList(allData[index].UserId);
            refreshChatUserList(allData[index].FriendUserId);
          }
        }
        else{
          allData[index].isLoading = false;
          allData[index].isError = true;
          this.setState({friendRequests:allData});
        }
      }.bind(this)
    );
  },

  declineFriendRequest: function(friendRequestId){
    var allData = this.state.friendRequests;
    var index = allData.findIndex(x => x.Id===friendRequestId);
    allData[index].isLoading = true;
    this.setState({allData});
    var declineFriendRequestUrl = this.props.webserviceBase + this.props.servicePaths.decline;
    try{
      $.post(
        declineFriendRequestUrl,
        {
          friendRequestId: friendRequestId
        },
        function(result){
          if(result.success){
            allData[index].isLoading = false;
            allData[index].isDeleted = true;
            this.setState({allData});
            this.removeWithTimeout(friendRequestId, TimeOut);
          }
          else{
            allData[index].isLoading = false;
            allData[index].isError = true;
            this.setState({friendRequests:allData});
          }
        }.bind(this)
      );
    }
    catch(e){
      allData[index].isLoading = false;
      allData[index].isError = true;
      this.setState({friendRequests:allData});
    }
  },

  handleError: function(friendRequestId, errorMessage){
    var message = friendRequestId + ' has error: ' + errorMessage;
    console.log(message);
    //Todo: handle error in a better way please.
    if(this.state){
      if(this.state.friendRequests){
        var allData = this.state.friendRequests;
        var index = allData.findIndex(x => x.Id===friendRequestId);
        allData[index].isError = true;
        allData[index].errorMessage = message;
        this.setState({allData});
      }
    }
  },

  errorRetry: function(friendRequestId){
    var allData = this.state.friendRequests;
    var index = allData.findIndex(x => x.Id===friendRequestId);
    allData[index].isError = false;
    this.setState({allData});
  },

  mainIconClicked: function(){
    return false;
  },

  render: function(){
    var notifications;
    var badge;

    switch(this.state.currentState){
      case "error":
      {
        var errorMessage = "error";
        if(this.state.errorMessage)
          errorMessage = this.state.errorMessage;
        notifications = <NotificationErrorMessage languageResource={this.getTranslation} errorMessage={errorMessage} onReload={this.onReload} />;
        badge = "!";
      }
      break;
      case "initLoading":
      {
        notifications = <NotificationLoadMore />;
        badge = null;
      }
      break;
      case "loaded":
      {
        notifications = this.state.friendRequests.map(function(data){
          if (data.DateAccepted) {
            return;
          }
          return (
            <Notification
              webserviceBase={this.props.webserviceBase}
              servicePaths={this.props.servicePaths}
              data={data}
              key={data.Id}
              onAccept={this.acceptFriendRequest}
              onDecline={this.declineFriendRequest}
              onError={this.handleError}
              onErrorRetry={this.errorRetry}
              languageResource={this.getTranslation}
            />
          );
        }.bind(this));

        if (this.state.friendRequests.length == 0) {
          notifications = <NotificationErrorMessage languageResource={this.getTranslation} errorMessage="Keine Anfragen" />;
        }
        badge = this.state.unseenRequestsCount;
      }
      break;
      case "loadMore":
        {
          notifications = this.state.friendRequests.map(function(data){
            if (data.DateAccepted) {
              return;
            }
            return (
              <Notification
                webserviceBase={this.props.webserviceBase}
                servicePaths={this.props.servicePaths}
                data={data}
                key={data.Id}
                onAccept={this.acceptFriendRequest}
                onDecline={this.declineFriendRequest}
                onError={this.handleError}
                onErrorRetry={this.errorRetry}
                languageResource={this.getTranslation}
              />
            );
          }.bind(this));
          if (this.state.friendRequests.length == 0) {
            notifications = <NotificationErrorMessage languageResource={this.getTranslation} errorMessage="Keine Anfragen" />;
          }
          if (Array.isArray(notifications)) {
            notifications.push(<NotificationLoadMore key="loadMore" onLoadMore={this.onLoadMore} />);
          } else {
            notifications = (<NotificationLoadMore />);
          }
          badge = this.state.unseenRequestsCount;
        }
        break;
    }

    if (badge == 0) {
      badge = null;
    }

    return (
      <div className="navbar-notification">
        <a href='javascript:void(0)' className="navbar-notification__toggle-button" data-toggle="collapse" data-target="#friend-requests" aria-expanded="false" onClick={this.mainIconClicked}>
          <i className="material-icons mdl-badge mdl-badge--overlap" data-badge={badge}>people_outline</i>
        </a>

        <div className="notification-container scrollable-notifications collapse" id="friend-requests">
          {notifications}
        </div>
      </div>


    );
  },
});

module.exports = FriendRequestsModule;
