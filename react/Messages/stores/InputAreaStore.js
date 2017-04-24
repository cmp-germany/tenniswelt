import { EventEmitter } from "events";

import currentConversationStore from "./CurrentConversationStore";

import dispatcher from "../dispatcher";

class InputAreaStore extends EventEmitter{
  constructor() {
    super()
    this.userInput = "";
    this.conversationInputs = {};

    this.onConversationSelected = this.onConversationSelected.bind(this);
    this.setUserInput = this.setUserInput.bind(this);

    this.handleAction = {

      "INPUT_AREA__CHANGE": function(action) {
        this.setUserInput(action.text);
      }.bind(this),

      "MESSAGE__SENDING": function(action) {
        this.setUserInput("");
      }.bind(this),

      "CONVERSATION__SELECTED": this.onConversationSelected,

    };
  }

  onConversationSelected(action){
    //save the currentInput
    this.conversationInputs[action.fromConversationId] = this.userInput;

    //load the input of the new conversation
    var newInput = this.conversationInputs[action.conversationId];
    if (!newInput) {
      newInput = "";
    }

    //replace it
    this.setUserInput(newInput);
  }

  getUserInput() {
    return this.userInput;
  }

  setUserInput(userInput) {
    this.userInput = userInput;
    this.emit("change");
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }


}

const inputAreaStore = new InputAreaStore;
dispatcher.register(inputAreaStore.handleActions.bind(inputAreaStore));

export default inputAreaStore;
