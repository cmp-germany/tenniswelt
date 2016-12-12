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
  }
}

module.exports = rest;
