const React                 = require('react');
const ContactDetail         = require('./ContactDetail');
const contactInfoStore      = require('../stores/ContactInfoStore').default;

var ContactInfos = React.createClass({
  getInitialState: function() {
    return this.getStoreData();
  },

  componentWillMount: function() {
    contactInfoStore.on("change", this.refreshFromStoreData);
  },

  componentWillUnmount: function() {
    contactInfoStore.removeListener("change", this.refreshFromStoreData);
  },

  getStoreData: function() {
    return {
      contactDetails: contactInfoStore.getDetails(),
      contactName: contactInfoStore.getName(),
      contactAvatar: contactInfoStore.getAvatar(),
      isLoading: contactInfoStore.isLoading(),
      hasData: contactInfoStore.hasData(),
    };
  },

  refreshFromStoreData: function() {
    this.setState(this.getStoreData());
  },

  render: function() {

    var name = this.state.contactName;
    var avatar = this.state.contactAvatar;

    var contactDetails = this.state.contactDetails;
    var renderedContactDetails = "";
    if (contactDetails) {
      renderedContactDetails = contactDetails.map(function(element, index) {
        return <ContactDetail key={element.title} title={element.title}>{element.content}</ContactDetail>
      });
    }


    return (
      <div>
        <img src={avatar} alt={"Profilbild von " + name} className="img-responsive msg-contact-image" />
        <ContactDetail title="Name">{name}</ContactDetail>
        {renderedContactDetails}
      </div>
    )
  }
});


module.exports = ContactInfos;
