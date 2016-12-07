import dispatcher from "../dispatcher";

export function select(newConversationId){
  dispatcher.dispatch({
    type: "CONVERSATION__SELECTED",
    conversationId: newConversationId,
  });
}
