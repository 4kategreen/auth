const signature = (() => {
  const { readFileSync } = require('fs');
  const publicKey = readFileSync('id_rsa.pub');
  const privateKey = readFileSync('id_rsa');
  const signature = require('./signature')({publicKey: publicKey, privateKey: privateKey});
  return signature;
})();

let handler = (req) => {
  if (verifyUser) {
    let token = signature.generate(req);
    return success(token);
  } else {
    return fail();
  }
};

let status = (req) => {
  let token = req.headers.authorization,
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

let servePublicKey = (req) => {
  return {
    status: 200,
    publicKey: String(signature.publicKey)
  };
}

let success = (token) => {
  return {
    status: 200, 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    }
  }
};

let fail = () => {
  return {
    status: 401, 
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

let verifyUser = () => {

};

module.exports = {
  handler: handler,
  servePublicKey: servePublicKey,
  status: status
};