const signature = require('./signature');

let handler = (req) => {
  if (verifyUser) {
    let token = signature.generate(req);
    returnSuccess(token);
  } else {
    returnFail();
  }
};

let status = (params) => {
  let token = params.token,
      verified = false,
      status = 401;

  if (token.length === 1) {
    verified = signature.verify(token);
  }

  if (verified) {
    returnSuccess(token);
  } else {
    returnFail();
  }
};

let returnSuccess = (token) => {
  res.writeHead(200, {
    'content-type': 'application/json',
    'authorization': token
  });
};

let returnFail = () => {
  res.writeHead(401, {
    'content-type': 'application/json'
  });
};

let verifyUser = () => {

};

module.exports = {
  handler: handler,
  status: status
};