const axios = require('axios');

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
      console.error(error.message);
    }
  });
};

let checkCreds = (endpoint) => {

}

module.exports = {
  getStatus: getStatus
};