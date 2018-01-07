require('./config/config');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validations');

const {Users} = require('./utils/users');
var port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected'); 

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('name and room name is required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `yo! ${params.name} joined this chat room`));
    callback();

  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
    console.log('disconnectted from client');
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);
    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      callback();
    }
    callback('error occured');
  });

  socket.on('createLocationMessage', coords => {
    const user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on${ port }`);
})

module.exports = {app};

