var socket = io();

socket.on('connect', function() {
  console.log('connected to server')
  socket.emit('createMessage', {
    from: 'jay@yahoo.com',
    text: 'Yoo, what is up?'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('you got new message', message);
});

