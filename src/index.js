const http = require('http');
const fs = require('fs');
const path = require('path');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET',
  'Content-Type': 'text/event-stream',
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
};

const file = fs.readFileSync(path.join(__dirname, 'football-live.json'));

function getSample() {
  const all = JSON.parse(file);
  const random = Math.random() * (all.length - 1);
  const item = Math.floor(random);

  return JSON.stringify([all[item]]);
}

const requestListener = function (req, res) {
  res.writeHead(200, headers);
  res.write(`data: ${file}\n\n`);
  res.flushHeaders();

  setInterval(() => {
    res.write(`data: ${getSample()}\n\n`);
    res.flushHeaders();
  }, 3000);
};

const server = http.createServer(requestListener);

const PORT = 8080;
server.listen(PORT, () =>
  console.warn('Server started http://localhost:' + PORT)
);
