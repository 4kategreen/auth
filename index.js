const http = require('http');
const auth = require('./auth');

http
  .createServer((req, res) => {
    const { headers, method, url } = req;
    let body = [];

    req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        console.log(`${req.method} request received to ${req.url}`);
        body = Buffer.concat(body),toString();

        res.on('error', (err) => {
          console.error(err);
        });

        let result = handleRequest(req);

        res.writeHead(result.status, {'Content-Type': 'text/html'});

        // probably some better granularity here, but works for now
        if (result.status < 300) {
          res.write(result.body);
        }
        res.end();
      });
    })
    .listen(3000, () => {
      console.log(`Server running`)
    });

// hot mess
let handleRequest = (req) => {
  let body = `<h2>${req.method} ${req.url}</h2>`,
      status = 404;

  switch (req.url) {
    // surely there's a better way to deal with this. 
    case '/favicon.ico':
      status = 200;
      break;
    case '/auth':
      switch (req.method) {
        case 'GET':
          body+= '<p>Get existing token</p>';
          status = 200;
          break;
        case 'POST':
          body+= '<p>Submit new creds</p>';
          status = 200;
          break;
      }
      break;
    case '/status':
      switch (req.method) {
        case 'GET':
          body+= '<p>Status result</p>';
          status = 200;
          break;
      }
      break;
  }

  return { status: status, body: body };
}