const signature = require('./signature');

let handler = () => {
  if (verifyUser) {
    let token = signature.generate(req);
    return success(token);
  } else {
    return fail();
  }
};

let status = (params) => {
  let token = params.token,
      verified = false;

  if (token && token.length === 1) {
    verified = signature.verify(token);
  }

  if (verified) {
    return success(token);
  } else {
    return fail();
  }
};

let success = (token) => {
  return {
    status: 200, 
    headers: {
      'content-type': 'application/json',
      'authorization': token
    }
  }
};

let fail = () => {
  return {
    status: 401, 
    headers: {
      'content-type': 'application/json'
    }
  };
};

let verifyUser = () => {

};

module.exports = {
  handler: handler,
  status: status
};