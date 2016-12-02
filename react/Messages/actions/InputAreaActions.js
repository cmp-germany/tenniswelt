import dispatcher from "../dispatcher";

export function change(newMessage) {
  dispatcher.dispatch({
    type: "INPUT_AREA__CHANGE",
    text: newMessage
  })
}

export function send(data) {
  const newMessage = data.text;
  const user = data.user;
  const localId = Date.now();
  var time = Date.now();
  dispatcher.dispatch({
    type: "INPUT_AREA__SENDING",
    text: newMessage,
    localId: localId,
    user: user,
    time: time,
  })

  // instead of the timeout, here should go the AJAX call
  setTimeout(function() {
    dispatcher.dispatch({
      type: "INPUT_AREA__SENT",
      text: newMessage,
      localId: localId,
      user: user,
    })
  }, 1000);
}
