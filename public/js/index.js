

var socket = io();

socket.on('connect', function() {
  console.log('connected to server')
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  const template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = $('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`)

  // $('#messages').append(li);
});

var messageTextbox = $('[name=message]');

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function callback(data) {
    messageTextbox.val('');
  })
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  const template = $('#location-template').html();

  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

var locationButton = $('#send-location');
locationButton.on('click', function(e) {
  e.preventDefault();
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    locationButton.removeAttr('disabled').text('Send location');
  }, function(e) {
    alert('Unable to fetch location');
  });
});