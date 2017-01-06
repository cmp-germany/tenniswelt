const React              = require('react');
const currentViewActions = require('../actions/CurrentViewActions.js');

var withContactDetailsButtons = function(WrappedComponent) {
  return React.createClass({

    getInitialState: function() {
      var contactDetailsButtons = (
        <a href="script:void(0)" onClick={() => {currentViewActions.navigateTo('MESSAGES');}}>
          <i className="material-icons material-icons--clickable">arrow_back</i>
        </a>
      )
      return {contactDetailsButtons}
    },

    render: function() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  })
}

module.exports = withContactDetailsButtons;
