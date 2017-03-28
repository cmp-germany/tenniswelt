import React            from 'react';
import _                from 'lodash';
import FirstLevelButton from './components/FirstLevelButton';

class NavbarMenuModule extends React.Component {

  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    console.log(this.props.data);
    var firstLevelButtons = _.map(this.props.data, function(value, key){
      return <FirstLevelButton name={key} data={value} key={key} />;
    });
    return (
      <ul className="nav navbar-nav navbar-right ">
        {firstLevelButtons}
      </ul>
    )
  }
}


export default NavbarMenuModule;
