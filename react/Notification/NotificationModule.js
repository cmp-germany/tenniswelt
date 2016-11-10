const react               = require('react');
const MaterialDesignMixin = require('../mixins/MaterialDesignMixin');
const materialDesignLite  = require('material-design-lite');

var NotificationModule = react.createClass({
  mixins: [MaterialDesignMixin],

  test: function() {
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar({message: 'Image Uploaded'});
  },

  render: function() {
    return (
      <div>
        <div className="mdl-snackbar mdl-js-snackbar">
          <div className="mdl-snackbar__text"></div>
          <button type="button" className="mdl-snackbar__action"></button>
        </div>
      </div>
    );
  }
})

module.exports = NotificationModule;
