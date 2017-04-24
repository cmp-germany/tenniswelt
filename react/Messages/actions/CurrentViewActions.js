import dispatcher from "../dispatcher";

export function navigateTo(destination){
  dispatcher.dispatch({
  	type: "CURRENT_VIEW__CHANGE",
  	toView: destination,
  });
};
