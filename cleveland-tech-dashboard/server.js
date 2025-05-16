const path = require('path');
const next = require('next');
const { createServer } = require('http');

const app = next({ 
  dev: false, 
  dir: path.join(__dirname) 
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
}); 