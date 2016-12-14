const axios = require('axios');

var localBase = "";

localPaths = {
  base: localBase,
  getUserNonGroupSessions: localBase +  "data/example/getUserNonGroupSessions.example.json",
}

var apiBase = "http://test_koelndemo.cmpg.eu";

var apiPaths = {

}

if (window.LOCALDATA) {
  apiPaths = localPaths;
}

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
        console.log(response.data);

        //convert to expected format
        var conversations = response.data.map(function(element, index) {
          return {
            id: element.id,
            user: {
              id: element.user.id,
              name: element.user.name,
              avatar: element.user.avatar,
            },
            preview: element.lastMessageText,
            time: element.lastMessageDate,
          }
        });
        callback({conversations});
      });
  }
}

module.exports = rest;
