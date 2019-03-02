const axios = require('axios'),
      creds = require('../config').creds;

let getStatus = (endpoint, token) => {

  return axios({
    method: 'get',
    url: `${endpoint}/auth`,
    headers: { 
      'Accept': 'application/json', 
      'Authorization': `Bearer ${token}` }
  }).then((response) => {
    // returns 2xx codes
    return response;
  }).catch((err) => {
    // catches and returns response if the code is not 2xx.
    if (err.response) {
      return err.response.data;
    } else {
      console.error(err.message);
    }
  });
};

let checkCreds = (endpoint, user, pass) => {

  return axios({
    method: 'post',
    url: `${endpoint}/auth`,
    headers: {
      'Accept': 'application/json',
    },
    data: {
      credentials: {
        username: creds.kate.username,
        password: creds.kate.password
      }
    }
  }).then((response) => {
    return response;
  }).catch((err) => {
    if (err.response) {
      return err.response.data;
    } else {
      console.error(err.message)
    }
  });
};

module.exports = {
  checkCreds: checkCreds,
  getStatus: getStatus
};