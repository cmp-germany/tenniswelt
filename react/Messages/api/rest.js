const axios = require('axios');

var localBase = "";

var localPaths = {
  base: localBase,
  getUserNonGroupSessions: localBase +  "data/example/getUserNonGroupSessions.example.json",
}

var apiBase = "http://test_koelndemo.cmpg.eu";

var apiPaths = {

}

if (window.LOCALDATA) {
  apiPaths = localPaths;
}

var imageBase = "http://test_koelndemo.cmpg.eu";

const rest = {

  getConversationList: function(data, callback) {
    axios({
      method: 'get',
      url: 'data/example/getUserNonGroupSessions.example.json',
    })
      .then(function(response) {

        //convert to expected format
        var conversations = response.data.map(function(element, index) {
          return {
            id: element.id,
            user: {
              id: element.user.id,
              name: element.user.name,
              avatar: imageBase + element.user.avatar,
            },
            preview: element.lastMessageText,
            time: element.lastMessageDate,
          }
        });
        callback({conversations});
      });
  },


  getConversationMessages: function(data, callback) {
    axios({
      method: 'get',
      url: 'data/example/getSessionMessages.example.json',
      params: {
        conversationId: data.conversationId,
      },
    })
      .then(function(response) {
        console.log(response.data);

        //convert to expected format
        var messages = response.data.map(function(element, index) {
          return {
            user: element.UserId,
            time: element.DateCreated,
            content: element.Message,
            id: element.Id,
          }
        });
        callback({messages});
      });
  },
}

module.exports = rest;
