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
        let requestedURL = new URL(req.url, `http://${req.headers.host}`),
            endpoint = requestedURL.pathname,
            params = requestedURL.searchParams;

        console.log(`${req.method} request received to ${endpoint}`);
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
          console.error(err);
        });

        switch (endpoint) {
          case '/auth':
            switch (req.method) {
              case 'POST':
                result = auth.handler(req, res);
                break;
              case 'GET':
                result = auth.status(req, res);
                break;
            }
            break;
        }

        res.writeHead(result.status, result.headers)

        res.end();
      });
    })
    .listen(3000, () => {
      console.log(`Server running`);
    });