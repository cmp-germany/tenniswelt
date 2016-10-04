var React = require('react');
var MaterialDesignMixin = require('../../mixins/MaterialDesignMixin.js');

var NotificationErrorMessage = React.createClass({

  render: function(){
    console.log(this.props.data);

    return (
      <div className="notification notification--error">
        <div className="notification__error">
          {this.props.data.message}
        </div>
      </div>
    );
  },
})

module.exports = NotificationErrorMessage;
