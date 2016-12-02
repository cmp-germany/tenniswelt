import { EventEmitter } from "events";

class ConversationStore extends EventEmitter {
  constructor() {
    super();
    this.conversations = [
      {
        user: window.users['volker-miller'],
        conversation: {
          preview: "Daaanke dir lorem",
          time: "14:59"
        }
      },
      {
        user: window.users['kai-gaertner'],
        conversation: {
          preview: "ipsum wirklich langer Text",
          time: "14:59"
        }
      },
      {
        user: window.users['wolfgang-winter'],
        conversation: {
          preview: "wirklich langer Text",
          time: "14:59"
        }
      },
      {
        user: window.users['maria-kristhoff'],
        conversation: {
          preview: "...",
          time: "14:59"
        }
      },
      {
        user: window.users['volker-miller'],
        conversation: {
          preview: "Danke dir lorem",
          time: "14:59"
        }
      },
      {
        user: window.users['mike-schnoor'],
        conversation: {
          preview: "ipsum wirklich langer Text",
          time: "14:59",
          isActive: true
        }
      },
      {
        user: window.users['wolfgang-winter'],
        conversation: {
          preview: "wirklich langer Text",
          time: "14:59"
        }
      },
      {
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
}

const conversationStore = new ConversationStore;

export default conversationStore;
