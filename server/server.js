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

  socket.emit('newMessage', {
    from: 'akatigaku@gmail.com',
    text: 'test',
    createAt: 1234
  })

  socket.on('disconnect', () => {
    console.log('disconnectted from client');
  })

  socket.on('createMessage', (message) => {
    console.log('user createMessage', message)
  })

});

server.listen(port, () => {
  console.log(`Server is running on${ port }`);
})

module.exports = {app};

