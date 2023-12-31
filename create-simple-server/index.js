const http = require('http');
const url = require('url');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverviewer = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const dataObj = JSON.parse(data);
const replaceTemplate = (temp, product) => {
let output = temp.replace();
}

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(req);
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el))
    res.end(tempOverviewer);
  }
  if (pathName === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(tempProduct);
  }
  if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
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