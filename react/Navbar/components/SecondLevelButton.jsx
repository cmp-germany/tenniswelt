import React from 'react';

class SecondLevelButton extends React.Component {

  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    console.log("SecondLevelButton.name: " + this.props.name);
    console.log("SecondLevelButton.data: ", this.props.data);
    return (
      <div />
    );
  }
}


export default SecondLevelButton;
