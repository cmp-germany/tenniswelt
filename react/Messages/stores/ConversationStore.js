import { EventEmitter } from "events";
import _ from "lodash";
import dispatcher from "../dispatcher";
import rest from "../api/rest";

class ConversationStore extends EventEmitter {
  constructor() {
    super();
    this.conversations = []

    rest.getUserNonGroupSessions(null, function(data){
      this.conversations = data.map(function(element, index){
        return {
          id: element.Id,
          user: element.ChatParticipantUserId,
          isActive: index == 0,
          time: element.DateCreated,
          messages: [],
        }
      })
      this.emit("change");
    }.bind(this));



    this.changeActiveConversation = this.changeActiveConversation.bind(this);
    this.addMessageOnAction = this.addMessageOnAction.bind(this);
    this.onMessageSent = this.onMessageSent.bind(this);
    this.onMessageSeen = this.onMessageSeen.bind(this);
    this.getActiveConversationId = this.getActiveConversationId.bind(this);

    this.handleAction = {

      'MESSAGE__SENDING': this.addMessageOnAction,
      'MESSAGE__SENT': this.onMessageSent,
      'MESSAGE__SENT_REMOTE': this.addMessageOnAction,
      'MESSAGE__SEEN': this.onMessageSeen,
      'MESSAGE__RECEIVED': this.addMessageOnAction,
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

    console.log(this.conversations);

    this.emit("change");
  }

  getActiveConversationId(){
    var activeConversation = _.find(this.conversations, {isActive: true});
    return activeConversation ? activeConversation.id : null;
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
