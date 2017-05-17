const React = require('react')
const currentViewActions = require('../actions/CurrentViewActions')

var NavigationButton = React.createClass({
  render: function () {
    return (
      <a href='javascript:void(0)' onClick={() => { currentViewActions.navigateTo(this.props.navigateTo) }}>
        <i className='material-icons material-icons--clickable'>{this.props.icon}</i>
      </a>
    )
  }
})

module.exports = NavigationButton
