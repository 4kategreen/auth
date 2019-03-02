const allCreds = require('./config').creds,
      signature = (() => {
        const { readFileSync } = require('fs');
        const publicKey = readFileSync('id_rsa.pub');
        const privateKey = readFileSync('id_rsa');
        const signature = require('./signature')({publicKey: publicKey, privateKey: privateKey});
        return signature;
      })();

let handler = (creds) => {
  result = false;

  if (verifyUser(creds)) {
    let token = signature.generate(creds);
    result = token;
  }

  return result;
};

let status = (headers) => {
  let token = headers.authorization,
      verified = false;

  if (token) {
    verified = signature.verify(token);
  }

  if (verified) {
    verified = token;
  }

  return verified;
}

let servePublicKey = (req) => {
  return {
    status: 200,
    publicKey: String(signature.publicKey)
  };
}

let verifyUser = (creds) => {
  let users = Object.keys(allCreds);

  if (creds && users.includes(creds.username)) {
    // will actually compare encoded versions eventually
    if (allCreds[creds.username].password === creds.password) {
      return true;
    }
  }
};

module.exports = {
  handler: handler,
  servePublicKey: servePublicKey,
  status: status
};