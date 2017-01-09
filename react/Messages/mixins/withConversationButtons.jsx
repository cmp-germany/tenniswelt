const React              = require('react');
const currentViewStore   = require('../stores/CurrentViewStore').default;
const NavigationButton   = require('../components/NavigationButton');
const withScreenSize     = require('../../mixins/withScreenSize');
const screenSizes        = require('../styles/screenSizes').default;

var withConversationButtons = function(WrappedComponent) {
  var withConversationButtonsWrapper = React.createClass({

    conversationButtons: <NavigationButton icon="info_outline" navigateTo="CONTACT_DETAILS" />,

    backButton: <NavigationButton icon="arrow_back" navigateTo="CONTACT_LIST"/>,

    getState: function() {
      var conversationButtons;
      var backButton;
      if (currentViewStore.get() != "CONTACT_DETAILS") {
        conversationButtons = this.conversationButtons;
      }
      if (this.props.screenSize == "xs") {
        backButton = this.backButton;
      }
      return {conversationButtons, backButton}
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
          {...this.state}
        />
      );
    }
  });

  return withScreenSize(withConversationButtonsWrapper, screenSizes);
}

module.exports = withConversationButtons;
