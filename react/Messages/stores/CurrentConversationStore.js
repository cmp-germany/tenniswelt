import { EventEmitter } from "events";
import _ from "lodash";
import conversationStore from "./ConversationStore";
import * as conversationActions from "../actions/ConversationActions";


import dispatcher from "../dispatcher";

class CurrentConversationStore extends EventEmitter {
  constructor() {
    super();
    this.currentConversationId = conversationStore.getActiveConversationId();
    this.updateListeners = this.updateListeners.bind(this);
    this.onConversationSelected = this.onConversationSelected.bind(this);
    this.getConversationID = this.getConversationID.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.isLoaded = this.isLoaded.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.onConversationLoaded = this.onConversationLoaded.bind(this);
    this.onConversationListLoaded = this.onConversationListLoaded.bind(this);
    this.loadedConversation = {};
    this.loadingConversation = {};


    this.handleAction = {

      'MESSAGE__SENDING': this.updateListeners,
      'MESSAGE__SENT': this.updateListeners,
      'MESSAGE__SENT_REMOTE': this.updateListeners,
      'MESSAGE__SEEN': this.updateListeners,
      'MESSAGE__RECEIVED': this.updateListeners,
      'CONVERSATION__SELECTED': this.onConversationSelected,
      'CONVERSATION__LOADED': this.onConversationLoaded,
      'CONVERSATION__LOAD': this.onConversationLoad,
      'CONVERSATION__LIST_LOADED': this.onConversationListLoaded,

    }
  }

  onConversationSelected(action){
    this.currentConversationId = action.conversationId;
    this.emit("change");
  }

  onConversationListLoaded(action){
    this.currentConversationID = conversationStore.getActiveConversationId();
  }

  onConversationLoaded(action){
    this.loadingConversation[action.conversationId] = false;
    this.loadedConversation[action.conversationId] = true;
    this.emit("change");
  }

  isLoaded(){
    return this.loadedConversation[this.getConversationID()] ? true : false;
  }

  isLoading(){
    return this.loadingConversation[this.getConversationID()] ? true : false;
  }

  getConversation(){
    var conversation = conversationStore.getConversationById(
      this.currentConversationId
    );
    // if messages of conversation are not yet loaded, load them
    if (this.getConversationID()) {
      if (!this.isLoaded() && !this.isLoading()) {
        conversationActions.load(this.getConversationID());
        this.loadingConversation[this.getConversationID()] = true;
      }
    }
    return conversation;
  }

  getConversationID(){
    return this.currentConversationId;
  }

  getUserId(){
    var conversation = this.getConversation();
    return conversation ? conversation.user.id : null;
  }

  updateListeners(){
    this.emit("change");
  }

  handleActions(action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action): null;
  }

}

const currentConversationStore = new CurrentConversationStore;
dispatcher.register(currentConversationStore.handleActions.bind(currentConversationStore));

export default currentConversationStore;
