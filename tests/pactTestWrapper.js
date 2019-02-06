jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // This is to give the pact mock server time to start

beforeAll((done) => {
  provider.setup().then(() => done());
});

afterAll((done) => {
  provider.finalize().then(() => done());
});