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
  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    console.log(data)
    // we tell the client to execute 'new message'
    allBroadCase(socket, 'new message', {
      name: data.name,
      msg: data.msg
    })
  })
})