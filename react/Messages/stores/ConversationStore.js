import { EventEmitter } from "events";
import _ from "lodash";
import dispatcher from "../dispatcher";
import rest from "../api/rest";

class ConversationStore extends EventEmitter {
  constructor() {
    super();
    this.conversations = [];
    this.isLoadingProp = true;

    this.onConversationSelected = this.onConversationSelected.bind(this);
    this.addMessageOnAction = this.addMessageOnAction.bind(this);
    this.onMessageSent = this.onMessageSent.bind(this);
    this.onMessageSeen = this.onMessageSeen.bind(this);
    this.getActiveConversationId = this.getActiveConversationId.bind(this);
    this.getActiveConversation = this.getActiveConversation.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.onConversationListLoaded = this.onConversationListLoaded.bind(this);
    this.onConversationLoaded = this.onConversationLoaded.bind(this);
    this.getAll = this.getAll.bind(this);

    this.handleAction = {

      'MESSAGE__SENDING': this.addMessageOnAction,
      'MESSAGE__SENT': this.onMessageSent,
      'MESSAGE__SENT_REMOTE': this.addMessageOnAction,
      'MESSAGE__SEEN': this.onMessageSeen,
      'MESSAGE__RECEIVED': this.addMessageOnAction,
      'CONVERSATION__SELECTED': this.onConversationSelected,
      'CONVERSATION__LIST_LOADED': this.onConversationListLoaded,
      'CONVERSATION__LOADED': this.onConversationLoaded,

    }
  }

  getAll(){
    return this.conversations.map(function(element){
      var newElement = element;
      if (this.getActiveConversationId() == element.id) {
        newElement.isActive = true;
      } else {
        newElement.isActive = false;
      }
      return newElement;
    }.bind(this));
  }

  getConversationById(id){
    var conversation = _.find(this.conversations, {id});
    return conversation;
  }

  isLoading(){
    return this.isLoadingProp;
  }

  onConversationLoaded(action){
    var conversation = _.find(this.conversations, {id: action.conversationId});
    if (!conversation) {
      console.error("There is no conversation with conversationId ", action.conversationId);
    }
    conversation.messages = action.messages;
    this.emit("change");
  }

  onConversationListLoaded(action){
    this.conversations = action.conversations;
    this.isLoadingProp = false;
    this.emit("change");
  }

  onMessageSeen(action){
    var conversation = _.find(
      this.conversations,
      {id: action.conversationId}
    );

    var message = _.find(
      conversation.messages,
      {id: action.id}
    );

    message.status = "seen";

    this.emit("change");
  }

  onMessageSent(action){
    var conversation = _.find(
      this.conversations,
      {id: action.conversationId}
    );

    var message = _.find(
      conversation.messages,
      {localId: action.localId}
    );

    if (action.type == "MESSAGE__SENT") {
      message.status = "sent";
      message.id = action.id;
    }

    this.emit("change");
  }

  addMessageOnAction(action){
    var conversationIndex = _.findIndex(this.conversations, {id: action.conversationId});
    if (!this.conversations[conversationIndex].messages) {
      this.conversations[conversationIndex].messages = [];
    }

    var status;
    switch (action.type) {
      case "MESSAGE__SENDING":
        status = "sending";
        break;
      case "MESSAGE__SENT_REMOTE":
        status = "sent";
        break;
      default:

    }

    this.conversations[conversationIndex].messages.push({
      user: action.user,
      time: action.time,
      content: action.text,
      localId: action.localId,
      id: action.id,
      status: status
    });

    this.conversations[conversationIndex].preview = action.text;

    this.conversations[conversationIndex].time = action.time;

    var sortedConversations = _.orderBy(this.conversations, ['time'], ['desc']);

    this.conversations = sortedConversations;

    this.emit("change");
  }

  getActiveConversationId(){
    var activeConversation = this.getActiveConversation();
    var retValue = activeConversation ? activeConversation.id : null;
    return retValue;
  }

  getActiveConversation(){
    var activeConversation = _.find(this.conversations, {isActive: true});

    if (activeConversation) {
      return activeConversation;
    }

    if (this.conversations.length < 1) {
      return null;
    }

    if (this.conversations.length > 0) {
      return this.conversations[0];
    }
  }

  onConversationSelected(action){
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
