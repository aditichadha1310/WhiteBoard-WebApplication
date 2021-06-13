//app.js =>> backend code
//cd to webapp , then type
// npm init -y in the terminal
//now you can see a package.json file created
//npm i express nodemon socket.io
//the above means npm install followed by package names
//go to package.json file and three dependencies will be found there
//add nodemon to the "dev dependencies" bcz its required while development is going on

//nodemon will trigger changes in the code and reflect them on the ui, to start using it, write "npm start"


//express is a package that we installed
//used to write APIs in the backend
//const { response } = require("express");
const express = require("express");
//express has written the code of node.js in an easier way so that we can call API's easily

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//this statement abobe is used to create a appplication or backend or server

app.use(express.static("public"));

//http method,app route, route handler
// app.get("/",function(request, response){
// response.send("<h1>Welcome to Home Page!!!</h1>");
// })

//app.get("/",function(request, response)
// {
//     response.redirect("main.html");
// })

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/index.html');
// });
io.on('connection',function(socket)
{
    //console.log('a user connected');
    console.log(socket.id + "connected! ");
    socket.on("md",function(pointObject){
        socket.broadcast.emit("mousedown",pointObject);
    })
    socket.on("mm",function(pointObject){
        socket.broadcast.emit("mousemove",pointObject);
    })
    socket.on("mu",function(){
        socket.broadcast.emit("mouseup");
    })
    socket.on("disconnect",function()
    {
    console.log("Socket disconnected");
})
});

let PORT = process.env.PORT || 3000;
http.listen(PORT , function(){
    console.log("app started at port 3000");
})

