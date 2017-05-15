import { EventEmitter } from 'events'

import dispatcher from '../dispatcher'

class CurrentViewStore extends EventEmitter {
  constructor () {
    super()

    this.currentView = 'CONTACT_LIST'
    // Possible Values:
    // - CONTACT_LIST
    // - MESSAGES
    // - CONTACT_DETAILS

    this.onChange = this.onChange.bind(this)

    this.handleAction = {

      'CURRENT_VIEW__CHANGE': this.onChange

    }
  }

  get () {
    return this.currentView
  }

  onChange (action) {
    this.currentView = action.toView
    this.emit('change')
  }

  handleActions (action) {
    return (this.handleAction[action.type]) ? this.handleAction[action.type](action) : null
  }
}

const currentViewStore = new CurrentViewStore()
dispatcher.register(currentViewStore.handleActions.bind(currentViewStore))

export default currentViewStore
