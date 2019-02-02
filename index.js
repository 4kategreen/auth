const http = require('http');

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

        // better error handling needed
        res.writeHead(200, {'Content-Type': 'text/html'});

        res.write(handleRequest(req));
        res.end();
      });
    })
    .listen(3000);

let handleRequest = (req) => {
  let body = `<h2>${req.method} ${req.url}</h2>`;

  switch (req.url) {
    case '/auth':
      switch (req.method) {
        case 'GET':
          body+= '<p>Get existing token</p>';
          break;
        case 'POST':
          body+= '<p>Submit new creds</p>';
          break;
      }
      break;
    default:
      body+= '<p>Unhandled request</p>';
      break;
  }

  return body;
}