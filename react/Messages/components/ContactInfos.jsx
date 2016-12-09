const React             = require('react');
const ContactDetail     = require('./ContactDetail');
const contactInfosStore = require('../stores/ContactInfosStore').default;

var ContactInfos = React.createClass({
  getInitialState: function() {
    return this.getStoreData();
  },

  componentWillMount: function() {
    contactInfosStore.on("change", this.refreshFromStoreData);
  },

  componentWillUnmount: function() {
    contactInfosStore.removeListener("change", this.refreshFromStoreData);
  },

  getStoreData: function() {
    return {
      contactDetails: contactInfosStore.getDetails(),
      contactName: contactInfosStore.getName(),
      contactAvatar: contactInfosStore.getAvatar(),
    };
  },

  refreshFromStoreData: function() {
    this.setState(this.getStoreData());
  },

  render: function() {

    var name = this.state.contactName;
    var avatar = this.state.contactAvatar;

    var contactDetails = this.state.contactDetails;
    var renderedContactDetails = contactDetails.map(function(element, index) {
      return <ContactDetail key={element.title} title={element.title}>{element.content}</ContactDetail>
    });

    return (
      <div>
        <img src={avatar} alt={"Profilbild von " + name} className="img-responsive" />
        <ContactDetail title="Name">{name}</ContactDetail>
        {renderedContactDetails}
      </div>
    )
  }
});


module.exports = ContactInfos;
