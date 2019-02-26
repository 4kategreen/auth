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
        body.push(chunk.toString());
      })
      .on('end', () => {
        let requestedURL = new URL(req.url, `http://${req.headers.host}`)
            endpoint = requestedURL.pathname,
            status = '404';

        console.log(`${req.method} request received to ${endpoint}`);

        res.on('error', (err) => {
          console.error(err);
        });

        let success = (token) => {
          status = '200';
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
          })
        };

        let fail = (code) => {
          status = code.toString();
          res.writeHead(code, {
            'Content-Type': 'application/json'
          })
        };

        switch (endpoint) {
          case '/auth':
            switch (req.method) {
              case 'POST':
                body = JSON.parse(body)
                let newToken = auth.handler(body.credentials);

                if (newToken) {
                  success(newToken);
                } else {
                  fail(401);
                }
                break;
              case 'GET':
                let existingToken = auth.status(headers);

                if (existingToken) {
                  success(existingToken);
                } else{
                  fail(401);
                }
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
          default:
            fail(404);
            break;
        }
        body = Buffer.from(status);

        res.end(body);
      });
    })
    .listen(3000, () => {
      console.log(`Server running`);
    });