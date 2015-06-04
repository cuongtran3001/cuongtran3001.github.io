// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3001;

server.listen(port, function () {
  console.log('Static server is listening at port %d', port);
});

// Routing
app.use(express.static(__dirname));
