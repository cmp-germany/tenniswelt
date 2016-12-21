import dispatcher               from "../dispatcher";
import rest                     from "../api/rest";

import currentConversationStore from "../stores/CurrentConversationStore";
import userStore                from "../stores/UserStore";
import conversationStore        from "../stores/ConversationStore";

import * as userActions         from "./UserActions";

export function select(newConversationId){
  // Notify that a selection was made.
  var fromConversationId = currentConversationStore.getConversationID();
  dispatcher.dispatch({
    type: "CONVERSATION__SELECTED",
    conversationId: newConversationId,
    fromConversationId,
  });

  // When the user isn't loaded yet, load it.
  var userId = conversationStore.getConversationById(newConversationId).user.id;
  var user = userStore.getUser(userId);
  if (!user) {
    userActions.load({userId});
  }
}


export function loadList(){

  //notify, that we are going to load
  dispatcher.dispatch({
    type: "CONVERSATION__LOAD_LIST"
  });

  //tell the websevice to load
  rest.getConversationList({/*data*/}, function(result){

    //when loading done, notify with data
    dispatcher.dispatch({
      type: "CONVERSATION__LIST_LOADED",
      conversations: result.conversations,
    });

  });

}


export function load(conversationId){

  if(!conversationId){
    conversationId = currentConversationStore.getConversationID();
  }

  if(!conversationId){
    console.error("No currentConversationID");
    return;
  }

  //notify, that we are going to load
  dispatcher.dispatch({
    type: "CONVERSATION__LOAD",
    conversationId,
  });

  //tell the websevice to load
  rest.getConversationMessages({conversationId}, function(result){

    //when loading done, notify with data
    dispatcher.dispatch({
      type: "CONVERSATION__LOADED",
      conversationId,
      messages: result.messages,
    });
  });

}
