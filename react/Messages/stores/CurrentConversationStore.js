import { EventEmitter } from "events";
import _ from "lodash";

import dispatcher from "../dispatcher";

class CurrentConversationStore extends EventEmitter {
  constructor() {
    super();
    this.conversation = {
      user: window.users['mike-schnoor'],
      conversation: {
        preview: "ipsum wirklich langer Text",
        time: "14:59",
        isActive: true
      },
      messages: [
        {
          user: "mike-schnoor",
          time: "2016-11-30T15:30:57+00:00",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          user: "wolfgang-adams",
          time: "2016-11-30T15:31:59+00:00",
          content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
      ]
    };


    this.handleAction = {

      'CURRENT_CONVERSATION__DISPLAY_MESSAGE': function(action) {
        this.createMessage(action.message);
      }.bind(this),

      'INPUT_AREA__SENDING': function(action) {
        this.createMessage({
          user: action.user,
          localId: action.localId,
          time: action.time,
          content: action.text,
          status: "loading",
        });
      }.bind(this),

      'INPUT_AREA__SENT': function(action) {
        this.setMessageSent(action.localId);
      }.bind(this),

    }
  }

  getConversation(){
    return this.conversation;
  }

  createMessage(message){
    this.conversation.messages.push(message);

    this.emit("change");
  }

  setMessageSent(localId){

    let index = _.findIndex(
      this.conversation.messages,
      {localId: localId}
    );

    this.conversation.messages[index].status = "sent";
    this.emit("change");
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }

}

const currentConversationStore = new CurrentConversationStore;
dispatcher.register(currentConversationStore.handleActions.bind(currentConversationStore));

window.dispatcher = dispatcher;

export default currentConversationStore;
