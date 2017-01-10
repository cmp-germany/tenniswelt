const React  = require('react');


var NavigationButton = React.createClass({
  render: function() {
    return (
      <a href="script:void(0)" onClick={() => {currentViewActions.navigateTo(this.props.navigateTo);}}>
        <i className="material-icons material-icons--clickable">{this.props.icon}</i>
      </a>
    )
  }
});


module.exports = NavigationButton;
