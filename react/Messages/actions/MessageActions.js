import dispatcher from '../dispatcher'

import currentUserStore from '../stores/CurrentUserStore'
import currentConversationStore from '../stores/CurrentConversationStore'

export function sending (data) {
  var text = data.text
  var time = Date.now()
  var conversationId = currentConversationStore.getConversationID()
  var user = currentUserStore.getId()
  dispatcher.dispatch({
    type: 'MESSAGE__SENDING',
    text,
    localId: conversationId + time,
    user,
    time,
    conversationId
  })
}
