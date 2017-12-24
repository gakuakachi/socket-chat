require('./config/config');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const publicPath = path.join(__dirname, '../public');

var port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');
  socket.on('disconnect', () => {
    console.log('disconnectted from client');
  })

});

server.listen(port, () => {
  console.log(`Server is running on${ port }`);
})

module.exports = {app};

