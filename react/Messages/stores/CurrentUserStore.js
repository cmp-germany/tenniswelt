import { EventEmitter } from "events";
import userStore from "./UserStore";

import dispatcher from "../dispatcher";

class CurrentUserStore extends EventEmitter {
  constructor() {
    super();
    this.currentUserId = "496e3f91-edde-4929-8a83-a5b800cb9397";


    this.handleAction = {

      'Action Type': function(action) {
        // Do something with action

      }.bind(this),

    }
  }

  getCurrentUser() {
    return userStore.getUserById(this.currentUserId);
  }

  getId() {
    return this.currentUserId;
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }

}

const currentUserStore = new CurrentUserStore;
dispatcher.register(currentUserStore.handleActions.bind(currentUserStore));

export default currentUserStore;
