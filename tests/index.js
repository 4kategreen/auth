const axios = require('axios');

let getStatus = (endpoint, params) => {
  const url = endpoint;

  return axios.request({
    method: 'get',
    baseURL: url,
    url: '/auth',
    headers: { 'Accept': 'application/json' },
    params: params
  })
};

module.exports = {
  getStatus: getStatus
};