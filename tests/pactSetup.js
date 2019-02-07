const path = require('path');
const { Pact } = require('@pact-foundation/pact');

global.port = 8989;
global.provider = new Pact({
  host: 'localhost',
  port: global.port,
  log: path.resolve(process.cwd(), './tests/logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), './tests/pacts'),
  spec: 2,
  cors: false,
  pactfileWriteMode: 'update',
  consumer: 'Puzzle Registration',
  provider: 'Auth API'
});