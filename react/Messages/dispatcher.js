import { Dispatcher } from 'flux'

const dispatcher = new Dispatcher()

window.dispatcher = dispatcher

dispatcher.register(function (action) {
  console.log('dispatcher: ', action)
})

export default dispatcher
