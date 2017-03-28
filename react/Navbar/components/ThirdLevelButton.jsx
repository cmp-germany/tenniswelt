import React   from 'react';
import TargetA from './TargetA';

class ThirdLevelButton extends React.Component {

  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    var name = this.props.name;
    var data = this.props.data;

    return (
      <li><TargetA href={data} className="dropdown-button--starters">{name}</TargetA></li>
    );
  }
}


export default ThirdLevelButton;
