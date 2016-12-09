const React  = require('react');


var ContactDetail = React.createClass({
  render: function() {
    return (
      <div className="msg-contact-detail">
        <div className="msg-contact-detail__title">{this.props.title}</div>
        <div className="msg-contact-detail__text">{this.props.children}</div>
      </div>
    )
  }
});


module.exports = ContactDetail;
