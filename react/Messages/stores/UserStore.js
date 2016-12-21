import { EventEmitter } from "events";
import _                from "lodash";

import dispatcher       from "../dispatcher";

import * as userActions from "../actions/UserActions";

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

    this.onUserLoad = this.onUserLoad.bind(this);
    this.onUserLoaded = this.onUserLoaded.bind(this);

    this.handleAction = {
      'USER__LOAD': this.onUserLoad,
      'USER__LOADED': this.onUserLoaded,
    }
  }

  onUserLoad(action) {
    var user = this.users[action.userId];
    if (user) {
      user.isLoading = true;
    } else {
      user = {isLoading: true}
    }
    this.emit("change");
  }

  onUserLoaded(action) {
    this.users[action.userId] = action.user;
    this.emit("change");
  }

  getUsers() {
    return this.users;
  }

  getUserById(id) {

    if (!id) {
      return null;
    }

    var user = this.users[id];

    if (!user) {
      user = {id, isLoading: true};
      this.users[id] = user;
      setTimeout(function () {
        userActions.load({userId: id});
      });
    }

    return user;
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

export default userStore;
