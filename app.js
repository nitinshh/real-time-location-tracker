const express = require('express')
const app = express()
const port = 3000
const socket = require('socket.io')
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const io=socket(server)
require("./socket/socket")(io)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",(req,res)=>{
    res.render('index.ejs')
})

server.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})