var React = require('react');

var NotificationErrorMessage = React.createClass({
  render: function(){
    return (
      <div className="notification notification--load-more">
        <div className="notification__spinner mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
      </div>
    );
  },
})

module.exports = NotificationErrorMessage;
