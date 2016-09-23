
var path = require("path");
var express= require("express");
var async = require('async');
var mongoose = require('mongoose');

var config = require('./config');
var bodyParser = require('body-parser');  
var logger = require('morgan');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);


mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var userserver = require('./src-server/userserver');
var eventserver = require('./src-server/eventserver');
userserver(app);
eventserver(app);

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;
result ="Register Successfully"
io.sockets.on('connection', function(socket) {
  console.log("COn nguoi truy cap nay");
  var result = false;
  socket.on("userRegister",function(data){
    console.log(data);
    socket.emit("resultRegister",{result:data});
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
 