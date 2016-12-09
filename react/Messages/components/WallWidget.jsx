const React = require('react');

var WallWidget = React.createClass({
  render: function() {

    var contentClasses = "";
    contentClasses += this.props.contentScrollable ? "wall-widget__content--scrollable " : "";
    contentClasses += this.props.contentFull       ? "wall-widget__content--full "       : "";

    return (
      <aside className="wall-widget wall-widget--side wall-widget--msg">
        <header>
          <div style={{display: 'table'}}>
            <i className="material-icons">{this.props.symbol}</i><h3>{this.props.title}</h3>
          </div>
        </header>
        <div className={contentClasses}>
          {this.props.children}
        </div>
      </aside>
    );
  }
});

module.exports = WallWidget;
