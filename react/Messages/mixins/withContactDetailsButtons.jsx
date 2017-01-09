const React              = require('react');
const currentViewActions = require('../actions/CurrentViewActions');
const NavigationButton   = require('../components/NavigationButton');

var withContactDetailsButtons = function(WrappedComponent) {
  return React.createClass({

    getInitialState: function() {
      var contactDetailsButtons = <NavigationButton icon="arrow_back" navigateTo="MESSAGES" />
      return {contactDetailsButtons}
    },

    render: function() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  })
}

module.exports = withContactDetailsButtons;
