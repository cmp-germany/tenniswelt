import { EventEmitter } from "events";
import _ from "lodash";

import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
  constructor() {
    super();
    this.users = {
      "496e3f91-edde-4929-8a83-a5b800cb9397": {
        "id": "496e3f91-edde-4929-8a83-a5b800cb9397",
        "isOnline": true,
        "name": "Ich",
        "avatar": "gfx/profilbilder/p4.jpg",
      }
    };

    this.onConversationListLoaded = this.onConversationListLoaded.bind(this);

    this.handleAction = {
      'CONVERSATION__LIST_LOADED': this.onConversationListLoaded,
    }
  }

  onConversationListLoaded(action) {
    _.forEach(action.conversations, function(conversation){
      var user = conversation.user;
      this.users[user.id] = user;
      this.users[user.id].id = user.id;
    }.bind(this));
    this.emit("change");
  }

  getUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users[id];
  }

  getUser(id) {
    return this.getUserById(id);
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }

}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

window.userStore = userStore;

export default userStore;
