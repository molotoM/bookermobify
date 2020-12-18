const http = require('http');
const app = require('./app');

const port = process.env.PORT ||3001;

const server = http.createServer(app);

server.listen(port);
server.setTimeout = 5000;

console.log("Connected successfully on port: ",port);