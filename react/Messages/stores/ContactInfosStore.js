import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ContactInfosStore extends EventEmitter {
  constructor() {
    super();
    this.contactDetails = [
      {title: "Status", content: "Auf der Arbeit..."},
      {title: "Online Status", content: "zuletzt online heute 15:21"},
      {title: "Telefon", content: "+49 1743 9847304"},
    ];
    this.contactAvatar = "gfx/profilbilder/mike-schnorr.jpg";
    this.contactName = "Mike Schnorr";


    this.handleAction = {

      'CONVERSATIONS__CHANGE': function(action) {
        // load new user
        var newContactDetails = [
          {title: "Status", content: "Auf der Arbeit..."},
          {title: "Online Status", content: "zuletzt online heute 15:21"},
          {title: "Telefon", content: "+49 1743 9847304"},
          {title: "Zusätzliches", content: "Dieser Benutzer wurde neu geladen"},
        ];
        var newContactAvatar = "gfx/profilbilder/mike-schnorr.jpg";
        var newContactName = "Mike Schnorr";

        // insert data into Store
        this.contactDetails = newContactDetails;
        this.contactAvatar = newContactAvatar;
        this.contactName = newContactName;

        // call components to update
        this.emit("change");
      }.bind(this),

    }
  }

  getDetails() {
    return this.contactDetails;
  }

  getName() {
    return this.contactName;
  }

  getAvatar() {
    return this.contactAvatar;
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }

}

const contactInfosStore = new ContactInfosStore;
dispatcher.register(contactInfosStore.handleActions.bind(contactInfosStore));

export default contactInfosStore;
