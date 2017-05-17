const axios = require('axios')

var localBase = ''

var localPaths = {
  base: localBase,
  getConversationList: localBase + 'data/example/getUserSessions.example.json',
  getConversationMessages: localBase + 'data/example/getSessionMessages.example.json',
  getUserDetails: localBase + 'data/example/getUserDetails/'
}

var apiBase = 'http://test_koelndemo.cmpg.eu'

var apiPaths = {

}

if (window.LOCALDATA) {
  apiPaths = localPaths
}

var imageBase = 'http://test_koelndemo.cmpg.eu'

const rest = {

  getConversationList: function (data, callback) {
    axios({
      method: 'get',
      url: apiPaths.getConversationList
    }).then(function (response) {
      // convert to expected format
      var conversations = response.data.map(function (element, index) {
        return {
          id: element.id,
          user: {
            id: element.user.id,
            name: element.user.name,
            avatar: imageBase + element.user.avatar
          },
          preview: element.lastMessageText,
          time: element.lastMessageDate
        }
      })
      callback({conversations})
    })
  },

  getConversationMessages: function (data, callback) {
    axios({
      method: 'get',
      url: apiPaths.getConversationMessages,
      params: {
        conversationId: data.conversationId
      }
    }).then(function (response) {
      // convert to expected format
      var messages = response.data.map(function (element, index) {
        return {
          user: element.UserId,
          time: element.DateCreated,
          content: element.Message,
          id: element.Id
        }
      })
      callback({messages})
    })
  },

  getUserDetails: function (data, callback) {
    var userId = data.userId
    axios({
      method: 'get',
      url: apiPaths.getUserDetails + userId + '.json'
    }).then(function (response) {
      var data = response.data
      var user = {
        id: data.id,
        name: data.name,
        isOnline: data.isOnline,
        avatar: imageBase + data.avatar
      }
      callback({user})
    })
  }
}

module.exports = rest
