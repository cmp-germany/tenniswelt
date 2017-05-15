import React from 'react'
import _ from 'lodash'
import ThirdLevelButton from './ThirdLevelButton'
import TargetA from './TargetA'

class SecondLevelButton extends React.Component {
  constructor (props) {
    super(props)
    // Operations usually carried out in componentWillMount go here
  }

  render () {
    var name = this.props.name
    var data = this.props.data

    if (_.isString(data)) {
      return (
        <li><TargetA href={data} className='dropdown-button--starters'>{name}</TargetA></li>
      )
    }

    var thirdLevelButtons = _.map(data, (value, key) => {
      return <ThirdLevelButton key={key} name={key} data={value} />
    })

    return (
      <li><p className='dropdown-button--starters dropdown-button--noeffect' type='button'>{name}</p>
        <ul className='multilevel-menu'>
          {thirdLevelButtons}
        </ul>
      </li>
    )
  }
}

export default SecondLevelButton
