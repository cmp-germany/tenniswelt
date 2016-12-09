import { EventEmitter } from "events";

import currentConversationStore from "./CurrentConversationStore";

import dispatcher from "../dispatcher";

class ContactInfoStore extends EventEmitter {
  constructor() {
    super();

    this.refreshData = this.refreshData.bind(this);


    this.refreshData();

    this.handleAction = {

      'CONVERSATION__SELECTED': this.refreshData,

    }
  }

  refreshData() {
    var user = currentConversationStore.getConversation().user;
    this.contactAvatar = user.profileImage;
    this.contactName   = user.name;
    this.contactDetails = [
      {title: "Status", content: user.isOnline ? "Online" : "Nicht Online"},
      {title: "Herkunft", content: user.city},
    ];
    this.emit("change");
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

const contactInfoStore = new ContactInfoStore;
dispatcher.register(contactInfoStore.handleActions.bind(contactInfoStore));

export default contactInfoStore;
