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
  }
}

module.exports = rest;
