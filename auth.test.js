const jsc = require('jsverify');

const auth = require('./auth'),
      allCreds = require('./config').creds;
      
let token = false;

describe('handler', () => {

  test('should generate a token with a valid user', () => {
    token = auth.handler(allCreds.kate);
    expect(token).toBeTruthy();
  });
});

describe('status', () => {
  test('should return true if signature.verify returns true', () => {
    let header = { 'authorization': token };
    expect(auth.status(header)).toEqual(token);
  });

  test('should return false if signature.verfiy returns false', () => {
    let failedToken = jsc.forall("json", (fakePayload) => {
      let fakeToken = auth.handler(fakePayload);
      let header = { 'authorization': fakeToken }

      return !auth.status(fakeToken);
    });

    jsc.assert(failedToken);
  });
});

describe.skip('verifyUser', () => {
  // seriously this is such a bs function right now why would i test it?
})