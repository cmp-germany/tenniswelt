const React            = require('react');
const inputAreaStore   = require('../stores/InputAreaStore').default;
const inputAreaActions = require('../actions/InputAreaActions');
const currentUserStore = require('../stores/CurrentUserStore').default;
const messageActions   = require('../actions/MessageActions');

var InputArea = React.createClass({

  getInitialState: function() {
    return this.getStateFromStore();
  },

  handleChange: function(e) {
    const userInput = e.target.value;
    inputAreaActions.change(userInput);
  },

  handleSend: function() {
    const userInput = this.state.userInput;
    messageActions.sending({
      text: userInput,
    });
  },

  checkReturn: function(e) {
    if(e.keyCode == 13){
      e.preventDefault();
      this.handleSend();
    }
  },

  componentWillMount: function() {
    inputAreaStore.on("change", this.refreshStateFromStore);
  },

  componentWillUnmount: function() {
    inputAreaStore.removeListener("change", this.refreshStateFromStore);
  },

  getStateFromStore: function() {
    return {
      userInput: inputAreaStore.getUserInput(),
      currentUser: currentUserStore.getCurrentUser().id,
    }
  },

  refreshStateFromStore: function() {
    this.setState(this.getStateFromStore());
  },

  render: function() {
    return (
      <div className="msg-input-area">
        <textarea
          placeholder="Schreibe eine Nachricht"
          rows={1}
          name="msg-input-area__text"
          id="msg-input-area__text"
          className="msg-input-area__text"
          value={this.state.userInput}
          onKeyDown={this.checkReturn}
          onChange={this.handleChange}
        />
      <a className="msg-input-area__send-a" href="#1" onClick={this.handleSend}>
        <i className="material-icons">send</i></a>
      </div>
    )
  }
});


module.exports = InputArea;
