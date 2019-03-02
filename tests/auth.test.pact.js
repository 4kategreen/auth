const { Pact } = require('@pact-foundation/pact'),
      signature = (() => {
        const { readFileSync } = require('fs');
        const publicKey = readFileSync('./id_rsa.pub');
        const privateKey = readFileSync('./id_rsa');
        const signature = require('../signature')({publicKey: publicKey, privateKey: privateKey});
        return signature;
      })();

const api = require('./index'),
      creds = require('../config').creds;

describe('Auth API', () => {
  let url = 'http://localhost:3000';

  // Copy this block once per interaction under test
  describe('Token Status', () => {
    beforeEach(() => {
      const interaction = {
        uponReceiving: 'should verify token is correct and return true or false',
        withRequest: {
          method:  'GET',
          path: '/auth',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer asdfjkl'
          }
        },
        willRespondWith: {
          status: 401,
          body: {"status":401,"headers":{"Content-Type":"application/json"}}
        }
      };

      return provider.addInteraction(interaction);
    });

    // add expectations
    test('Should error when the token is bad', (done) => {
      expect.assertions(1);

      api.getStatus(url, 'asdfjkl')
        .then((response) => {
          expect(response).toEqual(401);
          done();
        })
        .catch((err) => {
          console.error(err.message);
        });
    });
  }); 

  describe('Get Token', () => {
    let token = signature.generate(creds.kate);
    
    beforeEach(() => {
      const interaction = {
        uponReceiving: 'should, given the correct credentials, create a token and return it to the requester',
        withRequest: {
          method: 'POST',
          path: '/auth',
          headers: {
            Accept: 'application/json'
          },
          data: {
            credentials: {
              username: creds.kate.username,
              password: creds.kate.password
            }
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      }
    });

    test('Should return a token with proper credentials', (done) => {
      expect.assertions(1);

      api.checkCreds(url, creds.username, creds.password)
        .then((response) => {
          expect(response.headers.authorization).toEqual(`Bearer: ${token}`)
          done();
        })
        .catch((err) => {
          console.error(err.message);
        })
    })
  });
});