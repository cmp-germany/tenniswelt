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
      currentState: "initLoading"
    }
  },

  componentDidMount: function(){
    var getAllFriendRequestsUrl = this.props.webserviceBase + this.props.servicePaths.getActive;

    this.serverRequest = $.get(
      getAllFriendRequestsUrl,
      {
        userid: this.props.userId,
        pageNumber: "1",
        pageSize: this.props.pageSize
      },
      function (result) {
        if(result.success){
          this.setState({
            currentState: "loaded",
            unseenRequestsCount: result.data.UnseenRequestsCount,
            friendRequests: result.data.FriendRequests,
            allCount: result.data.AllCount
          });
        }
        else{
          var error = null;
          if(result)
            error = result.data;
          this.setState({currentState: "error", errorMessage: error });
        }
      }.bind(this)
    );
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

  render: function(){
    var notifications;
    var badge;

    switch(this.state.currentState){
      case "error":
        {
          var errorMessage = "error";
          if(this.state.errorMessage)
            errorMessage = this.state.errorMessage;
          notifications = <NotificationErrorMessage errorMessage={errorMessage} />;
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
              servicePaths={this.props.servicePaths}
              data={data}
              key={data.Id}
              onAccept={this.acceptFriendRequest}
              onDecline={this.declineFriendRequest}
              onError={this.handleError}
              onErrorRetry={this.errorRetry}/>
            );
          }.bind(this));
          if (this.state.friendRequests.length == 0) {
            notifications = <NotificationErrorMessage errorMessage="Keine Anfragen" />;
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
              //Add here onAccept and onDelete like in "loaded" event.
              <Notification servicePaths={this.props.servicePaths} data={data} key={data.Id} />
            );
          }.bind(this));
          if (this.state.friendRequests.length == 0) {
            notifications = <NotificationErrorMessage errorMessage="Keine Anfragen" />;
          }
          if (Array.isArray(notifications)) {
            notifications.push(<NotificationLoadMore />);
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
        <button className="navbar-notification__toggle-button" data-toggle="collapse" data-target="#friend-requests" aria-expanded="false">
          <i className="material-icons mdl-badge mdl-badge--overlap" data-badge={badge}>people_outline</i>
        </button>

        <div className="notification-container collapse" id="friend-requests">
          {notifications}
        </div>
      </div>


    );
  },
});

module.exports = FriendRequestsModule;
