// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3005;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


function allBroadCase (socket, event, data) {
  socket.emit('self_' + event, data)
  socket.broadcast.emit(event, data)
}

io.on('connection', function (socket) {
  console.log('connecting ...')
  var addedUser = false
  socket.on('test', function (data) {
    allBroadCase(socket, 'test', {
      name: data.name,
      msg: 'just for socket2 testing'
    })
  })
})