const React = require('react')
const withContactDetailsButtons = require('../mixins/withContactDetailsButtons')

var WallWidget = React.createClass({
  render: function () {
    var contentClasses = ''
    contentClasses += this.props.contentScrollable ? 'wall-widget__content--scrollable ' : ''
    contentClasses += this.props.contentFull ? 'wall-widget__content--full ' : ''

    var symbol = <i className='material-icons'>{this.props.symbol}</i>
    if (this.props.withContactDetailsButtons) {
      symbol = this.props.contactDetailsButtons
    }

    return (
      <aside className='wall-widget wall-widget--side wall-widget--msg'>
        <header>
          <div style={{display: 'table'}}>
            {symbol}<h3>{this.props.title}</h3>
          </div>
        </header>
        <div className={contentClasses}>
          {this.props.children}
        </div>
      </aside>
    )
  }
})

module.exports = withContactDetailsButtons(WallWidget)
