import React from 'react';

class ThirdLevelButton extends React.Component {

  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    var name = this.props.name;
    var data = this.props.data;

    return (
      <li><a href={data} className="dropdown-button--starters">{name}</a></li>
    );
  }
}


export default ThirdLevelButton;
