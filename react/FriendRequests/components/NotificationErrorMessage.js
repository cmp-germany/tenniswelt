var React = require('react');
var MaterialDesignMixin = require('../../mixins/MaterialDesignMixin.js');

var NotificationErrorMessage = React.createClass({

  render: function(){
    return (
      <div className="notification notification--error">
        <div className="notification__error">
          {this.props.errorMessage}
        </div>
      </div>
    );
  },
})

module.exports = NotificationErrorMessage;
