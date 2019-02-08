const http =  require('http'),
      url =   require('url');

const auth =  require('./auth');

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
        let requestedURL = new URL(req.url, `http://${req.headers.host}`)
            endpoint = requestedURL.pathname;

        console.log(`${req.method} request received to ${endpoint}`);

        res.on('error', (err) => {
          console.error(err);
        });

        switch (endpoint) {
          case '/auth':
            switch (req.method) {
              case 'POST':
                result = auth.handler(req);
                break;
              case 'GET':
                result = auth.status(req);
                break;
            }
            break;
          case '/auth/public_key':
            switch (req.method) {
              case 'GET':
                result = auth.servePublicKey(req);
                break;
            }
            break;
        }
        body = Buffer.from(JSON.stringify(result));

        res.writeHead(result.status, result.headers)

        res.end(body);
      });
    })
    .listen(3000, () => {
      console.log(`Server running`);
    });