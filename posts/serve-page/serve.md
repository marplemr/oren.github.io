## Different ways to serve a website with Node

![cat](http://img.thesun.co.uk/multimedia/archive/01690/134480338496_1690194a.gif)

Sometimes I need a quick way to serve a simple website.  
Here are 3 way you can do that with node.

1. Hardcoding the file's content

```js
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<!doctype html>\n  <html lang="en">\n' +
    '<head>\n<meta charset="utf-8">\n<title>Server page with node.js</title>\n' +
    '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' +
    '</head>\n<body>\n<h1>Hello Node</h1>\n' +
    '<div id="content"><p>This html pages is served by Node.js</p>' +
    '\n</body>\n</html>');
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000');
```

2. Using fs.readFile - will load the entire file into memory before spitting it out to the browser

```js
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.html', function (err, data) {
    if (err) throw err;
      res.write(data);
      res.end();
  });
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000');
```

3. Using fs.createReadStream - only loading small chunks to memory and piping it to the response.  
This is great for giant files.
  
```js
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  reader = fs.createReadStream('index.html');
  reader.pipe(res);

  reader.on('end', function() {
    res.end();
  });
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000');
```
