const React              = require('react');
const currentViewActions = require('../actions/CurrentViewActions');
const currentViewStore   = require('../stores/CurrentViewStore').default;

var withConversationButtons = function(WrappedComponent) {
  return React.createClass({

    conversationButtons: (
      <a href="script:void(0)" onClick={() => {currentViewActions.navigateTo('CONTACT_DETAILS');}}>
        <i className="material-icons">info_outline</i>
      </a>
    ),

    getState: function() {
      var conversationButtons;
      if (currentViewStore.get() != "CONTACT_DETAILS") {
        conversationButtons = this.conversationButtons;
      }
      return {conversationButtons}
    },

    getInitialState: function() {
      return this.getState();
    },

    refreshState: function() {
      this.setState(this.getState());
    },

    componentWillMount: function() {
      currentViewStore.on("change", this.onViewChange);
    },

    componentWillUnmount: function() {
      currentViewStore.removeListener("change", this.onViewChange);
    },

    onViewChange: function() {
      this.refreshState();
    },

    render: function() {
      return (
        <WrappedComponent
          {...this.props}
          conversationButtons={this.state.conversationButtons}
        />
      );
    }
  });
}

module.exports = withConversationButtons;
