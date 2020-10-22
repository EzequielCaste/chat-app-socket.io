var express = require('express');
var app = express();
var http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use( express.static('public') );

const PORT = process.env.PORT || 3000;

http.listen(PORT , () => {
  console.log(`listening on port: ${PORT}`);
});