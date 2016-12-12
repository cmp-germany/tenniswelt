import dispatcher from "../dispatcher";

import currentConversationStore from "../stores/CurrentConversationStore";

export function select(newConversationId){
  var fromConversationId = currentConversationStore.getConversationID();
  dispatcher.dispatch({
    type: "CONVERSATION__SELECTED",
    conversationId: newConversationId,
    fromConversationId,
  });
}
