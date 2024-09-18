const http = require('http');
const countStudents = require('./3-read_file_async');
const path = process.argv[2];  // Le chemin de la base de données est passé en argument

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');
    
    try {
      await countStudents(path);
    } catch (err) {
      res.end(err.message);
      return;
    }

    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
