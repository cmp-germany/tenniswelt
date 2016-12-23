const React  = require('react');




var mql = window.matchMedia("(orientation: portrait)");

var MatchMediaExample = React.createClass({

  getInitialState: function() { return {
    matches: mql.matches
  }},

  componentWillMount: function() {
    mql.addListener(this.onMediaChange);
  },

  componentWillUnmount: function() {
    mql.removeListener(this.onMediaChange);
  },

  onMediaChange: function(data) {
    console.log(data);
    this.setState({matches: data.matches});
  },

  render: function() {
    return (
      <div>
        {!this.state.matches && <p>Ich bin im Portrait</p>}
        {this.state.matches && <p>Ich bin nicht im Portrait</p>}
      </div>
    )
  }
});


module.exports = MatchMediaExample;
