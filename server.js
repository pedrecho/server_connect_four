const { urlencoded } = require('express');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/game', urlencodedParser, (req, res) => {
  res.redirect(307, '/game/' + req.body.room);
});

app.post('/game/:x', urlencodedParser, (req, res) => {
  res.render('main');
})

io.on('connection', (socket) => {
  console.log('a user connected');
});



app.listen(8080);