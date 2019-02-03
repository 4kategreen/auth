const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
  return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

let handler = () => {
  return {
    body: '<p>Make new token</p>',
    status: 200
  }
};

let status = () => {
  return {
    body: '<p>Get existing token</p>',
    status: 200
  }
};

let logout = () => {
  return {
    body: '<p>Destroy existing token</p>',
    status: 200
  }
}

module.exports = {
  handler: handler,
  status: status,
  logout: logout
}

/***
POST /auth
purpose: given valid login credentials, create token
  compare against database
  return true
    create token
    send token
    write token to db
    200
  return false
    401
GET /auth
purpose: compare token to db so app can verify login
  compare token to database
  return true
    continue on your way
    200
  return false
    redirect
    401
DELETE /auth
  destroy login
    delete token
    200
***/