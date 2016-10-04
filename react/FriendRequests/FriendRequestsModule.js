var React = require('react');
var $ = require('jquery');
var Notification = require('./components/Notification');
var NotificationErrorMessage = require('./components/NotificationErrorMessage');


var FriendRequestsModule = React.createClass({
  getInitialState: function(){
    return {
      data: this.props.data
    }
  },
  getFriendRequestWithGuid:function(friendRequestId){
    var allData = this.state.data;
    var result = $.grep(myArray, function(e){ return e.id === friendRequestId; });
    if (result.length == 0) {
      return null;
    } else if (result.length == 1) {
      return result[0];
    } else {
      throws "Multiple friend requests witht the same guid";
    }
  },
  acceptFriendRequest: function(friendRequestId){
      var url = this.props.servicePath+'/AcceptFriendRequest/'+friendRequestId;
      $.post(url, {friendRequestId: friendRequestId}, function(data){
        if(data.success){
          var allData = this.state.data;
          var index = allData.findIndex(x => x.Id===friendRequestId); //getFriendRequestWithGuid(friendRequestId);
          allData[index].isAccepted = true;
          setState({allData});
        }
        else{

        }
      });

      //while

      //after
  },
  deleteFriendRequest: function(friendRequestId){
    
  }
  render: function(){
    var data = this.state.data;
    console.log(data);

    var notifications;
    if (data.success) {
      notifications = data.data.map(function(data){
        if (data.DateAccepted) {
          return;
        }
        return (
          <Notification data={data} key={data.Id} />
        );
      });
    } else {
    notifications = <NotificationErrorMessage data={data.data} />;
    }
-

    var badgeNumber = 0;
    data.data.forEach(function(item){
      if (item.IsSeen) {
        return;
      }
      badgeNumber++;
    });

    if (badgeNumber == 0) {
      badgeNumber = null;
    }

    return (
      <div className="navbar-notification">
        <button className="navbar-notification__toggle-button" data-toggle="collapse" data-target="#friend-requests" aria-expanded="false">
          <i className="material-icons mdl-badge mdl-badge--overlap" data-badge={badgeNumber}>people_outline</i>
        </button>

        <div className="notification-container collapse" id="friend-requests">
          {notifications}
        </div>
      </div>


    );
  },
});

module.exports = FriendRequestsModule;
