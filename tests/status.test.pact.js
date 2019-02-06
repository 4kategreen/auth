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
          query:  'token=asdfjkl;',
          headers: {
            Accept: 'application/json'
          }
        },
        willRespondWith: {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {}
        }
      };

      return provider.addInteraction(interaction);
    });

    // add expectations
    test('Should error when the token is bad', (done) => {
      api.getStatus(url, { token: 'asdfjkl;' })
        .then((response) => {
          expect(response).toEqual({});
        })
        .then(done)
        .catch((err) => {
          console.error(err);
        });
    });
  });  
});