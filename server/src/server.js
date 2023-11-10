const express = require('express');
const server = express();
const router = require('./routes/index')
const morgan = require('morgan')

server.use(express.json());
server.use(morgan('dev'));

server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
   );
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
   );
   next();
});

// Middleware para agregar "/drivers" antes de las rutas
server.use('/', router); // Reemplaza './routes/index' con la ubicación correcta de tus rutas

module.exports = server;
