const http =  require('http');
const url =   require('url');

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
        console.log(`${req.method} request received to ${req.url}`);
        body = Buffer.concat(body),toString();

        let result = {
          body:`<h2>${req.method} ${req.url}</h2>`,
          status: 404
        }

        res.on('error', (err) => {
          console.error(err);
        });

        switch (req.url) {
          case '/auth':
            switch (req.method) {
              case 'POST':
                result = auth.handler(req, res);
                break;
              case 'GET':
                result = auth.status(req, res);
                break;
              case 'DELETE':
                result = auth.logout(req, res);
                break;
            }
            break;
          default:
            break;
        }

        res.writeHead(result.status, {'Content-Type': 'text/html'});

        // model return headers in the browser for now.
        if (result.status < 300) {
          res.write(result.body);
        }
        res.end();
      });
    })
    .listen(3000, () => {
      console.log(`Server running`);
    });