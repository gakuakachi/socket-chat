require('./config/config');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const { generateMessage, generateLocationMessage } = require('./utils/message');
var port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected'); 

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'welcome to chat app how are you?'
  })

  socket.broadcast.emit('newMessage', generateMessage('admin', 'yo! someone joined this chat room'))

  socket.emit('newMessage', generateMessage('akatigaku@gmail.com', 'test'));

  socket.on('disconnect', () => {
    console.log('disconnectted from client');
  });

  socket.on('createMessage', (message, callback) => {
    console.log('user createMessage', message);
    socket.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', coords =>
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude)));
});

server.listen(port, () => {
  console.log(`Server is running on${ port }`);
})

module.exports = {app};

