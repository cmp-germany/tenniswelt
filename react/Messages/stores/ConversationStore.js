import { EventEmitter } from "events";
import _ from "lodash";
import dispatcher from "../dispatcher";

class ConversationStore extends EventEmitter {
  constructor() {
    super();
    this.conversations = [
      {
        id: "conversation000",
        user: window.users['volker-miller'],
        conversation: {
          preview: "Daaanke dir lorem",
          time: "14:59"
        }
      },
      {
        id: "conversation001",
        user: window.users['kai-gaertner'],
        conversation: {
          preview: "ipsum wirklich langer Text",
          time: "14:59"
        }
      },
      {
        id: "conversation002",
        user: window.users['wolfgang-winter'],
        conversation: {
          preview: "wirklich langer Text",
          time: "14:59"
        }
      },
      {
        id: "conversation003",
        user: window.users['maria-kristhoff'],
        conversation: {
          preview: "...",
          time: "14:59"
        }
      },
      {
        id: "conversation004",
        user: window.users['volker-miller'],
        conversation: {
          preview: "Danke dir lorem",
          time: "14:59"
        }
      },
      {
        id: "conversation005",
        user: window.users['mike-schnoor'],
        isActive: true,
        conversation: {
          preview: "ipsum wirklich langer Text",
          time: "14:59"
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
      },
      {
        id: "conversation006",
        user: window.users['wolfgang-winter'],
        conversation: {
          preview: "wirklich langer Text",
          time: "14:59"
        }
      },
      {
        id: "conversation007",
        user: window.users['maria-kristhoff'],
        conversation: {
          preview: "...",
          time: "14:59"
        }
      }
    ]

    this.changeActiveConversation = this.changeActiveConversation.bind(this);

    this.handleAction = {

      'CONVERSATION__SELECTED': this.changeActiveConversation,

    }
  }

  getAll(){
    return this.conversations;
  }

  getConversationById(id){
    var conversation = _.find(this.conversations, {id});
    return conversation;
  }

  changeActiveConversation(action){
    var id = action.conversationId;

    // unset the current Conversation
    var currentConversationIndex = _.findIndex(this.conversations, {isActive: true});
    this.conversations[currentConversationIndex].isActive = false;

    // set the new Conversation
    var newConversationIndex = _.findIndex(this.conversations, {id});
    this.conversations[newConversationIndex].isActive = true;

    // notify for changes
    this.emit("change");
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }
}

const conversationStore = new ConversationStore;
dispatcher.register(conversationStore.handleActions.bind(conversationStore));

export default conversationStore;
