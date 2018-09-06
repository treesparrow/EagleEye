// main file
var http = require('http');

var server = http.createServer();

var port = 8000;
server.listen(port, function() {
    console.log('start web server %d', port);
});

server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다. %s, %d', addr.address, addr.port);
});

server.on('request', function(req, res){
    
});

server.on('close', function(){
    console.log('server close!');
});
