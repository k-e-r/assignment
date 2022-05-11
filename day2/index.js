const fs = require('fs');
const http = require('http');
const PORT = 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <head>
          <title>Home Page</title>
        </head>
        <body>
          <h1>Home Page</h1>
          <a href='/read'>read</a></br>
          <a href='/update'>update</a></br>
          <a href='/delete'>delete</a></br>
          <a href='/create'>create</a></br>
          <a href='/rename'>rename</a></br>
        </body>
      </html>
    `);
    res.end();
  }
  if (req.url === '/read') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.write('file not found');
        console.log('file not found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      console.log('Read!');
      return res.end();
    });
  }
  if (req.url === '/update') {
    fs.appendFile('index.html', '<h1>Updated!</h1>', (err) => {
      if (err) throw err;
      console.log('Updated!');
      res.write('Updated');
      return res.end();
    });
  }
  if (req.url === '/delete') {
    fs.unlink('index.html', (err) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      if (err) throw err;
      console.log('deleted!');
      res.write('deleted');
      return res.end();
    });
  }
  if (req.url === '/create') {
    fs.writeFile('index.html', '<h1>Hello World!</h1>', (err) => {
      if (err) throw err;
      console.log('created!');
      res.write('created');
      return res.end();
    });
  }
  if (req.url === '/rename') {
    fs.rename('index.html', 'home.html', (err) => {
      if (err) {
        res.write('file not found');
        console.log('file not found');
        return res.end();
      }
      console.log('renamed!');
      res.write('renamed');
      return res.end();
    });
  }
});

server.listen(PORT);
