import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
  constructor() {
    super();
    this.users = {
      "me": {
        "id": "me",
        "isOnline": true
      }
    };


    this.handleAction = {

      'USER__ADDED': function(action) {
        // Do something with action
      }.bind(this),

    }
  }

  getUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users[id];
  }

  getUser(id) {

    //return getUserById(id); //this one will be the actual right call.

    return {
      "id": "volker-miller",
      "profilePage": "profile-about.html?userId=volker-miller",
      "name": "Volker Miller",
      "wallpaper": "gfx/wallpaper/wallpaper-1.jpeg",
      "profileImage": "gfx/profilbilder/p1.jpg",
      "isCompanyProfile": false,
      "street": "August-Euler-Str. 3",
      "zip": "50259",
      "city": "Pulheim",
      "website": "http://www.gfke.eu/",
      "timezone": "MESZ",
      "isOnline": true
    };
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }

}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
