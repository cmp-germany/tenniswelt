import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class CurrentUserStore extends EventEmitter {
  constructor() {
    super();
    this.currentUser = {
      "id": "wolfgang-adams",
      "profilePage": "profile-about.html?userId=wolfgang-adams",
      "name": "Wolfgang Adams",
      "wallpaper": "gfx/wallpaper/wallpaper-wolfgang-adams.jpg",
      "profileImage": "gfx/profilbilder/profilbild-adams.jpg",
      "isCompanyProfile": false,
      "street": "Alte Brücke 6",
      "zip": "51570",
      "city": "Windeck",
      "website": "",
      "timezone": "MESZ",
      "isOnline": false
    },


    this.handleAction = {

      'Action Type': function(action) {
        // Do something with action

      }.bind(this),

    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }

}

const currentUserStore = new CurrentUserStore;
dispatcher.register(currentUserStore.handleActions.bind(currentUserStore));

window.dispatcher = dispatcher;

export default currentUserStore;
