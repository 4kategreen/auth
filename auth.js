let handler = (req, res) => {
  return {
    body: '<p>Make new token</p>',
    status: 200
  }
};

let status = (params) => {
  let token = params.getAll('token');
  if (token.length === 1) {
    // query the database
  } else {
    // error ffs
  }
  return {
    body: `<p>Verify existing token: ${params}</p>`,
    status: 200
  }
};

module.exports = {
  handler: handler,
  status: status
}

/***
POST /auth
purpose: given valid login credentials, create token
  compare against database
  return true
    create token
    send token
    200
  return false
    401
GET /auth
purpose: compare token to db so app can verify login
  assess token
  return true
    continue on your way
    200
  return false
    redirect
    401
***/