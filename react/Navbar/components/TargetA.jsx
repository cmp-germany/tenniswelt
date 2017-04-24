import React from 'react';

class TargetA extends React.Component {

  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    var props = this.props;
    var href  = this.props.href;

    var target = null;
    if (_.startsWith(href, 'http://') || _.startsWith(href, 'https://')) {
      target = "_blank";
    }
    return (
      <a {...props} target={target}></a>
    );
  }
}


export default TargetA;
