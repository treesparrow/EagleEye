// main file
var http = require('http')
    , express = require('express')
    , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , static = require('serve-static');

// 익스프레스 객체 생성
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('true');
    res.end();
})
// 요청 응답 설정
app.get('/keyboard', function(req, res) {
    console.log("keyboard");

    var data = {
        'type' : 'buttons',
        'buttons' : ['시작']
    };

    res.json(data);
});

// 요청 응답 설정
app.post('/message', function(req, res) {
    // 유저가 입력한 데이터
    console.log(req.body)
    var msg = req.body.content;
    console.log('전달받은 메시지 : ' + msg);
    var send = {}; // 응답할 데이터
    var command = "";

    switch(msg) {
        case '안녕' :
        send = {
            'message' : {
                'text' : '안녕하세요!\n잘 부탁해요!'
            }
        }
        break;

        case '잘가' :
        send = {
            'message' : {
                'text' : '다음에 또 오세요!'
            }
        }
        break;

        default :
        send = {
            'message' : {
                'text' : '알수 없는 명령입니다.!'
            }
        }
        break;
    }
    res.json(send);    
});

var server = http.createServer();

var port = 8000

server.listen(port, function() {
    console.log('start web server %d', port);
});

server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다. %s, %d', addr.address, addr.port);
});

server.on('close', function(){
    console.log('server close!');
});
