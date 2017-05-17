import React from 'react'
import _ from 'lodash'
import SecondLevelButton from './SecondLevelButton'
import TargetA from './TargetA'

class FirstLevelButton extends React.Component {
  constructor (props) {
    super(props)
    // Operations usually carried out in componentWillMount go here
  }

  render () {
    var name = this.props.name
    var data = this.props.data

    if (_.isString(data)) {
      if (name == 'fairwaltungskatalog') {
        return (
          <li className='starters-navigation__list-item'>
            <TargetA href={data} className='nav-button'>
              <img className='nav-button__img' src='gfx/cropped-cropped-fairwaltungskatalog-logo-512-1-270x270.png' alt='' />
              {name}
            </TargetA>
          </li>
        )
      }
      return (
        <li className='starters-navigation__list-item'><TargetA href={data} className='nav-button'>{name}</TargetA></li>
      )
    }

    var secondLevelButtons = _.map(data, (value, key) => {
      return <SecondLevelButton key={key} name={key} data={value} />
    })

    return (
      <li className='starters-navigation__list-item dropdown'>
        <button className='nav-button dropdown-toggle' type='button' id={'dropdown-' + name} data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
          {name} <span className='caret' />
        </button>
        <ul className='dropdown-menu dropdown-menu-left dropdown-menu--starters' aria-labelledby={'dropdown-' + name}>
          {secondLevelButtons}
        </ul>
      </li>
    )
  }
}

export default FirstLevelButton
