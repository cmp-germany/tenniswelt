const axios = require('axios');

const rest = {

  getUserNonGroupSessions: function(data, callback) {
    axios({
      method: 'get',
      url: 'data/example/getUserNonGroupSessions.example.json',
      params: data,
    })
      .then(function(response) {
        callback(response.data);
      });
  },


  getConversationList: function(data, callback) {
    axios({
      method: 'get',
      url: 'data/example/getUserNonGroupSessions.example.json',
    })
      .then(function(response) {

        //convert to expected format
        var conversations = response.data.map(function(element, index) {
          return {
            id: element.Id,
            user: {
              id: element.ChatParticipantUserId,
              name: element.ChatParticipantUserName,
              avatar: "gfx/profilbilder/unknown.png",
            },
            preview: "...",
            time: element.DateCreated,
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
