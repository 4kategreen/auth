const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/basic.db', (err) => {
  if (err) {
  return console.error(err.message);
  }
  console.log('Connected to the basic database.');
});

let handler = (req, res) => {
  return {
    body: '<p>Make new token</p>',
    status: 200
  }
};

let logout = (req, res) => {
  return {
    body: '<p>Destroy existing token</p>',
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