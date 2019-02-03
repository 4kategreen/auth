const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

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
DELETE /auth
    destroy login
        delete token
        200
GET /status
purpose: compare token to db so app can verify login
    compare token to database
    return true
        continue on your way
        200
    return false
        redirect
        401
***/