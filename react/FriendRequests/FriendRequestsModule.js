var React = require('react');
var Notification = require('./components/Notification');
var NotificationErrorMessage = require('./components/NotificationErrorMessage');


var FriendRequestsModule = React.createClass({
  getInitialState: function(){
    return {
      data: this.props.data
    }
  },

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
