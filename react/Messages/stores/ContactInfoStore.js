import { EventEmitter } from "events";

import currentConversationStore from "./CurrentConversationStore";
import userStore from "./UserStore";

import dispatcher from "../dispatcher";

class ContactInfoStore extends EventEmitter {
  constructor() {
    super();

    this.refreshData = this.refreshData.bind(this);

    this.handleAction = {

      'CONVERSATION__SELECTED': this.refreshData,
      'USER__LOAD': this.refreshData,
      'USER__LOADED': this.refreshData,

    }

    this.refreshData();
  }

  refreshData() {
    var currentUserId = currentConversationStore.getUserId();
    var user = userStore.getUser(currentUserId);

    this.userId = currentUserId;
    this.contactAvatar = user ? user.avatar : "";
    this.contactName   = user ? user.name : "";
    this.isLoadingProp = user ? user.isLoading : false;
    this.hasDataProp   = user ? true : false;
    if(user){
      this.contactDetails = [
        {title: "Status", content: user.isOnline ? "Online" : "Nicht Online"},
      ];
    }
    this.emit("change");
  }

  isLoading() {
    return this.isLoadingProp;
  }

  hasData() {
    return this.hasDataProp;
  }

  getId() {
    return this.userId;
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
