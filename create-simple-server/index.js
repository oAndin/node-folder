// 1º HTTP MODULE REQUIRED!
const http = require('http');

const url = require('url');

// READING MODULE 
const fs = require('fs');

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%ORGANIC%}/g, product.organic);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }
  return output;
}

const tempOverviewer = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// 1º CREATING A SERVER (REQ AND RES) !HTTP MODULE REQUIRED! createServer function 
const server = http.createServer((req, res) => {
  console.log(url);
  console.log(req.url);
  const pathName = req.url;

  // OVERVIEW PAGE
  if (pathName === '/' || pathName === '/overview') {
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverviewer.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(output);
  }
  // PRODUCT PAGE
  if (pathName === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(tempProduct);
  }
  // API JSON PAGE
  if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }
  else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('<h1>Page not found!</h1>');
  }
}
);

// const port = 8000;

server.listen(8000, '127.0.0.1', () => {
  console.log(`Server is running at port 8000`);
});