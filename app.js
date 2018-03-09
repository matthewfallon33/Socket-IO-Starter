var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var online = 0;


app.set("view engine", "ejs");

app.get('/', function(req, res){
  res.render("index");
});

io.on('connection', function(socket){
  online++;
  console.log("There are " + online + " Online...");
  socket.emit("online", online);
  socket.on("disconnect", function(){
    online--;
    console.log("There are " + online + " Online...");
    socket.broadcast.emit("offline", online);
  });
  socket.on('msg', function(msg){
    console.log(msg);
    io.emit("msg", msg);
    // console.log("msg emitted");
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
