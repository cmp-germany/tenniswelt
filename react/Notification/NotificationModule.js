const React               = require('react');
const MaterialDesignMixin = require('../mixins/MaterialDesignMixin');
const materialDesignLite  = require('material-design-lite');

var NotificationModule = React.createClass({
  mixins: [MaterialDesignMixin],

  notify: function(notification) {
    var finalNotification;

    // if notification is just a String, create an object out of it
    if (typeof notification === 'string' || notification instanceof String) {
      finalNotification = {message: notification};
    }

    // otherwise, just pass the object as it is given. MDL will handle proper
    // error handling, if there is given something stupid here.
    else {
      finalNotification = notification;
    }

    this.snackbar.MaterialSnackbar.showSnackbar(finalNotification);
  },

  render: function() {
    return (
      <div>
        <div className="mdl-snackbar mdl-js-snackbar" ref={(snackbar) => this.snackbar = snackbar}>
          <div className="mdl-snackbar__text"></div>
          <button type="button" className="mdl-snackbar__action"></button>
        </div>
      </div>
    );
  }
})

module.exports = NotificationModule;
