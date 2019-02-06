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
      .on('end', () => {
        let requestedURL = new URL(req.url, `http://${req.headers.host}`), // this sucks
            endpoint = requestedURL.pathname,
            params = requestedURL.searchParams;

        console.log(`${req.method} request received to ${endpoint}`);

        res.on('error', (err) => {
          console.error(err);
        });

        switch (endpoint) {
          case '/auth':
            switch (req.method) {
              case 'POST':
                auth.handler(req, res);
                break;
              case 'GET':
                auth.status(parms);
                break;
            }
            break;
        }

        res.end();
      });
    })
    .listen(3000, () => {
      console.log(`Server running`);
    });