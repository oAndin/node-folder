const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(req);
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview!');
  }
  if (pathName === '/product') {
    res.end('This is the PRODUCT');
  }
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'error-header'
    });
    res.end('<h1>Page not found!</h1>');
  }

});

// const port = 8000;

server.listen(8000, '127.0.0.1', () => {
  console.log(`Server is running at port 8000`);
});