import dispatcher from "../dispatcher";
import rest from "../api/rest";

export function load(data) {
  var userId = data.userId;
  dispatcher.dispatch({
    type: 'USER__LOAD',
    userId,
  })

  rest.getUserDetails({userId}, function(data){
    var user = data.user;
    dispatcher.dispatch({
      type: 'USER__LOADED',
      userId,
      user,
    })
  })

}
