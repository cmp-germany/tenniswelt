import { EventEmitter } from "events";
import _ from "lodash";

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
  }

  getAll(){
    return this.conversations;
  }

  getConversationById(id){
    var conversation = _.find(this.conversations, {id});
    return conversation;
  }
}

const conversationStore = new ConversationStore;

export default conversationStore;
