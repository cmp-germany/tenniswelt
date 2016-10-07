var React = require('react');
var MaterialDesignMixin = require('../../mixins/MaterialDesignMixin.js');

var NotificationErrorMessage = React.createClass({

  render: function(){
    var reloadLink = "";
    if (this.props.onReload) {
      reloadLink = (<a className="notification__error-link" href="javascript:void(0)" onClick={this.props.onReload}>Erneut Laden</a>);
    }
    return (
      <div className="notification notification--error">
        <div className="notification__error">
          {this.props.errorMessage}
          {reloadLink}
        </div>
      </div>
    );
  },
})

module.exports = NotificationErrorMessage;
