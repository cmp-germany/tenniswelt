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
    var currentConversation = currentConversationStore.getConversation();
    var user = currentConversation ? currentConversation.user : null;
    this.contactAvatar = user ? user.profileImage : "";
    this.contactName   = user ? user.name : "";
    if(user){
      this.contactDetails = [
        {title: "Status", content: user.isOnline ? "Online" : "Nicht Online"},
        {title: "Herkunft", content: user.city},
      ];
    }
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
