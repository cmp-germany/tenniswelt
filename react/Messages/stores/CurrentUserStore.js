import { EventEmitter } from "events";
import usersStore from "./UsersStore";

import dispatcher from "../dispatcher";

class CurrentUserStore extends EventEmitter {
  constructor() {
    super();
    this.currentUserId = "wolfgang-adams";


    this.handleAction = {

      'Action Type': function(action) {
        // Do something with action

      }.bind(this),

    }
  }

  getCurrentUser() {
    return usersStore.getUserById(this.currentUserId);
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }

}

const currentUserStore = new CurrentUserStore;
dispatcher.register(currentUserStore.handleActions.bind(currentUserStore));

window.dispatcher = dispatcher;

export default currentUserStore;
