const { Pact } = require('@pact-foundation/pact');
const api = require('./index');

describe('The API', () => {
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
      api.getStatus(url, 'asdfjkl')
        .then((response) => {
          expect(response).toEqual({"status":401,"headers":{"Content-Type":"application/json"}});
        })
        .then(done)
        .catch((err) => {
          console.error(err.message);
        });
    });
  });  
});