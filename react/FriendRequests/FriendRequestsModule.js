const React = require('react');
const $ = require('jquery');
const Notification = require('./components/Notification');
const NotificationErrorMessage = require('./components/NotificationErrorMessage');
const MaterialDesignMixin = require('../mixins/MaterialDesignMixin');
const NotificationLoadMore = require("./components/NotificationLoadMore");
const TimeOut = 1000; //milliseconds

var _       = {};
_.find      = require("lodash/find");
_.findIndex = require("lodash/findIndex");
_.remove    = require("lodash/remove");

var FriendRequestsModule = React.createClass({
  mixins: [MaterialDesignMixin],

  getInitialState: function() {
    return {unseenRequestsCount: null, friendRequests: [], currentState: "initLoading", allCount: 0}
  },

  componentDidMount: function() {
    this.loadData();
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  needsPageReload: function() {
    var thisUserArray = $('.wall-widget--side__actions').find('h3:contains("This User")');
    if (thisUserArray.length > 0) {
      return true;
    }

    thisUserArray = $('.wall-widget--side__actions').find('h3:contains("Dieser Benutzer")');
    if (thisUserArray.length > 0) {
      return true;
    }

    return false;
  },

  reloadPage: function() {
    location.reload();
  },

  getTranslation: function(word) {
    if (!word) {
      return "";
    }
    var languageResource = this.state.languageResource;
    if (!languageResource[word]) {
      console.log("Word (" + word + ") is not translated!");
      return "";
    } else {
      return languageResource[word];
    }
  },

  getFriendRequest: function(friendRequestId) {
    var friendRequest = _.find(this.state.friendRequests, {id: friendRequestId});
    if (!friendRequest) {
      console.error("getFriendRequest(): Cannot find friendRequest with the ID: ", friendRequestId);
    }
    return friendRequest;
  },

  setFriendRequest: function(friendRequest) {
    var allData = this.state.friendRequests;
    var index = _.findIndex(allData, {id: friendRequest.id});
    allData[index] = friendRequest;
    this.setState({friendRequests: allData});
  },

  removeFriendRequest: function(friendRequestId) {
    var allData = this.state.friendRequests;
    _.remove(allData, {id: friendRequestId});
    this.setState({friendRequests: allData});
  },

  loadData: function(pageNumber = 1, onLoadingDone) {
    var getAllFriendRequestsUrl = this.props.webserviceBase + this.props.servicePaths.getActive;
    this.serverRequest = $.getJSON(getAllFriendRequestsUrl, {
      userid: this.props.userId,
      currentLanguage: this.props.currentLanguage,
      pageNumber: pageNumber,
      pageSize: this.props.pageSize
    }, function(result) {
      if (result.success) {

        var friendRequests;
        friendRequests = this.state.friendRequests;
        Array.prototype.push.apply(friendRequests, result.data.friendRequests);

        var newState;
        if (friendRequests.length < result.data.allCount) {
          newState = "loadMore";
        } else {
          newState = "loaded";
        }
        this.setState({currentState: newState, unseenRequestsCount: result.data.unseenRequestsCount, friendRequests: friendRequests, allCount: result.data.allCount, languageResource: result.data.languageResource});

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
    this.setState({unseenRequestsCount: null, friendRequests: [], currentState: "initLoading"});
    this.loadData();
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

  onSeen: function(friendRequestId, unseenRequestsCount = null) {
    var friendRequest = this.getFriendRequest(friendRequestId);
    if (unseenRequestsCount) {
      this.setState({unseenRequestsCount});
    } else if (!friendRequest.isSeen) {
      this.setState({unseenRequestsCount: this.state.unseenRequestsCount - 1});
    }
    friendRequest.isSeen = true;
    this.setFriendRequest(friendRequest);
  },

  removeWithTimeout: function(friendRequestId, timeOut) {
    setTimeout(function() {
      this.removeFriendRequest(friendRequestId);
    }.bind(this), timeOut);
  },

  acceptFriendRequest: function(friendRequestId) {
    this.onSeen(friendRequestId);
    var friendRequest = this.getFriendRequest(friendRequestId);
    friendRequest.isLoading = true;
    this.setFriendRequest(friendRequest);
    var acceptFriendRequestUrl = this.props.webserviceBase + this.props.servicePaths.accept;
    $.post(acceptFriendRequestUrl, {
      friendRequestId: friendRequestId
    }, function(result) {
      if (result.success) {
        friendRequest.isLoading = false;
        friendRequest.isAccepted = true;
        this.setFriendRequest(friendRequest);
        this.removeWithTimeout(friendRequestId, TimeOut);
        if (typeof refreshChatUserList === "function") {
          refreshChatUserList(friendRequest.userId);
          refreshChatUserList(friendRequest.friendUserId);
        }
        if (this.needsPageReload()) {
          this.reloadPage();
        }
      } else {
        friendRequest.isLoading = false;
        friendRequest.isError = true;
        this.setFriendRequest(friendRequest);
      }
    }.bind(this));
  },

  declineFriendRequest: function(friendRequestId) {
    this.onSeen(friendRequestId);
    var friendRequest = this.getFriendRequest(friendRequestId);
    friendRequest.isLoading = true;
    this.setFriendRequest(friendRequest);
    var declineFriendRequestUrl = this.props.webserviceBase + this.props.servicePaths.decline;
    try {
      $.post(declineFriendRequestUrl, {
        friendRequestId: friendRequestId
      }, function(result) {
        if (result.success) {
          friendRequest.isLoading = false;
          friendRequest.isDeleted = true;
          this.setFriendRequest(friendRequest);
          this.removeWithTimeout(friendRequestId, TimeOut);
          if (this.needsPageReload()) {
            this.reloadPage();
          }
        } else {
          friendRequest.isLoading = false;
          friendRequest.isError = true;
          this.setFriendRequest(friendRequest);
        }
      }.bind(this));
    } catch (e) {
      friendRequest.isLoading = false;
      friendRequest.isError = true;
      this.setFriendRequest(friendRequest);
    }
  },

  handleError: function(friendRequestId, errorMessage) {
    var message = friendRequestId + ' has error: ' + errorMessage;
    console.error(message);
    //Todo: handle error in a better way please.
    if (this.state) {
      if (this.state.friendRequests) {
        var friendRequest = this.getFriendRequest(friendRequestId);
        friendRequest.isError = true;
        friendRequest.errorMessage = message;
        this.setFriendRequest(friendRequest);
      }
    }
  },

  errorRetry: function(friendRequestId) {
    var friendRequest = this.getFriendRequest(friendRequestId);
    friendRequest.isError = false;
    this.setFriendRequest(friendRequest);
  },

  mainIconClicked: function() {
    return false;
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
          notifications = <NotificationErrorMessage languageResource={this.getTranslation} errorMessage={errorMessage} onReload={this.onReload}/>;
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
          notifications = this.state.friendRequests.map(function(data) {
            if (data.dateAccepted) {
              return;
            }
            return (<Notification webserviceBase={this.props.webserviceBase} servicePaths={this.props.servicePaths} data={data} key={data.id} onAccept={this.acceptFriendRequest} onDecline={this.declineFriendRequest} onError={this.handleError} onErrorRetry={this.errorRetry} onSeen={this.onSeen} currentLanguage={this.props.currentLanguage} languageResource={this.getTranslation}/>);
          }.bind(this));
          if (this.state.friendRequests.length == 0) {
            notifications = <NotificationErrorMessage languageResource={this.getTranslation} errorMessage="Keine Anfragen"/>
          }
          badge = this.state.unseenRequestsCount;
        }
        break;

      case "loadMore":
        {
          notifications = this.state.friendRequests.map(function(data) {
            if (data.dateAccepted) {
              return;
            }
            return (<Notification webserviceBase={this.props.webserviceBase} servicePaths={this.props.servicePaths} data={data} key={data.id} onAccept={this.acceptFriendRequest} onDecline={this.declineFriendRequest} onError={this.handleError} onErrorRetry={this.errorRetry} onSeen={this.onSeen} currentLanguage={this.props.currentLanguage} languageResource={this.getTranslation}/>);
          }.bind(this));
          if (this.state.friendRequests.length == 0) {
            notifications = <NotificationErrorMessage languageResource={this.getTranslation} errorMessage="Keine Anfragen"/>;
          }
          if (Array.isArray(notifications)) {
            notifications.push(<NotificationLoadMore key="loadMore" onLoadMore={this.onLoadMore}/>);
          } else {
            notifications = (<NotificationLoadMore/>);
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
          <i className="material-icons mdl-badge mdl-badge--overlap" data-badge={badge}>
            people_outline
          </i>
        </a>
        <div className="notification-container scrollable-notifications collapse" id="friend-requests">
          {notifications}
        </div>
      </div>
    );
  }
});

module.exports = FriendRequestsModule;
