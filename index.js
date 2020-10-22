var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use( express.static('public') );

io.sockets.on('connection', (socket) => {

  socket.on('username', (username) => {
    socket.username = username;
    io.emit('is_online', `🔵 <i>${socket.username} joined the chat.</i>`)
  });

  socket.on('disconnect', (username) => {    
    io.emit('is_online', `🔴 <i>${socket.username} left the chat.</i>`)
  })

  socket.on('is_typing', (username) => {
    socket.broadcast.emit('is_typing', `<i>${socket.username} is typing</i>`)
  })
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', `<strong>${socket.username}</strong>: ${msg}`);
  });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT , () => {
  console.log(`listening on port: ${PORT}`);
});