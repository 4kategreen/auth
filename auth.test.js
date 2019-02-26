const auth = require('./auth'),
      signature = require('./signature'),
      allCreds = require('./config').creds;

describe('handler', () => {
  beforeEach(() => {
  });

  test('should generate a token with a valid user', () => {
    expect(auth.handler(allCreds.kate)).toEqual('token');
  });

  test('should return false if the user is not valid', () => {
    expect(auth.handler({ username: 'fakeuser', password: 'no' })).toBeFalsy();
  })
});

describe.skip('status', () => {
  test('should return false if token is missing or there are more than one tokens in the headerX')
  test('should return true if signature.verify returns true');
  test('should return false if signature.verfiy returns false');
});

describe.skip('verifyUser', () => {
  test('should verify user as matching a valid user and return true');
  test('should return false if the username is not in the credential list');
  test('should return false if the password does not match');
})