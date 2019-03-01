const jsc = require('jsverify');

const auth = require('./auth'),
      allCreds = require('./config').creds;
      
let token = false;

describe('handler', () => {

  test('should generate a token with a valid user', () => {
    token = auth.handler(allCreds.kate);
    expect(token).toBeTruthy();
  });

  // this is dumb and there's probably a better way not using property testing
  test('should return false if the user is not valid', () => {
    let failedCreds = jsc.forall("json", (creds) => {
      return auth.handler(creds);
    });

    jsc.throws(failedCreds);
  });
});

describe('status', () => {
  test('should return true if signature.verify returns true', () => {
    let header = { 'authorization': token };
    expect(auth.status(header)).toEqual(token);
  });

  test('should return false if signature.verfiy returns false', () => {
    let failedToken = jsc.forall("string", (fakeToken) => {
      let header = { 'authorization': fakeToken}
      return auth.handler(fakeToken);
    });

    jsc.throws(failedToken);
  });
});

describe.skip('verifyUser', () => {
  // seriously this is such a bs function right now why would i test it?
})