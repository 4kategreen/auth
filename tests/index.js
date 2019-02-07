const axios = require('axios');

let getStatus = (endpoint, token) => {
  const url = endpoint;

  return axios.request({
    method: 'get',
    baseURL: url,
    url: '/auth',
    headers: { 
      'Accept': 'application/json', 
      'Authorization': `Bearer ${token}` }
  });
};

module.exports = {
  getStatus: getStatus
};