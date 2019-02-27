
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8080;
const fs = require('fs');

const server = http.createServer(app);

server.listen(port);

const message = 'Sem risadinha...';
console.log(new Date() + ' Servidor iniciado, ouvindo requisições na porta ' + port);
